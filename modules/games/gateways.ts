import type { Game, GameId } from './entities';

export type GameCatalog = {
  list: () => Game[];
  get: (id: GameId) => Game;
};
