import type { Match } from '@/modules/schedule/entities';
import { visibleMatches } from '@/modules/schedule/use-cases/visible-matches';

import type { GameId } from '../entities';

export function upcomingCount(
  matches: Match[],
  gameId: GameId,
  now: number
): number {
  return visibleMatches(matches, gameId, now).length;
}
