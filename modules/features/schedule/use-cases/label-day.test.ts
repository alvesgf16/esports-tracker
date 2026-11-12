import { stubScheduleClock } from '../schedule.harness';
import { labelDay } from './label-day';

describe('labelDay', () => {
  it('labels today and tomorrow relative to now', () => {
    const clock = stubScheduleClock();

    expect(labelDay(clock.calendar.todayKey(clock.now), clock)).toBe('Today');
    expect(labelDay(clock.calendar.tomorrowKey(clock.now), clock)).toBe(
      'Tomorrow'
    );
  });

  it('uses the calendar heading for other days', () => {
    const clock = stubScheduleClock();

    expect(labelDay('2026-03-14', clock)).toBe(
      clock.calendar.heading('2026-03-14')
    );
  });
});
