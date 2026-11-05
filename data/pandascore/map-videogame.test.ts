import { mapVideogame } from './map-videogame';
import { aVendorVideogame } from './pandascore.harness';

describe('mapVideogame', () => {
  it('maps a traditional title from the vendor slug', () => {
    expect(mapVideogame(aVendorVideogame())).toEqual({
      id: 'league-of-legends',
      name: 'LoL',
      shortName: 'LoL',
    });
  });

  it('drops simulated sports', () => {
    expect(
      mapVideogame(aVendorVideogame({ name: 'eSoccer', slug: 'e-soccer' }))
    ).toBeNull();
  });
});
