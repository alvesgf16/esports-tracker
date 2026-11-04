import type { Game } from '@/modules/games/entities';

import { gameName } from './game-name';

const games: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
];

describe('gameName', () => {
  it('returns the catalog name for a known game', () => {
    expect(gameName('lol', games)).toBe('League of Legends');
  });

  it('falls back to the id when the game is missing', () => {
    expect(gameName('cs2', games)).toBe('cs2');
  });
});
