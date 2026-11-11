import { G2_VS_FNC } from '../live.harness';
import { toMatch } from './to-match';

describe('toMatch', () => {
  it('maps a complete match', () => {
    expect(toMatch(G2_VS_FNC)).toEqual(G2_VS_FNC);
  });

  it('keeps a valid status value', () => {
    const match = { ...G2_VS_FNC, status: 'running' };

    const parsed = toMatch(match);

    expect(parsed).toEqual(match);
  });

  it('rejects a non-object', () => {
    expect(toMatch([])).toBeNull();
  });

  it('rejects a blank kickoff', () => {
    expect(toMatch({ ...G2_VS_FNC, startsAt: '  ' })).toBeNull();
  });

  it('rejects an incomplete team', () => {
    const match = { ...G2_VS_FNC, teams: [{ name: 'G2 Esports' }] };

    const parsed = toMatch(match);

    expect(parsed).toBeNull();
  });

  it('rejects unknown status', () => {
    expect(toMatch({ ...G2_VS_FNC, status: 'canceled' })).toBeNull();
  });

  it('maps series scores and a winner', () => {
    const match = {
      ...G2_VS_FNC,
      scores: [
        { teamId: 'g2', score: 2 },
        { teamId: 'fnc', score: 1 },
      ],
      winnerId: 'g2',
    };

    expect(toMatch(match)).toEqual(match);
  });

  it('omits empty scores', () => {
    const parsed = toMatch({ ...G2_VS_FNC, scores: [] });

    expect(parsed).toEqual(G2_VS_FNC);
    expect(parsed?.scores).toBeUndefined();
  });

  it('keeps a zero score', () => {
    const match = {
      ...G2_VS_FNC,
      scores: [
        { teamId: 'g2', score: 1 },
        { teamId: 'fnc', score: 0 },
      ],
    };

    expect(toMatch(match)).toEqual(match);
  });

  it('rejects a score that is not a non-negative integer', () => {
    expect(
      toMatch({
        ...G2_VS_FNC,
        scores: [{ teamId: 'g2', score: 1.5 }],
      })
    ).toBeNull();
  });

  it('rejects an incomplete series score', () => {
    expect(
      toMatch({
        ...G2_VS_FNC,
        scores: [{ teamId: 'g2' }],
      })
    ).toBeNull();
  });

  it('keeps a team without an id', () => {
    const match = {
      ...G2_VS_FNC,
      teams: [
        { name: 'G2 Esports', shortName: 'G2' },
        { name: 'Fnatic', shortName: 'FNC' },
      ],
    };

    expect(toMatch(match)).toEqual(match);
  });

  it('rejects a blank team id', () => {
    const match = {
      ...G2_VS_FNC,
      teams: [{ id: '  ', name: 'G2 Esports', shortName: 'G2' }],
    };

    expect(toMatch(match)).toBeNull();
  });
});
