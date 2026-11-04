import type { Match } from '@/data/types';

export type DayGroup = {
  key: string;
  label: string;
  matches: Match[];
};

type DayBuckets = {
  groups: Map<string, DayGroup>;
  today: Date;
  tomorrow: Date;
};

export function groupByDay(matches: Match[], now = Date.now()): DayGroup[] {
  const today = startOfDay(new Date(now));
  const buckets: DayBuckets = {
    groups: new Map(),
    today,
    tomorrow: addDays(today, 1),
  };

  for (const match of matches) {
    addToDayGroup(match, buckets);
  }

  return [...buckets.groups.values()];
}

function addToDayGroup(match: Match, buckets: DayBuckets): void {
  const day = startOfDay(new Date(match.startsAt));
  const key = day.toISOString();
  const existing = buckets.groups.get(key);

  if (existing) {
    existing.matches.push(match);

    return;
  }

  buckets.groups.set(key, {
    key,
    label: dayLabel(day, buckets.today, buckets.tomorrow),
    matches: [match],
  });
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);

  next.setDate(date.getDate() + days);

  return next;
}

function dayLabel(day: Date, today: Date, tomorrow: Date): string {
  if (day.getTime() === today.getTime()) {
    return 'Today';
  }

  if (day.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }

  return day.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}
