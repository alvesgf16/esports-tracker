import type { Game } from '@/modules/games/entities';
import type { GameCatalog } from '@/modules/games/gateways';
import type { Match } from '@/modules/schedule/entities';
import type { MatchCatalog } from '@/modules/schedule/gateways';

export type ScheduleBoardState = {
  games: GameCatalog;
  matches: MatchCatalog;
  notice: string | null;
  ready: boolean;
};

export type LivePayload =
  | { status: 'ok'; games: Game[]; matches: Match[] }
  | { status: 'unconfigured' }
  | { status: 'error'; message?: string };

const emptyMatches: MatchCatalog = { list: () => [] };

const emptyGames: GameCatalog = {
  list: () => [],
  get: (id) => {
    throw new Error(`Unknown game: ${id}`);
  },
};

export const loadingBoard: ScheduleBoardState = {
  games: emptyGames,
  matches: emptyMatches,
  notice: 'Loading schedule…',
  ready: false,
};

export function boardFromPayload(payload: LivePayload): ScheduleBoardState {
  if (payload.status === 'ok') {
    return {
      games: catalogFromGames(payload.games),
      matches: { list: () => payload.matches },
      notice: null,
      ready: true,
    };
  }

  if (payload.status === 'unconfigured') {
    return failedBoard('Schedule API is not configured.');
  }

  return failedBoard(payload.message ?? "Couldn't load schedule.");
}

export function failedBoard(notice: string): ScheduleBoardState {
  return {
    games: emptyGames,
    matches: emptyMatches,
    notice,
    ready: true,
  };
}

function catalogFromGames(games: Game[]): GameCatalog {
  return {
    list: () => games,
    get: (id) => {
      const game = games.find((item) => item.id === id);

      if (!game) {
        throw new Error(`Unknown game: ${id}`);
      }

      return game;
    },
  };
}
