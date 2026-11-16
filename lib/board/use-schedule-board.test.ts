import { renderHook, waitFor } from '@testing-library/react-native';

import { gameCatalog } from '@/data/catalogs/game-catalog';
import { matchCatalog } from '@/data/catalogs/match-catalog';
import type {
  ScheduleBoardSource,
  ScheduleBoardState,
  ScheduleLoadState,
} from '@/modules/shared/gateways';

import { useScheduleBoard } from './use-schedule-board';

const initial = board({ status: 'loading' });
const loaded = board({ status: 'ok' });

describe('useScheduleBoard', () => {
  it('keeps the initial snapshot when the source has no loader', async () => {
    const source: ScheduleBoardSource = { initial };
    const { result } = await renderHook(() => useScheduleBoard(source));

    expect(result.current).toBe(initial);
  });

  it('replaces the board when load resolves', async () => {
    await expectBoardLoads({
      initial,
      load: () => Promise.resolve(loaded),
    });
  });

  it('loads even when the initial board is already ok', async () => {
    await expectBoardLoads({
      initial: board({ status: 'ok' }),
      load: () => Promise.resolve(loaded),
    });
  });

  it('shares one loaded board across subscribers', async () => {
    const { load, resolveLoad } = deferredLoad();
    const loadSpy = jest.fn(load);
    const source: ScheduleBoardSource = { initial, load: loadSpy };
    const first = await renderHook(() => useScheduleBoard(source));
    const second = await renderHook(() => useScheduleBoard(source));

    resolveLoad(loaded);

    await waitFor(() => {
      expect(first.result.current).toBe(loaded);
    });

    expect(second.result.current).toBe(loaded);
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });

  it('keeps a resolve after the first subscriber unmounts', async () => {
    const { load, resolveLoad } = deferredLoad();
    const source: ScheduleBoardSource = { initial, load };
    const first = await renderHook(() => useScheduleBoard(source));

    first.unmount();

    const second = await renderHook(() => useScheduleBoard(source));

    resolveLoad(loaded);

    await waitFor(() => {
      expect(second.result.current).toBe(loaded);
    });
  });
});

async function expectBoardLoads(source: ScheduleBoardSource) {
  const { result } = await renderHook(() => useScheduleBoard(source));

  await waitFor(() => {
    expect(result.current).toBe(loaded);
  });
}

function board(loadState: ScheduleLoadState): ScheduleBoardState {
  return {
    games: gameCatalog([]),
    matches: matchCatalog([]),
    loadState,
  };
}

function deferredLoad() {
  let resolveLoad!: (next: ScheduleBoardState) => void;
  const load = () =>
    new Promise<ScheduleBoardState>((resolve) => {
      resolveLoad = resolve;
    });

  return {
    load,
    resolveLoad: (next: ScheduleBoardState) => resolveLoad(next),
  };
}
