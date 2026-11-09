import duel from './fixtures/duel.json';
import eSoccer from './fixtures/e-soccer.json';
import lobby from './fixtures/lobby.json';
import tbd from './fixtures/tbd.json';
import { mapMatch } from './map-match';
import type { VendorMatch } from './vendor-types';

describe('mapMatch', () => {
  it('maps a two-team duel with league · stage and Bo format', () => {
    expect(mapMatch(duel as VendorMatch)).toEqual({
      id: '1246500',
      game: 'league-of-legends',
      name: 'G2 Esports vs Fnatic',
      tournament: 'LEC · Spring Playoffs',
      format: 'Bo5',
      startsAt: '2026-11-04T19:00:00Z',
      teams: [
        { name: 'G2 Esports', shortName: 'G2' },
        { name: 'Fnatic', shortName: 'FNC' },
      ],
      status: 'not_started',
    });
  });

  it('maps a PUBG lobby as Maps with sixteen teams', () => {
    const match = mapMatch(lobby as VendorMatch);

    expect(match).toMatchObject({
      id: '900001',
      game: 'pubg',
      name: 'Group A — Match 3',
      tournament: 'PGS · Global Series',
      format: 'Maps',
      status: 'running',
    });
    expect(match?.teams).toHaveLength(16);
  });

  it('drops TBD matches with fewer than two opponents', () => {
    expect(mapMatch(tbd as VendorMatch)).toBeNull();
  });

  it('drops simulated sports matches', () => {
    expect(mapMatch(eSoccer as VendorMatch)).toBeNull();
  });
});
