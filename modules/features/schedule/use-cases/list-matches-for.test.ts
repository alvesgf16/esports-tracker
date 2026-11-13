import { aMatch, hoursFromNow } from '@/modules/shared/shared.harness';

import {
  stubMatchCatalog,
  stubScheduleClock,
  todayAndTomorrowMatches,
} from '../schedule.harness';
import { listMatchesFor } from './list-matches-for';

describe('listMatchesFor', () => {
  it('keeps visible matches on the selected day', () => {
    const matches = stubMatchCatalog({
      list: () => [
        ...todayAndTomorrowMatches(),
        aMatch({ id: 'finished', startsAt: hoursFromNow(-4) }),
      ],
    });

    expect(
      listMatchesFor(null, '2026-03-15', {
        matches,
        clock: stubScheduleClock(),
      }).map((match) => match.id)
    ).toEqual(['today']);
  });
});
