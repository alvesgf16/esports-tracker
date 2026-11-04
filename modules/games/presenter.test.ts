import type { MatchCatalog } from '@/modules/schedule/gateways';
import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/schedule/schedule.harness';

import { stubGameCatalog } from './games.harness';
import { presentGames } from './presenter';

describe('presentGames', () => {
  it('maps upcoming counts into row labels', () => {
    const matches: MatchCatalog = {
      list: () => [
        aMatch({ id: '1', game: 'lol', startsAt: hoursFromNow(2) }),
        aMatch({ id: '2', game: 'lol', startsAt: hoursFromNow(4) }),
        aMatch({ id: '3', game: 'lol', startsAt: hoursFromNow(6) }),
      ],
    };
    const model = presentGames({
      games: stubGameCatalog(),
      matches,
      now: FIXED_NOW,
    });

    expect(model.rows).toEqual([
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
