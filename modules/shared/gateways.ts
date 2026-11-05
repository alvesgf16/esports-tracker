import type { Game, GameId, Match } from './entities';

export type GameCatalog = {
  list: () => Game[];
  get: (id: GameId) => Game;
};

export type MatchCatalog = {
  list: () => Match[];
};
