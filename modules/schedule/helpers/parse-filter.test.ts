import { gameName, parseFilter } from './parse-filter';

describe('parseFilter', () => {
  it('accepts all', () => {
    expect(parseFilter('all')).toBe('all');
  });

  it('accepts a known game id', () => {
    expect(parseFilter('cs2')).toBe('cs2');
  });

  it('reads the first value from an array param', () => {
    expect(parseFilter(['valorant', 'lol'])).toBe('valorant');
  });

  it('returns null for an unknown value', () => {
    expect(parseFilter('chess')).toBeNull();
  });

  it('returns null when the param is missing', () => {
    expect(parseFilter(undefined)).toBeNull();
  });
});

describe('gameName', () => {
  it('returns the catalog name for a known game', () => {
    expect(gameName('lol')).toBe('League of Legends');
  });
});
