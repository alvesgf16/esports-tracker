import { shortNameForSlug } from './short-name-for-slug';

describe('shortNameForSlug', () => {
  it('returns the known short name for a mapped slug', () => {
    expect(shortNameForSlug('league-of-legends')).toBe('LoL');
  });

  it('builds initials from an unknown hyphenated slug', () => {
    expect(shortNameForSlug('unknown-title')).toBe('UT');
  });
});
