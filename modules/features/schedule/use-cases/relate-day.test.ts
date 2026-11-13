import { stubScheduleClock } from '../schedule.harness';
import { relateDay } from './relate-day';

describe('relateDay', () => {
  it('relates a day key to today or tomorrow', () => {
    const clock = stubScheduleClock();

    expect(relateDay(clock.calendar.todayKey(clock.now), clock)).toBe('today');
    expect(relateDay(clock.calendar.tomorrowKey(clock.now), clock)).toBe(
      'tomorrow'
    );
  });

  it('returns null for other calendar days', () => {
    const clock = stubScheduleClock();

    expect(relateDay('2026-03-14', clock)).toBeNull();
  });
});
