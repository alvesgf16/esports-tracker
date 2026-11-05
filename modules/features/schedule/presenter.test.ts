import { renderHook } from '@testing-library/react-native';

import { deviceTimeZone } from '@/lib/device-time-zone';
import type { ScheduleBoardState } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';

import { useSchedulePresenter } from './presenter';
import { useScheduleRouter } from './router';
import {
  FIXED_NOW,
  stubGameCatalog,
  stubMatchCatalog,
  TEST_TIME_ZONE,
} from './schedule.harness';

jest.mock('@/lib/use-now');
jest.mock('@/lib/device-time-zone');
jest.mock('@/lib/use-schedule-board', () => ({
  useScheduleBoard: (board: ScheduleBoardState) => board,
}));
jest.mock('./router', () => ({
  useScheduleRouter: jest.fn(),
}));

function stubBoard(
  overrides: {
    games?: GameCatalog;
    matches?: MatchCatalog;
    notice?: string | null;
  } = {}
): ScheduleBoardState {
  return {
    games: overrides.games ?? stubGameCatalog(),
    matches: overrides.matches ?? stubMatchCatalog(),
    notice: overrides.notice ?? null,
    ready: true,
  };
}

async function present(
  overrides: {
    games?: GameCatalog;
    matches?: MatchCatalog;
    gameFilter?: string;
    notice?: string | null;
  } = {}
) {
  jest.mocked(useNow).mockReturnValue(FIXED_NOW);
  jest.mocked(deviceTimeZone).mockReturnValue(TEST_TIME_ZONE);
  jest.mocked(useScheduleRouter).mockReturnValue({
    gameFilter: overrides.gameFilter,
    setGameFilter: jest.fn(),
  });

  const { result } = await renderHook(() =>
    useSchedulePresenter(stubBoard(overrides))
  );

  return result.current;
}

describe('useSchedulePresenter', () => {
  it('defaults an invalid game filter to all', async () => {
    const presenter = await present({ gameFilter: 'chess' });

    expect(presenter.selected).toBe('all');
  });

  it('builds chips from the game catalog', async () => {
    const presenter = await present();

    expect(presenter.chips).toEqual([
      { id: 'all', label: 'All' },
      { id: 'lol', label: 'LoL' },
    ]);
  });

  it('uses the filtered empty copy when a game is selected', async () => {
    const presenter = await present({ gameFilter: 'lol' });

    expect(presenter.emptyMessage).toBe(
      'No upcoming League of Legends matches.'
    );
  });

  it('forwards the board notice', async () => {
    const presenter = await present({ notice: 'Using sample data' });

    expect(presenter.notice).toBe('Using sample data');
  });
});
