import { aMatch } from '@/modules/shared/shared.harness';

import { sideScore } from './side-score';

const ALPHA = { id: 'alpha', name: 'Alpha', shortName: 'ALP' };
const SERIES = [
  { teamId: 'alpha', score: 1 },
  { teamId: 'beta', score: 0 },
];
const ZERO_SERIES = [
  { teamId: 'alpha', score: 0 },
  { teamId: 'beta', score: 0 },
];

describe('sideScore', () => {
  it('hides scores before a two-team series has started', () => {
    expect(
      sideScore(
        ALPHA,
        aMatch({ status: 'not_started', scores: ZERO_SERIES }),
        'upcoming'
      )
    ).toBeNull();
  });

  it('hides scores when the match is not a two-team series', () => {
    expect(
      sideScore(
        ALPHA,
        aMatch({
          teams: [
            ALPHA,
            { id: 'beta', name: 'Beta', shortName: 'BET' },
            { id: 'gamma', name: 'Gamma', shortName: 'GAM' },
          ],
          scores: SERIES,
          status: 'running',
        }),
        'live'
      )
    ).toBeNull();
  });

  it('maps the team score once the series is running', () => {
    expect(
      sideScore(ALPHA, aMatch({ status: 'running', scores: SERIES }), 'live')
    ).toBe('1');
  });

  it('maps a live 0–0 once the series has started', () => {
    expect(
      sideScore(
        ALPHA,
        aMatch({ status: 'running', scores: ZERO_SERIES }),
        'live'
      )
    ).toBe('0');
  });

  it('maps a finished score when the winner is set', () => {
    expect(
      sideScore(
        ALPHA,
        aMatch({ status: 'finished', scores: SERIES, winnerId: 'alpha' }),
        'finished'
      )
    ).toBe('1');
  });

  it('returns null when the side has no matching score entry', () => {
    expect(
      sideScore(
        { id: 'gamma', name: 'Gamma', shortName: 'GAM' },
        aMatch({ status: 'running', scores: SERIES }),
        'live'
      )
    ).toBeNull();
  });
});
