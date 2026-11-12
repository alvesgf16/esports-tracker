import type { DayCalendar, DayPagerModel, ScheduleClock } from '../contracts';
import { labelDay } from '../use-cases/label-day';

type DayKeySetter = (update: (dayKey: string) => string) => void;

export function dayPager(
  dayKey: string,
  clock: ScheduleClock,
  setDayKey: DayKeySetter
): DayPagerModel {
  return {
    label: labelDay(dayKey, clock),
    onPrev: () => setDayKey(shiftDay(clock.calendar, -1)),
    onNext: () => setDayKey(shiftDay(clock.calendar, 1)),
  };
}

function shiftDay(calendar: DayCalendar, days: number) {
  return (dayKey: string) => calendar.shiftKey(dayKey, days);
}
