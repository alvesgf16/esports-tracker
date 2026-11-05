import { mapTeams } from './map-teams';
import { aVendorOpponent } from './pandascore.harness';

describe('mapTeams', () => {
  it('maps opponent names and acronyms', () => {
    expect(
      mapTeams([
        aVendorOpponent('G2 Esports', 'G2'),
        aVendorOpponent('Fnatic', 'FNC'),
      ])
    ).toEqual([
      { name: 'G2 Esports', shortName: 'G2' },
      { name: 'Fnatic', shortName: 'FNC' },
    ]);
  });

  it('falls back to the full name when the acronym is missing', () => {
    expect(mapTeams([aVendorOpponent('Fnatic', null)])).toEqual([
      { name: 'Fnatic', shortName: 'Fnatic' },
    ]);
  });

  it('skips opponents without a name', () => {
    expect(
      mapTeams([aVendorOpponent(null, 'TBD'), aVendorOpponent('Fnatic', 'FNC')])
    ).toEqual([{ name: 'Fnatic', shortName: 'FNC' }]);
  });
});
