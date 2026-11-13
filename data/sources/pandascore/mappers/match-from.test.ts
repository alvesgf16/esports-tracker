import { aVendorMatch, aVendorOpponent } from '../pandascore.harness';
import type { VendorMatch } from '../vendor-types';

import duel from './fixtures/duel.json';
import eSoccer from './fixtures/e-soccer.json';
import lobby from './fixtures/lobby.json';
import tbd from './fixtures/tbd.json';
import { matchFrom } from './match-from';

describe('matchFrom', () => {
  it('maps a two-team duel with league · stage and Bo format', () => {
    const match = matchFrom(duel as VendorMatch);

    expect(match).toEqual({
      id: '1246500',
      game: 'league-of-legends',
      name: 'G2 Esports vs Fnatic',
      tournament: 'LEC · Spring Playoffs',
      format: 'Bo5',
      startsAt: '2026-11-04T19:00:00Z',
      teams: [
        { id: '126269', name: 'G2 Esports', shortName: 'G2' },
        { id: '398', name: 'Fnatic', shortName: 'FNC' },
      ],
      status: 'not_started',
    });
  });

  it('maps a PUBG lobby as Maps with sixteen teams', () => {
    const match = matchFrom(lobby as VendorMatch);

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
    expect(matchFrom(tbd as VendorMatch)).toBeNull();
  });

  it('drops simulated sports matches', () => {
    expect(matchFrom(eSoccer as VendorMatch)).toBeNull();
  });

  it('formats first-to series as FtN', () => {
    const match = matchFrom(
      aVendorMatch({ match_type: 'first_to', number_of_games: 3 })
    );

    expect(match?.format).toBe('Ft3');
  });

  it('replaces underscores when the type is not a known format', () => {
    const match = matchFrom(
      aVendorMatch({ match_type: 'custom_cup', number_of_games: null })
    );

    expect(match?.format).toBe('custom cup');
  });

  it('falls back to Match when the type is missing', () => {
    const match = matchFrom(
      aVendorMatch({ match_type: null, number_of_games: null })
    );

    expect(match?.format).toBe('Match');
  });

  it('returns the league when it already includes the stage', () => {
    const match = matchFrom(
      aVendorMatch({
        league: { name: 'LEC Spring' },
        tournament: { name: 'Spring' },
      })
    );

    expect(match?.tournament).toBe('LEC Spring');
  });

  it('returns the stage when the league is missing', () => {
    const match = matchFrom(
      aVendorMatch({
        league: null,
        tournament: { name: 'Playoffs' },
      })
    );

    expect(match?.tournament).toBe('Playoffs');
  });

  it('returns Tournament when league and stage are missing', () => {
    const match = matchFrom(aVendorMatch({ league: null, tournament: null }));

    expect(match?.tournament).toBe('Tournament');
  });

  it('strips surrounding space from league and stage', () => {
    const match = matchFrom(
      aVendorMatch({
        league: { name: '  LEC  ' },
        tournament: { name: '  Spring  ' },
      })
    );

    expect(match?.tournament).toBe('LEC · Spring');
  });

  it('maps finished vendor statuses', () => {
    expect(matchFrom(aVendorMatch({ status: 'finished' }))?.status).toBe(
      'finished'
    );
    expect(matchFrom(aVendorMatch({ status: 'canceled' }))?.status).toBe(
      'finished'
    );
    expect(matchFrom(aVendorMatch({ status: 'postponed' }))?.status).toBe(
      'finished'
    );
  });

  it('omits status for an unknown vendor status', () => {
    expect(
      matchFrom(aVendorMatch({ status: 'unknown' }))?.status
    ).toBeUndefined();
  });

  it('falls back to the full name when the acronym is missing', () => {
    const match = matchFrom(
      aVendorMatch({
        opponents: [
          aVendorOpponent('Fnatic', null),
          aVendorOpponent('G2 Esports', 'G2'),
        ],
      })
    );

    expect(match?.teams).toEqual([
      { name: 'Fnatic', shortName: 'Fnatic' },
      { name: 'G2 Esports', shortName: 'G2' },
    ]);
  });

  it('skips opponents without a name', () => {
    const match = matchFrom(
      aVendorMatch({
        opponents: [
          aVendorOpponent(null, 'TBD'),
          aVendorOpponent('Fnatic', 'FNC'),
          aVendorOpponent('G2 Esports', 'G2'),
        ],
      })
    );

    expect(match?.teams).toEqual([
      { name: 'Fnatic', shortName: 'FNC' },
      { name: 'G2 Esports', shortName: 'G2' },
    ]);
  });
});
