import type { Game } from '@/modules/games/entities';
import type { GameCatalog } from '@/modules/games/gateways';

import type { Match } from './entities';
import type { MatchCatalog } from './gateways';

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
    name: 'Alpha vs Beta',
    tournament: 'LEC · Spring',
    format: 'Bo3',
    startsAt: hoursFromNow(2),
    teams: [
      { name: 'Alpha', shortName: 'ALP' },
      { name: 'Beta', shortName: 'BET' },
    ],
    ...overrides,
  };
}

const lol: Game = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return {
    list: () => [lol],
    get: () => lol,
    ...overrides,
  };
}

export function stubMatchCatalog(
  overrides: Partial<MatchCatalog> = {}
): MatchCatalog {
  return {
    list: () => [],
    ...overrides,
  };
}
