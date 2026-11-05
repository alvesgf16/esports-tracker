import type { GameId, Match } from '@/modules/shared/entities';
import { visibleMatches } from '@/modules/shared/use-cases/visible-matches';

export function upcomingCount(
  matches: Match[],
  gameId: GameId,
  now: number
): number {
  return visibleMatches(matches, gameId, now).length;
}
