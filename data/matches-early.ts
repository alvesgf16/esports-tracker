import { sampleKickoff } from './sampleKickoff';
import type { Match } from './types';

/** First half of the sample board. Swap for a live schedule API later. */
export const EARLY_MATCHES: Match[] = [
  {
    id: '1',
    game: 'lol',
    tournament: 'LEC Spring',
    format: 'Bo5',
    startsAt: sampleKickoff(2, 15),
    teamA: { name: 'G2 Esports', shortName: 'G2' },
    teamB: { name: 'Fnatic', shortName: 'FNC' },
  },
  {
    id: '2',
    game: 'cs2',
    tournament: 'BLAST Open',
    format: 'Bo3',
    startsAt: sampleKickoff(3, 30),
    teamA: { name: 'Natus Vincere', shortName: 'NAVI' },
    teamB: { name: 'Vitality', shortName: 'VIT' },
  },
  {
    id: '3',
    game: 'valorant',
    tournament: 'VCT Americas',
    format: 'Bo3',
    startsAt: sampleKickoff(5),
    teamA: { name: 'Sentinels', shortName: 'SEN' },
    teamB: { name: 'Cloud9', shortName: 'C9' },
  },
  {
    id: '4',
    game: 'dota2',
    tournament: 'ESL One',
    format: 'Bo3',
    startsAt: sampleKickoff(7, 45),
    teamA: { name: 'Team Spirit', shortName: 'TSpirit' },
    teamB: { name: 'Team Liquid', shortName: 'Liquid' },
  },
  {
    id: '5',
    game: 'lol',
    tournament: 'LCK Cup',
    format: 'Bo3',
    startsAt: sampleKickoff(10),
    teamA: { name: 'T1', shortName: 'T1' },
    teamB: { name: 'Gen.G', shortName: 'GEN' },
  },
  {
    id: '6',
    game: 'cs2',
    tournament: 'IEM Katowice',
    format: 'Bo3',
    startsAt: sampleKickoff(22),
    teamA: { name: 'FaZe Clan', shortName: 'FaZe' },
    teamB: { name: 'MOUZ', shortName: 'MOUZ' },
  },
];
