import type { DayPagerModel, ScheduleClock } from '../contracts';
import { dayLabel } from './day-label';

type DayKeySetter = (dayKey: string) => void;

export function dayPager(
  dayKey: string,
  clock: ScheduleClock,
  selectDayFromKey: DayKeySetter
): DayPagerModel {
  const { calendar } = clock;

  return {
    label: dayLabel(dayKey, clock),
    onPrev: () => selectDayFromKey(calendar.shiftKey(dayKey, -1)),
    onNext: () => selectDayFromKey(calendar.shiftKey(dayKey, 1)),
  };
}
