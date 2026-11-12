import { stubScheduleClock } from '../schedule.harness';
import { dayPager } from './day-pager';

describe('dayPager', () => {
  it('labels the selected day and shifts on prev and next', () => {
    const clock = stubScheduleClock();
    const setDayKey = jest.fn();
    const pager = dayPager(
      clock.calendar.todayKey(clock.now),
      clock,
      setDayKey
    );

    expect(pager.label).toBe('Today');

    pager.onNext();
    pager.onPrev();

    expect(setDayKey.mock.calls[0][0]('2026-03-15')).toBe('2026-03-16');
    expect(setDayKey.mock.calls[1][0]('2026-03-15')).toBe('2026-03-14');
  });
});
