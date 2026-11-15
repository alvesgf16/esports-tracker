import { teamWithOptionals } from './team-with-optionals';

describe('teamWithOptionals', () => {
  it('includes id when present', () => {
    expect(
      teamWithOptionals({ id: 'g2', name: 'G2 Esports', shortName: 'G2' })
    ).toEqual({
      id: 'g2',
      name: 'G2 Esports',
      shortName: 'G2',
    });
  });

  it('omits id when missing', () => {
    expect(teamWithOptionals({ name: 'G2 Esports', shortName: 'G2' })).toEqual({
      name: 'G2 Esports',
      shortName: 'G2',
    });
  });

  it('includes imageUrl when present', () => {
    expect(
      teamWithOptionals({
        name: 'G2 Esports',
        shortName: 'G2',
        imageUrl: 'https://cdn.example/g2.png',
      })
    ).toEqual({
      name: 'G2 Esports',
      shortName: 'G2',
      imageUrl: 'https://cdn.example/g2.png',
    });
  });
});
