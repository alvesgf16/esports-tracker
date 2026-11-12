import { teamWithOptionalId } from './team-with-optional-id';

describe('teamWithOptionalId', () => {
  it('includes id when present', () => {
    expect(
      teamWithOptionalId({ id: 'g2', name: 'G2 Esports', shortName: 'G2' })
    ).toEqual({
      id: 'g2',
      name: 'G2 Esports',
      shortName: 'G2',
    });
  });

  it('omits id when missing', () => {
    expect(teamWithOptionalId({ name: 'G2 Esports', shortName: 'G2' })).toEqual(
      {
        name: 'G2 Esports',
        shortName: 'G2',
      }
    );
  });
});
