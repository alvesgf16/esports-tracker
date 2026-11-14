import { aMatch } from '@/modules/shared/shared.harness';

import { mixedGameCatalog, stubScheduleClock } from '../schedule.harness';
import { competitionDisclosures } from './competition-disclosures';

describe('competitionDisclosures', () => {
  it('names the competition and the game on the disclosure', () => {
    const disclosures = competitionDisclosures(
      [aMatch()],
      mixedGameCatalog(),
      stubScheduleClock()
    );

    expect(disclosures[0].label).toBe('LEC · Spring · LoL');
  });

  it('groups mixed titles into one disclosure per competition', () => {
    const disclosures = competitionDisclosures(
      [
        aMatch({ id: 'lec-1' }),
        aMatch({
          id: 'blast',
          game: 'cs2',
          tournament: 'BLAST · Open',
        }),
        aMatch({ id: 'lec-2' }),
      ],
      mixedGameCatalog(),
      stubScheduleClock()
    );

    expect(disclosures.map((disclosure) => disclosure.label)).toEqual([
      'LEC · Spring · LoL',
      'BLAST · Open · CS2',
    ]);
    expect(disclosures[0].matches.map((match) => match.id)).toEqual([
      'lec-1',
      'lec-2',
    ]);
  });
});
