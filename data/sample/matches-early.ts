import type { Match } from '@/modules/shared/entities';

import { duel } from './duel';
import { sampleKickoff } from './sample-kickoff';

/** Near-term board: live, soon, status overrides, and standard duels. */
export const EARLY_MATCHES: Match[] = [
  {
    id: 'live-window',
    game: 'lol',
    name: 'G2 Esports vs Fnatic',
    tournament: 'LEC · Spring Playoffs',
    format: 'Bo5',
    startsAt: sampleMinutesFromNow(-45),
    teams: duel(['G2 Esports', 'G2'], ['Fnatic', 'FNC']),
  },
  {
    id: 'live-status',
    game: 'cs2',
    name: 'Natus Vincere vs Vitality',
    tournament: 'BLAST · Open Final',
    format: 'Bo3',
    startsAt: sampleMinutesFromNow(-4 * 60),
    teams: duel(['Natus Vincere', 'NAVI'], ['Vitality', 'VIT']),
    status: 'running',
  },
  {
    id: 'finished-status',
    game: 'valorant',
    name: 'Sentinels vs Cloud9',
    tournament: 'VCT · Americas',
    format: 'Bo3',
    startsAt: sampleMinutesFromNow(-50),
    teams: duel(['Sentinels', 'SEN'], ['Cloud9', 'C9']),
    status: 'finished',
  },
  {
    id: 'soon',
    game: 'dota2',
    name: 'Team Spirit vs Team Liquid',
    tournament: 'ESL One · Group Stage',
    format: 'Bo3',
    startsAt: sampleMinutesFromNow(30),
    teams: duel(['Team Spirit', 'TSpirit'], ['Team Liquid', 'Liquid']),
    status: 'not_started',
  },
  {
    id: 'first-to',
    game: 'ow',
    name: 'Toronto Defiant vs Seoul Dynasty',
    tournament: 'OWCS · Stage 1',
    format: 'Ft3',
    startsAt: sampleKickoff(2, 15),
    teams: duel(['Toronto Defiant', 'TOR'], ['Seoul Dynasty', 'SEO']),
  },
  {
    id: 'players',
    game: 'sc2',
    name: 'Serral vs Maru',
    tournament: 'ESL SC2 · Masters',
    format: 'Bo5',
    startsAt: sampleKickoff(3, 30),
    teams: duel(['Serral', 'Serral'], ['Maru', 'Maru']),
  },
  {
    id: 'upcoming-lol',
    game: 'lol',
    name: 'T1 vs Gen.G',
    tournament: 'LCK · Cup',
    format: 'Bo3',
    startsAt: sampleKickoff(5),
    teams: duel(['T1', 'T1'], ['Gen.G', 'GEN']),
  },
  {
    id: 'upcoming-cs',
    game: 'cs2',
    name: 'FaZe Clan vs MOUZ',
    tournament: 'IEM · Katowice',
    format: 'Bo3',
    startsAt: sampleKickoff(7, 45),
    teams: duel(['FaZe Clan', 'FaZe'], ['MOUZ', 'MOUZ']),
  },
];

/** Exact offset from now — keeps soon/live samples stable across the hour. */
function sampleMinutesFromNow(minutesAhead: number): string {
  return new Date(Date.now() + minutesAhead * 60_000).toISOString();
}
