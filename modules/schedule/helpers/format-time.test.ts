import { FIXED_NOW, hoursFromNow } from '../schedule.harness';
import { formatCountdown } from './format-time';

describe('formatCountdown', () => {
  it('returns LIVE when status is live', () => {
    expect(formatCountdown(hoursFromNow(-1), FIXED_NOW, 'live')).toBe('LIVE');
  });

  it('returns Starting under one minute', () => {
    const startsAt = new Date(FIXED_NOW + 20_000).toISOString();

    expect(formatCountdown(startsAt, FIXED_NOW, 'soon')).toBe('Starting');
  });

  it('returns minutes under one hour', () => {
    expect(formatCountdown(hoursFromNow(0.5), FIXED_NOW, 'soon')).toBe('30m');
  });

  it('returns hours without leftover minutes', () => {
    expect(formatCountdown(hoursFromNow(2), FIXED_NOW, 'upcoming')).toBe('2h');
  });

  it('returns hours and minutes together', () => {
    const startsAt = new Date(FIXED_NOW + 2.5 * 60 * 60 * 1000).toISOString();

    expect(formatCountdown(startsAt, FIXED_NOW, 'upcoming')).toBe('2h 30m');
  });

  it('returns days past twenty-four hours', () => {
    expect(formatCountdown(hoursFromNow(30), FIXED_NOW, 'upcoming')).toBe('1d');
  });
});
