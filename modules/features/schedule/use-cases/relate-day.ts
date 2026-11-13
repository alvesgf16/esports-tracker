import type { DayRelation, ScheduleClock } from '../contracts';

export function relateDay(
  dayKey: string,
  clock: ScheduleClock
): DayRelation | null {
  const { calendar, now } = clock;

  if (dayKey === calendar.todayKey(now)) {
    return 'today';
  }

  if (dayKey === calendar.tomorrowKey(now)) {
    return 'tomorrow';
  }

  return null;
}
