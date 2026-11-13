import { stubScheduleClock } from '../schedule.harness';
import { dayLabel } from './day-label';

describe('dayLabel', () => {
  it('labels today and tomorrow relative to now', () => {
    const clock = stubScheduleClock();

    expect(dayLabel(clock.calendar.todayKey(clock.now), clock)).toBe('Today');
    expect(dayLabel(clock.calendar.tomorrowKey(clock.now), clock)).toBe(
      'Tomorrow'
    );
  });

  it('uses the calendar heading for other days', () => {
    const clock = stubScheduleClock();

    expect(dayLabel('2026-03-14', clock)).toBe(
      clock.calendar.heading('2026-03-14')
    );
  });
});
