import type { Match } from '@/modules/shared/entities';
import { aMatch, FIXED_NOW } from '@/modules/shared/shared.harness';

import type { MatchSideModel, SideEmphasis } from '../contracts';
import { sidesFor } from './sides-for';

function presentedSides(match: Match) {
  return sidesFor(match, FIXED_NOW);
}

function aSide(
  name: string,
  score: string | null = null,
  emphasis: SideEmphasis = 'undecided'
): MatchSideModel {
  return { name, score, emphasis };
}

describe('sidesFor', () => {
  it('maps a lobby match into name and team count without scores', () => {
    const sides = presentedSides(
      aMatch({
        name: 'Group A — Match 3',
        teams: [
          { name: 'Alpha', shortName: 'ALP' },
          { name: 'Beta', shortName: 'BET' },
          { name: 'Gamma', shortName: 'GAM' },
        ],
        scores: [
          { teamId: 'alpha', score: 1 },
          { teamId: 'beta', score: 0 },
        ],
      })
    );

    expect(sides).toEqual({
      left: aSide('Group A — Match 3'),
      right: aSide('3 teams'),
    });
  });

  it('maps a running 1–0 into series scores without a winner', () => {
    const sides = presentedSides(
      aMatch({
        status: 'running',
        scores: [
          { teamId: 'alpha', score: 1 },
          { teamId: 'beta', score: 0 },
        ],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha', '1'),
      right: aSide('Beta', '0'),
    });
  });

  it('maps a live 0–0 so a started series can sit at zero', () => {
    const sides = presentedSides(
      aMatch({
        status: 'running',
        scores: [
          { teamId: 'alpha', score: 0 },
          { teamId: 'beta', score: 0 },
        ],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha', '0'),
      right: aSide('Beta', '0'),
    });
  });

  it('maps a finished 2–1 into scores and winner emphasis', () => {
    const sides = presentedSides(
      aMatch({
        startsAt: new Date(FIXED_NOW - 60_000).toISOString(),
        status: 'finished',
        scores: [
          { teamId: 'alpha', score: 2 },
          { teamId: 'beta', score: 1 },
        ],
        winnerId: 'alpha',
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha', '2', 'winner'),
      right: aSide('Beta', '1', 'loser'),
    });
  });

  it('hides upcoming empty results', () => {
    const sides = presentedSides(aMatch());

    expect(sides).toEqual({
      left: aSide('Alpha'),
      right: aSide('Beta'),
    });
  });

  it('hides an upcoming 0–0 so it does not look decided', () => {
    const sides = presentedSides(
      aMatch({
        status: 'not_started',
        scores: [
          { teamId: 'alpha', score: 0 },
          { teamId: 'beta', score: 0 },
        ],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha'),
      right: aSide('Beta'),
    });
  });

  it('maps a live 1–1 without marking a winner', () => {
    const sides = presentedSides(
      aMatch({
        status: 'running',
        scores: [
          { teamId: 'alpha', score: 1 },
          { teamId: 'beta', score: 1 },
        ],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha', '1'),
      right: aSide('Beta', '1'),
    });
  });

  it('leaves a side blank when that team has no mapped score', () => {
    const sides = presentedSides(
      aMatch({
        status: 'running',
        scores: [{ teamId: 'alpha', score: 1 }],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha', '1'),
      right: aSide('Beta'),
    });
  });

  it('maps a missing team as TBD', () => {
    const sides = presentedSides(
      aMatch({
        teams: [{ id: 'alpha', name: 'Alpha', shortName: 'ALP' }],
      })
    );

    expect(sides).toEqual({
      left: aSide('Alpha'),
      right: aSide('TBD'),
    });
  });
});
