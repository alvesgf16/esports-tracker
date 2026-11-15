import { aCompetition, aMatch } from '@/modules/shared/shared.harness';

import {
  mixedGameCatalog,
  stubLogos,
  stubScheduleClock,
} from '../schedule.harness';
import { competitionDisclosures } from './competition-disclosures';

const expansion = {
  isExpanded: () => true,
  toggle: jest.fn(),
};

describe('competitionDisclosures', () => {
  it('names the competition and the game on the disclosure', () => {
    const disclosures = competitionDisclosures({
      matches: [aMatch()],
      games: mixedGameCatalog(),
      clock: stubScheduleClock(),
      logos: stubLogos(),
      expansion,
    });

    expect(disclosures[0].label).toBe('LEC · Spring · LoL');
    expect(disclosures[0].expanded).toBe(true);
  });

  it('groups mixed titles into one disclosure per competition', () => {
    const disclosures = competitionDisclosures({
      matches: [
        aMatch({ id: 'lec-1' }),
        aMatch({
          id: 'blast',
          game: 'cs2',
          competition: aCompetition('BLAST · Open'),
        }),
        aMatch({ id: 'lec-2' }),
      ],
      games: mixedGameCatalog(),
      clock: stubScheduleClock(),
      logos: stubLogos(),
      expansion,
    });

    expect(disclosures.map((disclosure) => disclosure.label)).toEqual([
      'LEC · Spring · LoL',
      'BLAST · Open · CS2',
    ]);
    expect(disclosures[0].matches.map((match) => match.id)).toEqual([
      'lec-1',
      'lec-2',
    ]);
  });

  it('copies a competition image url onto the disclosure', () => {
    const disclosures = competitionDisclosures({
      matches: [
        aMatch({
          id: 'lec-1',
          competition: aCompetition(
            'LEC · Spring',
            'https://cdn.example/lec.png'
          ),
        }),
        aMatch({ id: 'lec-2' }),
      ],
      games: mixedGameCatalog(),
      clock: stubScheduleClock(),
      logos: stubLogos(),
      expansion,
    });

    expect(disclosures[0].imageUrl).toBe('https://cdn.example/lec.png');
  });

  it('omits a competition image before the client is ready', () => {
    const disclosures = competitionDisclosures({
      matches: [
        aMatch({
          competition: aCompetition(
            'LEC · Spring',
            'https://cdn.example/lec.png'
          ),
        }),
      ],
      games: mixedGameCatalog(),
      clock: stubScheduleClock(),
      logos: stubLogos({ isClient: false }),
      expansion,
    });

    expect(disclosures[0].imageUrl).toBeUndefined();
  });
});
