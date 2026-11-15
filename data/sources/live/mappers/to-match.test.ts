import { G2_VS_FNC } from '../live.harness';
import { toMatch } from './to-match';

describe('toMatch', () => {
  it('maps a complete match', () => {
    expect(toMatch(G2_VS_FNC)).toEqual(G2_VS_FNC);
  });

  it('includes optional match fields', () => {
    const match = {
      ...G2_VS_FNC,
      status: 'running',
      scores: [
        { teamId: 'g2', score: 2 },
        { teamId: 'fnc', score: 1 },
      ],
      winnerId: 'g2',
      competition: {
        title: 'LEC · Spring Playoffs',
        imageUrl: 'https://cdn.pandascore.co/images/league/image/1/lec.png',
      },
    };

    expect(toMatch(match)).toEqual(match);
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

  it('includes a team image url', () => {
    const match = {
      ...G2_VS_FNC,
      teams: [
        {
          id: 'g2',
          name: 'G2 Esports',
          shortName: 'G2',
          imageUrl: 'https://cdn.pandascore.co/images/team/image/g2/g2.png',
        },
        { id: 'fnc', name: 'Fnatic', shortName: 'FNC' },
      ],
    };

    expect(toMatch(match)).toEqual(match);
  });

  it('omits a blank team image url', () => {
    const match = {
      ...G2_VS_FNC,
      teams: [
        {
          id: 'g2',
          name: 'G2 Esports',
          shortName: 'G2',
          imageUrl: '  ',
        },
        { id: 'fnc', name: 'Fnatic', shortName: 'FNC' },
      ],
    };

    expect(toMatch(match)).toEqual({
      ...G2_VS_FNC,
      teams: [
        { id: 'g2', name: 'G2 Esports', shortName: 'G2' },
        { id: 'fnc', name: 'Fnatic', shortName: 'FNC' },
      ],
    });
  });

  it('rejects a blank team id', () => {
    const match = {
      ...G2_VS_FNC,
      teams: [{ id: '  ', name: 'G2 Esports', shortName: 'G2' }],
    };

    expect(toMatch(match)).toBeNull();
  });
});
