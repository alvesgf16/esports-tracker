import { calendarDay } from './calendar-day';
import { formatCountdown } from './format-countdown';
import { formatKickoff } from './format-kickoff';
import { scheduleClock } from './schedule-clock';

const NOW = Date.UTC(2026, 2, 15, 12, 0, 0, 0);
const ZONE = 'UTC';
const STARTS_AT = '2026-03-15T14:00:00.000Z';

describe('scheduleClock', () => {
  it('binds kickoff, countdown, and calendar to now and time zone', () => {
    const clock = scheduleClock(NOW, ZONE);

    expect(clock.now).toBe(NOW);
    expect(clock.labels.kickoff(STARTS_AT)).toBe(
      formatKickoff(STARTS_AT, ZONE)
    );
    expect(clock.labels.countdown(STARTS_AT)).toBe(
      formatCountdown(STARTS_AT, NOW)
    );
    expect(clock.calendar.key(STARTS_AT)).toBe(
      calendarDay.key(STARTS_AT, ZONE)
    );
  });
});
