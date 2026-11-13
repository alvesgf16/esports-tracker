import type { ScheduleClock } from '../contracts';
import { relateDay } from '../use-cases/relate-day';

export function dayLabel(dayKey: string, clock: ScheduleClock): string {
  const relation = relateDay(dayKey, clock);

  if (relation === 'today') {
    return 'Today';
  }

  if (relation === 'tomorrow') {
    return 'Tomorrow';
  }

  return clock.calendar.heading(dayKey);
}
