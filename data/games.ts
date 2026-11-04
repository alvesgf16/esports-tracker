import type { Game } from '@/modules/games/entities';
import type { GameCatalog } from '@/modules/games/gateways';

export const GAMES: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
  { id: 'valorant', name: 'Valorant', shortName: 'VLR' },
  { id: 'dota2', name: 'Dota 2', shortName: 'Dota' },
  { id: 'r6', name: 'Rainbow Six Siege', shortName: 'R6' },
  { id: 'mlbb', name: 'Mobile Legends', shortName: 'MLBB' },
];

export const sampleGameCatalog: GameCatalog = {
  list: () => GAMES,
  get: (id) => {
    const game = GAMES.find((item) => item.id === id);

    if (!game) {
      throw new Error(`Unknown game: ${id}`);
    }

    return game;
  },
};
