import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/shared/shared.harness';

import { countUpcomingMatchesFor } from './count-upcoming-matches-for';

describe('countUpcomingMatchesFor', () => {
  it('counts visible matches for the game', () => {
    const matches = [
      aMatch({ id: '1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: '2', game: 'lol', startsAt: hoursFromNow(4) }),
      aMatch({ id: '3', game: 'cs2', startsAt: hoursFromNow(3) }),
      aMatch({ id: '4', game: 'lol', startsAt: hoursFromNow(-4) }),
    ];

    expect(
      countUpcomingMatchesFor('lol', { matches, referenceTime: FIXED_NOW })
    ).toBe(2);
  });
});
