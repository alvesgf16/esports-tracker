import { MATCHES } from '@/data/matches';
import type { GameId, Match } from '@/data/types';

export type MatchStatus = 'live' | 'soon' | 'upcoming' | 'finished';

export type DayGroup = {
  key: string;
  label: string;
  matches: Match[];
};

const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const SOON_WINDOW_MS = 60 * 60 * 1000;

export function getMatchStatus(startsAt: string, now = Date.now()): MatchStatus {
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

export function getVisibleMatches(game: GameId | 'all', now = Date.now()): Match[] {
  return MATCHES.filter((match) => {
    if (game !== 'all' && match.game !== game) {
      return false;
    }
    return getMatchStatus(match.startsAt, now) !== 'finished';
  }).sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

export function groupMatchesByDay(matches: Match[], now = Date.now()): DayGroup[] {
  const today = startOfDay(new Date(now));
  const tomorrow = addDays(today, 1);
  const groups = new Map<string, DayGroup>();

  for (const match of matches) {
    const start = new Date(match.startsAt);
    const day = startOfDay(start);
    const key = day.toISOString();
    const existing = groups.get(key);

    if (existing) {
      existing.matches.push(match);
      continue;
    }

    groups.set(key, {
      key,
      label: dayLabel(day, today, tomorrow),
      matches: [match],
    });
  }

  return [...groups.values()];
}

export function formatKickoff(startsAt: string): string {
  return new Date(startsAt).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatCountdown(startsAt: string, now = Date.now()): string {
  const status = getMatchStatus(startsAt, now);
  if (status === 'live') {
    return 'LIVE';
  }

  const delta = Math.max(0, new Date(startsAt).getTime() - now);
  const totalMinutes = Math.round(delta / 60000);

  if (totalMinutes < 1) {
    return 'Starting';
  }
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) {
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d`;
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
