import type { GameId, Match } from '../entities';
import { matchDisplayStatus } from './match-display-status';

export function visibleMatches(
  matches: Match[],
  game: GameId | null,
  now: number
): Match[] {
  return matches
    .filter((match) => isVisibleMatch(match, game, now))
    .sort(byKickoff);
}

function isVisibleMatch(
  match: Match,
  game: GameId | null,
  now: number
): boolean {
  if (game && match.game !== game) {
    return false;
  }

  return matchDisplayStatus(match.startsAt, now, match.status) !== 'finished';
}

function byKickoff(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}
