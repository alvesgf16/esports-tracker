import type { Game } from './entities';
import type { GameCatalog } from './gateways';

const sampleGames: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
];

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return {
    list: () => sampleGames,
    get: (id) => {
      const game = sampleGames.find((item) => item.id === id);

      if (!game) {
        throw new Error(`Unknown game: ${id}`);
      }

      return game;
    },
    ...overrides,
  };
}
