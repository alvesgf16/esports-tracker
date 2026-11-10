import type { Game } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';

export function gameCatalog(games: Game[]): GameCatalog {
  return {
    list: () => games,
    get: (id) => gameById(games, id),
  };
}

function gameById(games: Game[], id: Game['id']): Game {
  const game = games.find((item) => item.id === id);

  if (!game) {
    throw new Error(`Unknown game: ${id}`);
  }

  return game;
}
