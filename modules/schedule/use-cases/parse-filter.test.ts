import type { Game } from '@/modules/games/entities';

import { parseFilter } from './parse-filter';

const games: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
  { id: 'valorant', name: 'Valorant', shortName: 'VLR' },
];

describe('parseFilter', () => {
  it('accepts all', () => {
    expect(parseFilter('all', games)).toBe('all');
  });

  it('accepts a known game id', () => {
    expect(parseFilter('cs2', games)).toBe('cs2');
  });

  it('reads the first value from an array param', () => {
    expect(parseFilter(['valorant', 'lol'], games)).toBe('valorant');
  });

  it('returns null for an unknown value', () => {
    expect(parseFilter('chess', games)).toBeNull();
  });

  it('returns null when the param is missing', () => {
    expect(parseFilter(undefined, games)).toBeNull();
  });
});
