import { calendarDay } from './calendar-day';

const edmontonDawn = Date.parse('2026-11-05T05:30:00Z');

describe('calendarDay', () => {
  it('keys an instant in the given IANA zone', () => {
    expect(calendarDay.dayKey('2026-11-05T06:30:00Z', 'America/Edmonton')).toBe(
      '2026-11-05'
    );
  });

  it('keeps Alberta on -06 after clocks would have fallen back', () => {
    expect(calendarDay.todayKey(edmontonDawn, 'America/Edmonton')).toBe(
      '2026-11-04'
    );
    expect(calendarDay.tomorrowKey(edmontonDawn, 'America/Edmonton')).toBe(
      '2026-11-05'
    );
  });

  it('formats a calendar heading in the given zone', () => {
    expect(calendarDay.heading('2026-11-05', 'UTC')).toBe('Thursday, Nov 5');
  });

  it('binds methods to a zone', () => {
    const days = calendarDay.forZone('America/Edmonton');

    expect(days.dayKey('2026-11-05T06:30:00Z')).toBe('2026-11-05');
    expect(days.todayKey(edmontonDawn)).toBe('2026-11-04');
    expect(days.shiftKey('2026-11-04', 1)).toBe('2026-11-05');
  });

  it('shifts a day key by a signed number of days', () => {
    expect(calendarDay.shiftKey('2026-03-15', 1, 'UTC')).toBe('2026-03-16');
    expect(calendarDay.shiftKey('2026-03-15', -1, 'UTC')).toBe('2026-03-14');
  });

  it('shifts across months in the given zone', () => {
    expect(calendarDay.shiftKey('2026-11-01', -1, 'America/Edmonton')).toBe(
      '2026-10-31'
    );
  });
});
