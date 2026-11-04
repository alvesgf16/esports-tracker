import type { Match } from '@/modules/schedule/entities';

import { sampleKickoff } from './sample-kickoff';

/** Second half of the sample board. Swap for a live schedule API later. */
export const LATER_MATCHES: Match[] = [
  {
    id: '7',
    game: 'valorant',
    tournament: 'VCT EMEA',
    format: 'Bo3',
    startsAt: sampleKickoff(26, 30),
    teamA: { name: 'Fnatic', shortName: 'FNC' },
    teamB: { name: 'Team Heretics', shortName: 'TH' },
  },
  {
    id: '8',
    game: 'r6',
    tournament: 'Six Invitational',
    format: 'Bo3',
    startsAt: sampleKickoff(28),
    teamA: { name: 'w7m esports', shortName: 'w7m' },
    teamB: { name: 'FaZe Clan', shortName: 'FaZe' },
  },
  {
    id: '9',
    game: 'mlbb',
    tournament: 'M5 World Championship',
    format: 'Bo5',
    startsAt: sampleKickoff(30, 20),
    teamA: { name: 'ONIC Esports', shortName: 'ONIC' },
    teamB: { name: 'Falcons AP.Bren', shortName: 'AP.Bren' },
  },
  {
    id: '10',
    game: 'dota2',
    tournament: 'The International',
    format: 'Bo3',
    startsAt: sampleKickoff(46),
    teamA: { name: 'Xtreme Gaming', shortName: 'XG' },
    teamB: { name: 'PARIVISION', shortName: 'PARI' },
  },
  {
    id: '11',
    game: 'lol',
    tournament: 'LCS',
    format: 'Bo3',
    startsAt: sampleKickoff(50, 15),
    teamA: { name: 'Cloud9', shortName: 'C9' },
    teamB: { name: 'FlyQuest', shortName: 'FLY' },
  },
  {
    id: '12',
    game: 'cs2',
    tournament: 'ESL Pro League',
    format: 'Bo3',
    startsAt: sampleKickoff(54),
    teamA: { name: 'Spirit', shortName: 'Spirit' },
    teamB: { name: 'The MongolZ', shortName: 'MNGZ' },
  },
];
