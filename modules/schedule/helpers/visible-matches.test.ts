import { visibleMatches } from './visible-matches';

describe('visibleMatches', () => {
  it('keeps only matches for the selected game', () => {
    const matches = visibleMatches('lol', Date.now());

    expect(matches.length).toBeGreaterThan(0);
    expect(matches.every((match) => match.game === 'lol')).toBe(true);
  });

  it('sorts matches by kickoff ascending', () => {
    const matches = visibleMatches('all', Date.now());
    const kickoffs = matches.map((match) => new Date(match.startsAt).getTime());

    expect(kickoffs).toEqual([...kickoffs].sort((left, right) => left - right));
  });

  it('hides finished matches when now is far past the board', () => {
    const farFuture = Date.now() + 100 * 24 * 60 * 60 * 1000;

    expect(visibleMatches('all', farFuture)).toEqual([]);
  });
});
