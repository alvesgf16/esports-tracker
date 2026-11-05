import { renderHook } from '@testing-library/react-native';

import type { ScheduleBoardState } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import type { MatchCatalog } from '@/modules/shared/gateways';
import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/shared/shared.harness';

import { stubGameCatalog } from './games.harness';
import { useGamesPresenter } from './presenter';
import { useGamesRouter } from './router';

jest.mock('@/lib/use-now');
jest.mock('@/lib/use-schedule-board', () => ({
  useScheduleBoard: (board: ScheduleBoardState) => board,
}));
jest.mock('./router', () => ({
  useGamesRouter: jest.fn(),
}));

describe('useGamesPresenter', () => {
  it('maps upcoming counts into row labels', async () => {
    const matches: MatchCatalog = {
      list: () => [
        aMatch({ id: '1', game: 'lol', startsAt: hoursFromNow(2) }),
        aMatch({ id: '2', game: 'lol', startsAt: hoursFromNow(4) }),
        aMatch({ id: '3', game: 'lol', startsAt: hoursFromNow(6) }),
      ],
    };

    jest.mocked(useNow).mockReturnValue(FIXED_NOW);
    jest.mocked(useGamesRouter).mockReturnValue({
      openSchedule: jest.fn(),
    });

    const { result } = await renderHook(() =>
      useGamesPresenter({
        games: stubGameCatalog(),
        matches,
        notice: null,
        ready: true,
      })
    );

    expect(result.current.rows).toEqual([
      {
        id: 'lol',
        name: 'League of Legends',
        shortName: 'LoL',
        upcomingLabel: '3 upcoming',
        accessibilityLabel: 'League of Legends, 3 upcoming',
      },
      {
        id: 'cs2',
        name: 'Counter-Strike 2',
        shortName: 'CS2',
        upcomingLabel: 'No upcoming matches',
        accessibilityLabel: 'Counter-Strike 2, no upcoming matches',
      },
    ]);
  });
});
