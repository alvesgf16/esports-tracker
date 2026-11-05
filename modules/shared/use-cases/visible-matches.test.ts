import { visibleMatches } from './visible-matches';
import { aMatch, FIXED_NOW, hoursFromNow } from '../shared.harness';

describe('visibleMatches', () => {
  it('keeps only the selected game', () => {
    const matches = [
      aMatch({ id: 'lol-1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: 'cs-1', game: 'cs2', startsAt: hoursFromNow(3) }),
    ];

    expect(
      visibleMatches(matches, 'lol', FIXED_NOW).map((match) => match.id)
    ).toEqual(['lol-1']);
  });

  it('sorts by kickoff ascending', () => {
    const matches = [
      aMatch({ id: 'later', startsAt: hoursFromNow(5) }),
      aMatch({ id: 'sooner', startsAt: hoursFromNow(1) }),
    ];

    expect(
      visibleMatches(matches, 'all', FIXED_NOW).map((match) => match.id)
    ).toEqual(['sooner', 'later']);
  });

  it('hides finished matches past the live window', () => {
    const matches = [aMatch({ startsAt: hoursFromNow(-4) })];

    expect(visibleMatches(matches, 'all', FIXED_NOW)).toEqual([]);
  });

  it('hides matches marked finished even inside the live window', () => {
    const matches = [
      aMatch({
        startsAt: hoursFromNow(-1),
        progress: 'finished',
      }),
    ];

    expect(visibleMatches(matches, 'all', FIXED_NOW)).toEqual([]);
  });

  it('keeps long-running matches via progress', () => {
    const matches = [
      aMatch({
        id: 'bo5-live',
        startsAt: hoursFromNow(-4),
        progress: 'running',
      }),
    ];

    expect(
      visibleMatches(matches, 'all', FIXED_NOW).map((match) => match.id)
    ).toEqual(['bo5-live']);
  });
});
