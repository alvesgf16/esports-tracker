import { MATCHES } from '@/data/matches';
import type { GameFilter, Match } from '@/data/types';

import { matchStatus } from './match-status';

export function visibleMatches(game: GameFilter, now = Date.now()): Match[] {
  return MATCHES.filter((match) => isVisibleMatch(match, game, now)).sort(
    byKickoff
  );
}

function isVisibleMatch(match: Match, game: GameFilter, now: number): boolean {
  if (game !== 'all' && match.game !== game) {
    return false;
  }

  return matchStatus(match.startsAt, now) !== 'finished';
}

function byKickoff(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}
