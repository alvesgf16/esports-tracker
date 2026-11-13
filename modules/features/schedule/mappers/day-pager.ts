import type { DayCalendar, DayPagerModel, ScheduleClock } from '../contracts';
import { dayLabel } from './day-label';

type DayKeySetter = (update: (dayKey: string) => string) => void;

export function dayPager(
  dayKey: string,
  clock: ScheduleClock,
  setDayKey: DayKeySetter
): DayPagerModel {
  return {
    label: dayLabel(dayKey, clock),
    onPrev: () => setDayKey(shiftDay(clock.calendar, -1)),
    onNext: () => setDayKey(shiftDay(clock.calendar, 1)),
  };
}

function shiftDay(calendar: DayCalendar, days: number) {
  return (dayKey: string) => calendar.shiftKey(dayKey, days);
}
