import type { Match } from '@/modules/schedule/entities';

import { duel } from './sample-teams';
import { sampleKickoff } from './sample-kickoff';

/** Later board plus titles that still appear empty on the Games tab. */
export const LATER_MATCHES: Match[] = [
  {
    id: 'valorant-emea',
    game: 'valorant',
    name: 'Fnatic vs Team Heretics',
    tournament: 'VCT · EMEA',
    format: 'Bo3',
    startsAt: sampleKickoff(22),
    teams: duel(['Fnatic', 'FNC'], ['Team Heretics', 'TH']),
  },
  {
    id: 'r6-invite',
    game: 'r6',
    name: 'w7m esports vs FaZe Clan',
    tournament: 'Six Invitational · Playoffs',
    format: 'Bo3',
    startsAt: sampleKickoff(26, 30),
    teams: duel(['w7m esports', 'w7m'], ['FaZe Clan', 'FaZe']),
  },
  {
    id: 'mlbb-worlds',
    game: 'mlbb',
    name: 'ONIC Esports vs Falcons AP.Bren',
    tournament: 'M5 · World Championship',
    format: 'Bo5',
    startsAt: sampleKickoff(28),
    teams: duel(['ONIC Esports', 'ONIC'], ['Falcons AP.Bren', 'AP.Bren']),
  },
  {
    id: 'rl-major',
    game: 'rl',
    name: 'Karmine Corp vs Team BDS',
    tournament: 'RLCS · Major',
    format: 'Bo7',
    startsAt: sampleKickoff(30, 20),
    teams: duel(['Karmine Corp', 'KC'], ['Team BDS', 'BDS']),
  },
  {
    id: 'cod-cdl',
    game: 'cod',
    name: 'OpTic Texas vs Atlanta FaZe',
    tournament: 'CDL · Major',
    format: 'Bo5',
    startsAt: sampleKickoff(46),
    teams: duel(['OpTic Texas', 'TX'], ['Atlanta FaZe', 'ATL']),
  },
  {
    id: 'fifa-fc',
    game: 'fifa',
    name: 'ManuBachoore vs lev',
    tournament: 'eChampions League · Finals',
    format: 'Bo3',
    startsAt: sampleKickoff(50, 15),
    teams: duel(['ManuBachoore', 'Manu'], ['lev', 'lev']),
  },
  {
    id: 'dota-ti',
    game: 'dota2',
    name: 'Xtreme Gaming vs PARIVISION',
    tournament: 'The International · Playoffs',
    format: 'Bo3',
    startsAt: sampleKickoff(54),
    teams: duel(['Xtreme Gaming', 'XG'], ['PARIVISION', 'PARI']),
  },
];
