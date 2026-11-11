import type { Team } from '@/modules/shared/entities';

import { G2_VS_FNC } from '../live.harness';
import { matchOptionalsFrom } from './match-optionals-from';

const TEAMS: Team[] = G2_VS_FNC.teams;

describe('matchOptionalsFrom', () => {
  it('keeps a valid status value', () => {
    const parsed = matchOptionalsFrom({ status: 'running' }, TEAMS);

    expect(parsed).toEqual({ status: 'running' });
  });

  it('rejects unknown status', () => {
    expect(matchOptionalsFrom({ status: 'canceled' }, TEAMS)).toBeNull();
  });

  it('maps series scores and a winner', () => {
    const optionals = {
      scores: [
        { teamId: 'g2', score: 2 },
        { teamId: 'fnc', score: 1 },
      ],
      winnerId: 'g2',
    };

    expect(matchOptionalsFrom(optionals, TEAMS)).toEqual(optionals);
  });

  it('omits empty scores', () => {
    const parsed = matchOptionalsFrom({ scores: [] }, TEAMS);

    expect(parsed).toEqual({});
  });

  it('keeps a zero score', () => {
    const optionals = {
      scores: [
        { teamId: 'g2', score: 1 },
        { teamId: 'fnc', score: 0 },
      ],
    };

    expect(matchOptionalsFrom(optionals, TEAMS)).toEqual(optionals);
  });

  it('rejects a score that is not a non-negative integer', () => {
    expect(
      matchOptionalsFrom({ scores: [{ teamId: 'g2', score: 1.5 }] }, TEAMS)
    ).toBeNull();
  });

  it('rejects an incomplete series score', () => {
    expect(
      matchOptionalsFrom({ scores: [{ teamId: 'g2' }] }, TEAMS)
    ).toBeNull();
  });

  it('drops a score for an unknown team', () => {
    const parsed = matchOptionalsFrom(
      {
        scores: [
          { teamId: 'g2', score: 2 },
          { teamId: 'someone-else', score: 1 },
        ],
      },
      TEAMS
    );

    expect(parsed?.scores).toEqual([{ teamId: 'g2', score: 2 }]);
  });

  it('omits scores when none match a team', () => {
    const parsed = matchOptionalsFrom(
      { scores: [{ teamId: 'someone-else', score: 1 }] },
      TEAMS
    );

    expect(parsed).toEqual({});
  });

  it('drops a winner that is not a team', () => {
    const parsed = matchOptionalsFrom(
      {
        scores: [{ teamId: 'g2', score: 2 }],
        winnerId: 'someone-else',
      },
      TEAMS
    );

    expect(parsed?.winnerId).toBeUndefined();
    expect(parsed?.scores).toEqual([{ teamId: 'g2', score: 2 }]);
  });
});
