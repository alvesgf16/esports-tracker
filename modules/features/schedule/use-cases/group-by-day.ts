import type { Match } from '@/modules/shared/entities';

import type { DayGroup, ScheduleClock } from '../contracts';

type DayEntry = readonly [string, Match[]];

export function groupByDay(matches: Match[], clock: ScheduleClock): DayGroup[] {
  const dayKey = (match: Match): string =>
    clock.calendar.dayKey(match.startsAt);
  const matchesByDay = Map.groupBy(matches, dayKey);

  return Array.from(matchesByDay, toDayGroup);
}

function toDayGroup([dayKey, matches]: DayEntry): DayGroup {
  return { dayKey, matches };
}
