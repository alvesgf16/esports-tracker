import type { Match } from '@/modules/shared/entities';

import type { DayGroup, ScheduleClock } from '../contracts';

type DayEntry = readonly [string, Match[]];

export function groupByDay(matches: Match[], clock: ScheduleClock): DayGroup[] {
  const { calendar } = clock;

  const dayKey = (match: Match): string => calendar.dayKey(match.startsAt);

  const matchesByDay = Map.groupBy(matches, dayKey);
  const toDayGroup = (dayEntry: DayEntry): DayGroup =>
    dayGroup(dayEntry, clock);

  return Array.from(matchesByDay, toDayGroup);
}

function dayGroup([dayKey, matches]: DayEntry, clock: ScheduleClock): DayGroup {
  return {
    dayKey,
    label: dayLabel(dayKey, clock),
    matches,
  };
}

function dayLabel(dayKey: string, clock: ScheduleClock): string {
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
