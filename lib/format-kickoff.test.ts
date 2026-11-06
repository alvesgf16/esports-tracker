import { formatKickoff } from './format-kickoff';

describe('formatKickoff', () => {
  it('formats in the given IANA zone with bundled tz data', () => {
    expect(formatKickoff('2026-11-04T15:05:00Z', 'UTC')).toBe('3:05 PM');
    expect(formatKickoff('2026-11-04T15:05:00Z', 'America/Edmonton')).toBe(
      '9:05 AM'
    );
  });

  it('keeps Alberta on -06 after clocks would have fallen back', () => {
    expect(formatKickoff('2026-11-05T03:00:00Z', 'America/Edmonton')).toBe(
      '9:00 PM'
    );
  });
});
