import type { GameId, MatchesSnapshot } from '@/modules/shared/entities';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

export function countUpcomingMatchesFor(
  gameId: GameId,
  matchesSnapshot: MatchesSnapshot
): number {
  const upcomingMatches = visibleMatchesFor(gameId, matchesSnapshot);

  return upcomingMatches.length;
}
