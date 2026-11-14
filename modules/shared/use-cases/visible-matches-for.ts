import type { Match, MatchesSnapshot } from '../entities';
import { matchDisplayStatus } from './match-display-status';

export function visibleMatchesFor(
  gameId: string | null,
  matchesSnapshot: MatchesSnapshot
): Match[] {
  const { matches, referenceTime } = matchesSnapshot;

  const byVisibility = (match: Match): boolean =>
    isVisibleMatch(match, gameId, referenceTime);

  return matches.filter(byVisibility).sort(byKickoffTime);
}

function isVisibleMatch(
  match: Match,
  gameId: string | null,
  referenceTime: number
): boolean {
  const isFromSelectedGame = !gameId || match.game === gameId;
  const isFinished =
    matchDisplayStatus(match.startsAt, referenceTime, match.status) ===
    'finished';

  return isFromSelectedGame && !isFinished;
}

function byKickoffTime(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}
