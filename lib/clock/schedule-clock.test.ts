import { calendarDay } from './calendar-day';
import { scheduleClock } from './schedule-clock';

const NOW = Date.UTC(2026, 2, 15, 12, 0, 0, 0);
const ZONE = 'UTC';
const STARTS_AT = '2026-03-15T14:00:00.000Z';
const HOUR_MS = 60 * 60 * 1000;

describe('scheduleClock', () => {
  it('binds kickoff, countdown, and calendar to now and time zone', () => {
    const clock = scheduleClock(NOW, ZONE);

    expect(clock.now).toBe(NOW);
    expect(clock.labels.kickoff(STARTS_AT)).toBe('2:00 PM');
    expect(clock.labels.countdown(STARTS_AT)).toBe('2h');
    expect(clock.calendar.dayKey(STARTS_AT)).toBe(
      calendarDay.dayKey(STARTS_AT, ZONE)
    );
  });

  it('formats kickoff in the given IANA zone with bundled tz data', () => {
    expect(
      scheduleClock(NOW, 'UTC').labels.kickoff('2026-11-04T15:05:00Z')
    ).toBe('3:05 PM');
    expect(
      scheduleClock(NOW, 'America/Edmonton').labels.kickoff(
        '2026-11-04T15:05:00Z'
      )
    ).toBe('9:05 AM');
  });

  it('keeps Alberta on -06 after clocks would have fallen back', () => {
    expect(
      scheduleClock(NOW, 'America/Edmonton').labels.kickoff(
        '2026-11-05T03:00:00Z'
      )
    ).toBe('9:00 PM');
  });

  it('returns Starting under one minute', () => {
    const startingTime = new Date(NOW + 20_000).toISOString();

    expect(scheduleClock(NOW, ZONE).labels.countdown(startingTime)).toBe(
      'Starting'
    );
  });

  it('returns minutes under one hour', () => {
    expect(scheduleClock(NOW, ZONE).labels.countdown(hoursFromNow(0.5))).toBe(
      '30m'
    );
  });

  it('returns hours without leftover minutes', () => {
    expect(scheduleClock(NOW, ZONE).labels.countdown(hoursFromNow(2))).toBe(
      '2h'
    );
  });

  it('returns hours and minutes together', () => {
    const startingTime = new Date(NOW + 2.5 * HOUR_MS).toISOString();

    expect(scheduleClock(NOW, ZONE).labels.countdown(startingTime)).toBe(
      '2h 30m'
    );
  });

  it('returns days past twenty-four hours', () => {
    expect(scheduleClock(NOW, ZONE).labels.countdown(hoursFromNow(30))).toBe(
      '1d'
    );
  });
});

function hoursFromNow(hours: number): string {
  return new Date(NOW + hours * HOUR_MS).toISOString();
}
