import { formatCountdown } from './format-time';

/** Local noon on a fixed calendar day — avoids UTC/local day-boundary drift. */
const FIXED_NOW = new Date(2026, 2, 15, 12, 0, 0, 0).getTime();
const HOUR_MS = 60 * 60 * 1000;

function hoursFromNow(hours: number): string {
  return new Date(FIXED_NOW + hours * HOUR_MS).toISOString();
}

describe('formatCountdown', () => {
  it('returns Starting under one minute', () => {
    const startsAt = new Date(FIXED_NOW + 20_000).toISOString();

    expect(formatCountdown(startsAt, FIXED_NOW)).toBe('Starting');
  });

  it('returns minutes under one hour', () => {
    expect(formatCountdown(hoursFromNow(0.5), FIXED_NOW)).toBe('30m');
  });

  it('returns hours without leftover minutes', () => {
    expect(formatCountdown(hoursFromNow(2), FIXED_NOW)).toBe('2h');
  });

  it('returns hours and minutes together', () => {
    const startsAt = new Date(FIXED_NOW + 2.5 * 60 * 60 * 1000).toISOString();

    expect(formatCountdown(startsAt, FIXED_NOW)).toBe('2h 30m');
  });

  it('returns days past twenty-four hours', () => {
    expect(formatCountdown(hoursFromNow(30), FIXED_NOW)).toBe('1d');
  });
});
