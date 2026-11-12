import type { ScheduleClock } from '../contracts';

export function labelDay(dayKey: string, clock: ScheduleClock): string {
  const { calendar, now } = clock;
  const todayKey = calendar.todayKey(now);
  const tomorrowKey = calendar.tomorrowKey(now);

  if (dayKey === todayKey) {
    return 'Today';
  }

  if (dayKey === tomorrowKey) {
    return 'Tomorrow';
  }

  return calendar.heading(dayKey);
}
