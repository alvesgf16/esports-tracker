import { gameFrom } from './game-from';
import { aVendorVideogame } from '../pandascore.harness';

describe('gameFrom', () => {
  it('maps a traditional title from the vendor slug', () => {
    const videogame = aVendorVideogame();

    const mapped = gameFrom(videogame);

    expect(mapped).toEqual({
      id: 'league-of-legends',
      name: 'LoL',
      shortName: 'LoL',
    });
  });

  it('drops simulated sports', () => {
    const videogame = aVendorVideogame({
      name: 'eSoccer',
      slug: 'e-soccer',
    });

    const mapped = gameFrom(videogame);

    expect(mapped).toBeNull();
  });

  it('builds initials from an unknown hyphenated slug', () => {
    const videogame = aVendorVideogame({
      name: 'Unknown Title',
      slug: 'unknown-title',
    });

    const mapped = gameFrom(videogame);

    expect(mapped?.shortName).toBe('UT');
  });
});
