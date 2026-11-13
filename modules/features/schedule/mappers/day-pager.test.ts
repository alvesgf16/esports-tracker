import { stubScheduleClock } from '../schedule.harness';
import { dayPager } from './day-pager';

describe('dayPager', () => {
  it('labels the selected day and shifts on prev and next', () => {
    const clock = stubScheduleClock();
    const selectDayFromKey = jest.fn();
    const pager = dayPager(
      clock.calendar.todayKey(clock.now),
      clock,
      selectDayFromKey
    );

    expect(pager.label).toBe('Today');

    pager.onNext();
    pager.onPrev();

    expect(selectDayFromKey).toHaveBeenNthCalledWith(1, '2026-03-16');
    expect(selectDayFromKey).toHaveBeenNthCalledWith(2, '2026-03-14');
  });
});
