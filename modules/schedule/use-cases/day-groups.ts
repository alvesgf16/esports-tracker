import moment from 'moment-timezone';

import type { Match } from '../entities';

export type DayGroup = {
  key: string;
  label: string;
  matches: Match[];
};

type DayBuckets = {
  groups: Map<string, DayGroup>;
  todayKey: string;
  tomorrowKey: string;
  timeZone: string;
};

export function groupByDay(
  matches: Match[],
  now: number,
  timeZone: string
): DayGroup[] {
  const today = moment.tz(now, timeZone).startOf('day');
  const buckets: DayBuckets = {
    groups: new Map(),
    todayKey: today.format('YYYY-MM-DD'),
    tomorrowKey: today.clone().add(1, 'day').format('YYYY-MM-DD'),
    timeZone,
  };

  for (const match of matches) {
    addToDayGroup(match, buckets);
  }

  return [...buckets.groups.values()];
}

function addToDayGroup(match: Match, buckets: DayBuckets): void {
  const key = moment.tz(match.startsAt, buckets.timeZone).format('YYYY-MM-DD');
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

  return moment.tz(key, 'YYYY-MM-DD', buckets.timeZone).format('dddd, MMM D');
}
