import { aMatch, FIXED_NOW, hoursFromNow } from '../schedule.harness';
import { groupByDay } from './day-groups';

describe('groupByDay', () => {
  it('labels today and tomorrow relative to now', () => {
    const groups = groupByDay(
      [
        aMatch({ id: 'today', startsAt: hoursFromNow(3) }),
        aMatch({ id: 'tomorrow', startsAt: hoursFromNow(24) }),
      ],
      FIXED_NOW
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
      FIXED_NOW
    );

    expect(groups).toHaveLength(1);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['a', 'b']);
  });
});
