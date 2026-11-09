import type { Match } from '../entities';
import { aMatch, FIXED_NOW, hoursFromNow } from '../shared.harness';
import { visibleMatchesFor } from './visible-matches-for';

function snapshot(matches: Match[]) {
  return { matches, referenceTime: FIXED_NOW };
}

describe('visibleMatchesFor', () => {
  it('keeps only the selected game', () => {
    const matches = [
      aMatch({ id: 'lol-1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: 'cs-1', game: 'cs2', startsAt: hoursFromNow(3) }),
    ];

    expect(
      visibleMatchesFor('lol', snapshot(matches)).map((match) => match.id)
    ).toEqual(['lol-1']);
  });

  it('sorts by kickoff ascending', () => {
    const matches = [
      aMatch({ id: 'later', startsAt: hoursFromNow(5) }),
      aMatch({ id: 'sooner', startsAt: hoursFromNow(1) }),
    ];

    expect(
      visibleMatchesFor(null, snapshot(matches)).map((match) => match.id)
    ).toEqual(['sooner', 'later']);
  });

  it('hides finished matches past the live window', () => {
    const matches = [aMatch({ startsAt: hoursFromNow(-4) })];

    expect(visibleMatchesFor(null, snapshot(matches))).toEqual([]);
  });

  it('hides matches marked finished even inside the live window', () => {
    const matches = [
      aMatch({
        startsAt: hoursFromNow(-1),
        status: 'finished',
      }),
    ];

    expect(visibleMatchesFor(null, snapshot(matches))).toEqual([]);
  });

  it('keeps long-running matches via status', () => {
    const matches = [
      aMatch({
        id: 'bo5-live',
        startsAt: hoursFromNow(-4),
        status: 'running',
      }),
    ];

    expect(
      visibleMatchesFor(null, snapshot(matches)).map((match) => match.id)
    ).toEqual(['bo5-live']);
  });
});
