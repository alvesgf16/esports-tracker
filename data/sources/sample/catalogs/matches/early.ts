import type { Match } from '@/modules/shared/entities';

import { duel } from '../../duel';
import { sampleKickoff } from '../../sample-kickoff';
import { seriesScores } from '../../series-scores';

/** Near-term board: live, soon, status overrides, and standard duels. */
export const EARLY_MATCHES: Match[] = [
  {
    id: 'live-window',
    game: 'lol',
    name: 'G2 Esports vs Fnatic',
    tournament: 'LEC · Spring Playoffs',
    format: 'Bo5',
    startsAt: sampleKickoff.minutesFromNow(-45),
    teams: duel(['G2 Esports', 'G2', 'g2'], ['Fnatic', 'FNC', 'fnc']),
    scores: seriesScores(['g2', 1], ['fnc', 1]),
  },
  {
    id: 'live-status',
    game: 'cs2',
    name: 'Natus Vincere vs Vitality',
    tournament: 'BLAST · Open Final',
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
    tournament: 'VCT · Americas',
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
    tournament: 'ESL One · Group Stage',
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
    tournament: 'OWCS · Stage 1',
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
    tournament: 'ESL SC2 · Masters',
    format: 'Bo5',
    startsAt: sampleKickoff.onTheHour(3, 30),
    teams: duel(['Serral', 'Serral', 'serral'], ['Maru', 'Maru', 'maru']),
  },
  {
    id: 'upcoming-lol',
    game: 'lol',
    name: 'T1 vs Gen.G',
    tournament: 'LCK · Cup',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(5),
    teams: duel(['T1', 'T1', 't1'], ['Gen.G', 'GEN', 'gen']),
  },
  {
    id: 'upcoming-cs',
    game: 'cs2',
    name: 'FaZe Clan vs MOUZ',
    tournament: 'IEM · Katowice',
    format: 'Bo3',
    startsAt: sampleKickoff.onTheHour(7, 45),
    teams: duel(['FaZe Clan', 'FaZe', 'faze'], ['MOUZ', 'MOUZ', 'mouz']),
  },
];
