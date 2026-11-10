import { gameCatalog } from './game-catalog';

const lol = { id: 'lol', name: 'League of Legends', shortName: 'LoL' };

describe('gameCatalog', () => {
  it('lists the given games', () => {
    expect(gameCatalog([lol]).list()).toEqual([lol]);
  });

  it('returns a known game', () => {
    expect(gameCatalog([lol]).get('lol')).toBe(lol);
  });

  it('throws on an unknown id', () => {
    expect(() => gameCatalog([lol]).get('cs2')).toThrow('Unknown game: cs2');
  });
});
