import type { Match } from '@/modules/shared/entities';

import { duel } from '../../duel';
import { sampleKickoff } from '../../sample-kickoff';

/** Later board plus titles that still appear empty on the Games tab. */
export const LATER_MATCHES: Match[] = [
  {
    id: 'valorant-emea',
    game: 'valorant',
    name: 'Fnatic vs Team Heretics',
    tournament: 'VCT · EMEA',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(22),
    teams: duel(['Fnatic', 'FNC', 'fnc'], ['Team Heretics', 'TH', 'th']),
  },
  {
    id: 'r6-invite',
    game: 'r6',
    name: 'w7m esports vs FaZe Clan',
    tournament: 'Six Invitational · Playoffs',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(26, 30),
    teams: duel(['w7m esports', 'w7m', 'w7m'], ['FaZe Clan', 'FaZe', 'faze']),
  },
  {
    id: 'mlbb-worlds',
    game: 'mlbb',
    name: 'ONIC Esports vs Falcons AP.Bren',
    tournament: 'M5 · World Championship',
    format: 'Bo5',
    startsAt: sampleKickoff.onTheHour(28),
    teams: duel(
      ['ONIC Esports', 'ONIC', 'onic'],
      ['Falcons AP.Bren', 'AP.Bren', 'apbren']
    ),
  },
  {
    id: 'rl-major',
    game: 'rl',
    name: 'Karmine Corp vs Team BDS',
    tournament: 'RLCS · Major',
    format: 'Bo7',
    startsAt: sampleKickoff.onTheHour(30, 20),
    teams: duel(['Karmine Corp', 'KC', 'kc'], ['Team BDS', 'BDS', 'bds']),
  },
  {
    id: 'cod-cdl',
    game: 'cod',
    name: 'OpTic Texas vs Atlanta FaZe',
    tournament: 'CDL · Major',
    format: 'Bo5',
    startsAt: sampleKickoff.onTheHour(46),
    teams: duel(['OpTic Texas', 'TX', 'tx'], ['Atlanta FaZe', 'ATL', 'atl']),
  },
  {
    id: 'fifa-fc',
    game: 'fifa',
    name: 'ManuBachoore vs lev',
    tournament: 'eChampions League · Finals',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(50, 15),
    teams: duel(['ManuBachoore', 'Manu', 'manu'], ['lev', 'lev', 'lev']),
  },
  {
    id: 'dota-ti',
    game: 'dota2',
    name: 'Xtreme Gaming vs PARIVISION',
    tournament: 'The International · Playoffs',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(54),
    teams: duel(['Xtreme Gaming', 'XG', 'xg'], ['PARIVISION', 'PARI', 'pari']),
  },
];
