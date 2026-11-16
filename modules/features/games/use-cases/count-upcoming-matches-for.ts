import type { Match, MatchesSnapshot } from '@/modules/shared/entities';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

export function countUpcomingMatchesFor(
  gameId: string,
  matchesSnapshot: MatchesSnapshot
): number {
  const isNotFinished = (match: Match): boolean =>
    matchDisplayStatus(
      match.startsAt,
      matchesSnapshot.referenceTime,
      match.status
    ) !== 'finished';

  return visibleMatchesFor(gameId, matchesSnapshot).filter(isNotFinished)
    .length;
}
