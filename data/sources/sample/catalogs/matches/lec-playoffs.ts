import type { Match } from '@/modules/shared/entities';

import { competition } from '../../competition';
import { duel } from '../../duel';
import { sampleKickoff } from '../../sample-kickoff';
import { sampleMarks } from '../../sample-marks';
import { seriesScores } from '../../series-scores';

export const LEC_PLAYOFFS: Match[] = [
  {
    id: 'live-window',
    game: 'lol',
    name: 'G2 Esports vs Fnatic',
    competition: competition('LEC · Spring Playoffs', sampleMarks.lec),
    format: 'Bo5',
    startsAt: sampleKickoff.minutesFromNow(-45),
    teams: duel(
      ['G2 Esports', 'G2', 'g2', sampleMarks.g2],
      ['Fnatic', 'FNC', 'fnc', sampleMarks.fnc]
    ),
    scores: seriesScores(['g2', 1], ['fnc', 1]),
  },
  {
    id: 'lec-playoffs-2',
    game: 'lol',
    name: 'MAD Lions vs KOI',
    competition: competition('LEC · Spring Playoffs'),
    format: 'Bo5',
    startsAt: sampleKickoff.onTheHour(4),
    teams: duel(['MAD Lions', 'MAD', 'mad'], ['KOI', 'KOI', 'koi']),
  },
];
