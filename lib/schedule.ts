import { MATCHES } from '@/data/matches';
import type { GameFilter, Match } from '@/data/types';

export type MatchStatus = 'live' | 'soon' | 'upcoming' | 'finished';

export type DayGroup = {
  key: string;
  label: string;
  matches: Match[];
};

const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const SOON_WINDOW_MS = 60 * 60 * 1000;

export function getMatchStatus(
  startsAt: string,
  now = Date.now()
): MatchStatus {
  const start = new Date(startsAt).getTime();
  const delta = start - now;

  if (delta <= 0 && -delta < LIVE_WINDOW_MS) {
    return 'live';
  }
  if (delta <= 0) {
    return 'finished';
  }
  if (delta <= SOON_WINDOW_MS) {
    return 'soon';
  }
  return 'upcoming';
}

export function getVisibleMatches(game: GameFilter, now = Date.now()): Match[] {
  return MATCHES.filter((match) => isVisibleMatch(match, game, now)).sort(
    byKickoff
  );
}

export function groupMatchesByDay(
  matches: Match[],
  now = Date.now()
): DayGroup[] {
  const today = startOfDay(new Date(now));
  const buckets = {
    groups: new Map<string, DayGroup>(),
    today,
    tomorrow: addDays(today, 1),
  };

  for (const match of matches) {
    addToDayGroup(match, buckets);
  }

  return [...buckets.groups.values()];
}

function isVisibleMatch(match: Match, game: GameFilter, now: number): boolean {
  if (game !== 'all' && match.game !== game) {
    return false;
  }
  return getMatchStatus(match.startsAt, now) !== 'finished';
}

function byKickoff(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}

type DayBuckets = {
  groups: Map<string, DayGroup>;
  today: Date;
  tomorrow: Date;
};

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
