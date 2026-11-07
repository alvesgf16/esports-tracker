import type { Match } from '@/modules/shared/entities';

import type { DayCalendar, DayGroup } from '../contracts';

type DayBuckets = {
  groups: Map<string, DayGroup>;
  todayKey: string;
  tomorrowKey: string;
  calendar: DayCalendar;
};

export function groupByDay(
  matches: Match[],
  now: number,
  calendar: DayCalendar
): DayGroup[] {
  const buckets: DayBuckets = {
    groups: new Map(),
    todayKey: calendar.todayKey(now),
    tomorrowKey: calendar.tomorrowKey(now),
    calendar,
  };

  for (const match of matches) {
    addToDayGroup(match, buckets);
  }

  return [...buckets.groups.values()];
}

function addToDayGroup(match: Match, buckets: DayBuckets): void {
  const key = buckets.calendar.key(match.startsAt);
  const existing = buckets.groups.get(key);

  if (existing) {
    existing.matches.push(match);

    return;
  }

  buckets.groups.set(key, {
    key,
    label: dayLabel(key, buckets),
    matches: [match],
  });
}

function dayLabel(key: string, buckets: DayBuckets): string {
  if (key === buckets.todayKey) {
    return 'Today';
  }

  if (key === buckets.tomorrowKey) {
    return 'Tomorrow';
  }

  return buckets.calendar.heading(key);
}
