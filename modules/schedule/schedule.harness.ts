import type { Game } from '@/data/games';
import type { Match } from '@/data/types';

import type { ScheduleInteractor } from './interactor';

/** Local noon on a fixed calendar day — avoids UTC/local day-boundary drift. */
export const FIXED_NOW = new Date(2026, 2, 15, 12, 0, 0, 0).getTime();

const HOUR_MS = 60 * 60 * 1000;

export function hoursFromNow(hours: number, now = FIXED_NOW): string {
  return new Date(now + hours * HOUR_MS).toISOString();
}

export function aMatch(overrides: Partial<Match> = {}): Match {
  return {
    id: 'm1',
    game: 'lol',
    tournament: 'LEC Spring',
    format: 'Bo3',
    startsAt: hoursFromNow(2),
    teamA: { name: 'Alpha', shortName: 'ALP' },
    teamB: { name: 'Beta', shortName: 'BET' },
    ...overrides,
  };
}

const lol: Game = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

export function stubScheduleInteractor(
  overrides: Partial<ScheduleInteractor> = {}
): ScheduleInteractor {
  return {
    parseFilter: () => 'all',
    matchStatus: () => 'upcoming',
    visibleMatches: () => [],
    groupByDay: () => [],
    gameName: () => lol.name,
    listGames: () => [lol],
    getGame: () => lol,
    ...overrides,
  };
}
