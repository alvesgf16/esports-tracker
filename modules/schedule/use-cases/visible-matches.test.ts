import { aMatch, FIXED_NOW, hoursFromNow } from '../schedule.harness';
import { visibleMatches } from './visible-matches';

describe('visibleMatches', () => {
  it('keeps only matches for the selected game', () => {
    const matches = [
      aMatch({ id: 'lol-1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: 'cs-1', game: 'cs2', startsAt: hoursFromNow(3) }),
    ];

    expect(
      visibleMatches(matches, 'lol', FIXED_NOW).map((match) => match.id)
    ).toEqual(['lol-1']);
  });

  it('sorts matches by kickoff ascending', () => {
    const matches = [
      aMatch({ id: 'later', startsAt: hoursFromNow(5) }),
      aMatch({ id: 'sooner', startsAt: hoursFromNow(1) }),
    ];
    const kickoffs = visibleMatches(matches, 'all', FIXED_NOW).map((match) =>
      new Date(match.startsAt).getTime()
    );

    expect(kickoffs).toEqual([...kickoffs].sort((left, right) => left - right));
  });

  it('hides finished matches', () => {
    const matches = [aMatch({ startsAt: hoursFromNow(-4) })];

    expect(visibleMatches(matches, 'all', FIXED_NOW)).toEqual([]);
  });
});
