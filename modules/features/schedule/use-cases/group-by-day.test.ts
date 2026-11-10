import { aMatch, hoursFromNow } from '@/modules/shared/shared.harness';

import { stubDayCalendar, stubScheduleClock } from '../schedule.harness';
import { groupByDay } from './group-by-day';

describe('groupByDay', () => {
  it('labels today and tomorrow relative to now', () => {
    const matches = [
      aMatch({ id: 'today', startsAt: hoursFromNow(3) }),
      aMatch({ id: 'tomorrow', startsAt: hoursFromNow(24) }),
    ];

    const groups = groupByDay(matches, stubScheduleClock());

    expect(groups.map((group) => group.label)).toEqual(['Today', 'Tomorrow']);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['today']);
    expect(groups[1].matches.map((match) => match.id)).toEqual(['tomorrow']);
  });

  it('keeps multiple matches in the same day group', () => {
    const matches = [
      aMatch({ id: 'a', startsAt: hoursFromNow(1) }),
      aMatch({ id: 'b', startsAt: hoursFromNow(2) }),
    ];

    const groups = groupByDay(matches, stubScheduleClock());

    expect(groups).toHaveLength(1);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['a', 'b']);
  });

  it('keeps Alberta on permanent -06 after winter 2026', () => {
    // 05:30Z is still Tue evening under -06, but Wed morning under stale -07.
    const match = aMatch({ id: 'abt', startsAt: '2026-11-05T06:30:00Z' });
    const now = Date.parse('2026-11-05T05:30:00Z');

    const groups = groupByDay(
      [match],
      stubScheduleClock({
        now,
        calendar: stubDayCalendar('America/Edmonton'),
      })
    );

    expect(groups[0].label).toBe('Tomorrow');
  });
});
