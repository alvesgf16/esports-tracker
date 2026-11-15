import { aVendorOpponent } from '../pandascore.harness';

import { teamsFrom } from './team-from';

describe('teamsFrom', () => {
  it('maps two opponents', () => {
    expect(
      teamsFrom([
        aVendorOpponent('Alpha', 'ALP', 11),
        aVendorOpponent('Beta', 'BET', 22),
      ])
    ).toEqual([
      { id: '11', name: 'Alpha', shortName: 'ALP' },
      { id: '22', name: 'Beta', shortName: 'BET' },
    ]);
  });

  it('falls back to the full name when the acronym is missing', () => {
    expect(
      teamsFrom([
        aVendorOpponent('Fnatic', null),
        aVendorOpponent('G2 Esports', 'G2'),
      ])
    ).toEqual([
      { name: 'Fnatic', shortName: 'Fnatic' },
      { name: 'G2 Esports', shortName: 'G2' },
    ]);
  });

  it('maps team image urls when present', () => {
    const [alpha, beta] = teamsFrom([
      aVendorOpponent(
        'Alpha',
        'ALP',
        11,
        'https://cdn.pandascore.co/images/team/image/11/alpha.png'
      ),
      aVendorOpponent(
        'Beta',
        'BET',
        22,
        'https://cdn.pandascore.co/images/team/image/22/beta.png'
      ),
    ]);

    expect(alpha.imageUrl).toBe(
      'https://cdn.pandascore.co/images/team/image/11/alpha.png'
    );
    expect(beta.imageUrl).toBe(
      'https://cdn.pandascore.co/images/team/image/22/beta.png'
    );
  });

  it('omits blank team image urls', () => {
    expect(
      teamsFrom([
        aVendorOpponent('Alpha', 'ALP', 11, '  '),
        aVendorOpponent('Beta', 'BET', 22, null),
      ])
    ).toEqual([
      { id: '11', name: 'Alpha', shortName: 'ALP' },
      { id: '22', name: 'Beta', shortName: 'BET' },
    ]);
  });

  it('omits a team image url that is not on an allowed host', () => {
    expect(
      teamsFrom([
        aVendorOpponent('Alpha', 'ALP', 11, 'https://127.0.0.1/alpha.png'),
      ])
    ).toEqual([{ id: '11', name: 'Alpha', shortName: 'ALP' }]);
  });

  it('skips opponents without a name', () => {
    expect(
      teamsFrom([
        aVendorOpponent(null, 'TBD'),
        aVendorOpponent('Fnatic', 'FNC'),
        aVendorOpponent('G2 Esports', 'G2'),
      ])
    ).toEqual([
      { name: 'Fnatic', shortName: 'FNC' },
      { name: 'G2 Esports', shortName: 'G2' },
    ]);
  });
});
