import type { MatchesSnapshot } from '@/modules/shared/entities';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

export function countUpcomingMatchesFor(
  gameId: string,
  matchesSnapshot: MatchesSnapshot
): number {
  const upcomingMatches = visibleMatchesFor(gameId, matchesSnapshot);

  return upcomingMatches.length;
}
