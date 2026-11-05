import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
  TEST_TIME_ZONE,
} from '../schedule.harness';
import { groupByDay } from './group-by-day';

describe('groupByDay', () => {
  it('labels today and tomorrow relative to now', () => {
    const groups = groupByDay(
      [
        aMatch({ id: 'today', startsAt: hoursFromNow(3) }),
        aMatch({ id: 'tomorrow', startsAt: hoursFromNow(24) }),
      ],
      FIXED_NOW,
      TEST_TIME_ZONE
    );

    expect(groups.map((group) => group.label)).toEqual(['Today', 'Tomorrow']);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['today']);
    expect(groups[1].matches.map((match) => match.id)).toEqual(['tomorrow']);
  });

  it('keeps multiple matches in the same day group', () => {
    const groups = groupByDay(
      [
        aMatch({ id: 'a', startsAt: hoursFromNow(1) }),
        aMatch({ id: 'b', startsAt: hoursFromNow(2) }),
      ],
      FIXED_NOW,
      TEST_TIME_ZONE
    );

    expect(groups).toHaveLength(1);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['a', 'b']);
  });

  it('keeps Alberta on permanent -06 after winter 2026', () => {
    // 05:30Z is still Tue evening under -06, but Wed morning under stale -07.
    const groups = groupByDay(
      [aMatch({ id: 'abt', startsAt: '2026-11-05T06:30:00Z' })],
      Date.parse('2026-11-05T05:30:00Z'),
      'America/Edmonton'
    );

    expect(groups[0].label).toBe('Tomorrow');
  });
});
