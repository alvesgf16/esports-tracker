import { aMatch, hoursFromNow } from '@/modules/shared/shared.harness';

import { stubMatchCatalog, stubScheduleClock } from '../schedule.harness';
import { listMatchesFor } from './list-matches-for';

describe('listMatchesFor', () => {
  it('keeps visible matches on the selected day', () => {
    const matches = stubMatchCatalog({
      list: () => [
        aMatch({ id: 'today', startsAt: hoursFromNow(2) }),
        aMatch({ id: 'tomorrow', startsAt: hoursFromNow(26) }),
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
