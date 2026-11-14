import type { Match } from '@/modules/shared/entities';

import { competition } from '../../competition';
import { duel } from '../../duel';
import { sampleKickoff } from '../../sample-kickoff';
import { seriesScores } from '../../series-scores';
import { LEC_PLAYOFFS } from './lec-playoffs';

/** Near-term board: live, soon, status overrides, and standard duels. */
export const EARLY_MATCHES: Match[] = [
  ...LEC_PLAYOFFS,
  {
    id: 'live-status',
    game: 'cs2',
    name: 'Natus Vincere vs Vitality',
    competition: competition('BLAST · Open Final'),
    format: 'Bo3',
    startsAt: sampleKickoff.minutesFromNow(-4 * 60),
    teams: duel(['Natus Vincere', 'NAVI', 'navi'], ['Vitality', 'VIT', 'vit']),
    status: 'running',
    scores: seriesScores(['navi', 1], ['vit', 0]),
  },
  {
    id: 'finished-status',
    game: 'valorant',
    name: 'Sentinels vs Cloud9',
    competition: competition('VCT · Americas'),
    format: 'Bo3',
    startsAt: sampleKickoff.minutesFromNow(-50),
    teams: duel(['Sentinels', 'SEN', 'sen'], ['Cloud9', 'C9', 'c9']),
    status: 'finished',
    scores: seriesScores(['sen', 2], ['c9', 1]),
    winnerId: 'sen',
  },
  {
    id: 'soon',
    game: 'dota2',
    name: 'Team Spirit vs Team Liquid',
    competition: competition('ESL One · Group Stage'),
    format: 'Bo3',
    startsAt: sampleKickoff.minutesFromNow(30),
    teams: duel(
      ['Team Spirit', 'TSpirit', 'tspirit'],
      ['Team Liquid', 'Liquid', 'liquid']
    ),
    status: 'not_started',
  },
  {
    id: 'first-to',
    game: 'ow',
    name: 'Toronto Defiant vs Seoul Dynasty',
    competition: competition('OWCS · Stage 1'),
    format: 'Ft3',
    startsAt: sampleKickoff.onTheHour(2, 15),
    teams: duel(
      ['Toronto Defiant', 'TOR', 'tor'],
      ['Seoul Dynasty', 'SEO', 'seo']
    ),
  },
  {
    id: 'players',
    game: 'sc2',
    name: 'Serral vs Maru',
    competition: competition('ESL SC2 · Masters'),
    format: 'Bo5',
    startsAt: sampleKickoff.onTheHour(3, 30),
    teams: duel(['Serral', 'Serral', 'serral'], ['Maru', 'Maru', 'maru']),
  },
  {
    id: 'upcoming-lol',
    game: 'lol',
    name: 'T1 vs Gen.G',
    competition: competition('LCK · Cup'),
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(5),
    teams: duel(['T1', 'T1', 't1'], ['Gen.G', 'GEN', 'gen']),
  },
  {
    id: 'upcoming-cs',
    game: 'cs2',
    name: 'FaZe Clan vs MOUZ',
    competition: competition('IEM · Katowice'),
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(7, 45),
    teams: duel(['FaZe Clan', 'FaZe', 'faze'], ['MOUZ', 'MOUZ', 'mouz']),
  },
];
