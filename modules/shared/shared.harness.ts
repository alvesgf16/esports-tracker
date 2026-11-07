import type { Game, Match } from './entities';
import type { GameCatalog } from './gateways';

/** UTC noon on a fixed calendar day — stable across host time zones. */
export const FIXED_NOW = Date.UTC(2026, 2, 15, 12, 0, 0, 0);

export const TEST_TIME_ZONE = 'UTC';

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

export function aGameCatalog(games: Game[]): GameCatalog {
  const byId = new Map(games.map((game) => [game.id, game]));

  return {
    list: () => games,
    get: (id) => byId.get(id) ?? unknownGame(id),
  };
}

function unknownGame(id: Game['id']): never {
  throw new Error(`Unknown game: ${id}`);
}
