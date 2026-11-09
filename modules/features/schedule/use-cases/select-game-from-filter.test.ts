import type { Game } from '@/modules/shared/entities';

import { selectGameFromFilter } from './select-game-from-filter';

const games: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
  { id: 'valorant', name: 'Valorant', shortName: 'VLR' },
];

describe('selectGameFromFilter', () => {
  it('treats all as no game', () => {
    expect(selectGameFromFilter('all', games)).toBeNull();
  });

  it('accepts a known game id', () => {
    expect(selectGameFromFilter('cs2', games)).toBe('cs2');
  });

  it('returns null for an unknown value', () => {
    expect(selectGameFromFilter('chess', games)).toBeNull();
  });

  it('returns null when the param is missing', () => {
    expect(selectGameFromFilter(undefined, games)).toBeNull();
  });
});
