import type { Match } from '@/modules/shared/entities';

import type { DayGroup, ScheduleClock } from '../contracts';
import { labelDay } from './label-day';

type DayEntry = readonly [string, Match[]];

export function groupByDay(matches: Match[], clock: ScheduleClock): DayGroup[] {
  const { calendar } = clock;

  const dayKey = (match: Match): string => calendar.dayKey(match.startsAt);

  const matchesByDay = Map.groupBy(matches, dayKey);
  const toDayGroup = (dayEntry: DayEntry) => dayGroup(dayEntry, clock);

  return Array.from(matchesByDay, toDayGroup);
}

function dayGroup([dayKey, matches]: DayEntry, clock: ScheduleClock): DayGroup {
  return {
    dayKey,
    label: labelDay(dayKey, clock),
    matches,
  };
}
