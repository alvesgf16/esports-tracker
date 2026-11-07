import { renderHook, waitFor } from '@testing-library/react-native';

import { gameCatalog } from '@/data/game-catalog';
import { matchCatalog } from '@/data/match-catalog';
import type {
  ScheduleBoardState,
  ScheduleLoadState,
} from '@/modules/shared/gateways';

import { useScheduleBoard } from './use-schedule-board';

const initial = board({ status: 'loading' });
const loaded = board({ status: 'ok' });

describe('useScheduleBoard', () => {
  it('keeps the initial snapshot when the source has no loader', async () => {
    const { result } = await renderHook(() => useScheduleBoard({ initial }));

    expect(result.current).toBe(initial);
  });

  it('replaces the board when load resolves', async () => {
    const { result } = await renderHook(() =>
      useScheduleBoard({
        initial,
        load: () => Promise.resolve(loaded),
      })
    );

    await waitFor(() => {
      expect(result.current).toBe(loaded);
    });
  });
});

function board(loadState: ScheduleLoadState): ScheduleBoardState {
  return {
    games: gameCatalog([]),
    matches: matchCatalog([]),
    loadState,
  };
}
