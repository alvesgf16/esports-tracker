import type { Game, Match } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';

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
    return boardFromCatalogs(catalogFromGames(payload.games), {
      list: () => payload.matches,
    });
  }

  if (payload.status === 'unconfigured') {
    return failedBoard('Schedule API is not configured.');
  }

  return failedBoard(payload.message ?? "Couldn't load schedule.");
}

export function boardFromCatalogs(
  games: GameCatalog,
  matches: MatchCatalog
): ScheduleBoardState {
  return {
    games,
    matches,
    notice: null,
    ready: true,
  };
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
