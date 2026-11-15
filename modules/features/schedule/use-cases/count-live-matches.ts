import type { Match } from '@/modules/shared/entities';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

export function countLiveMatches(
  matches: Match[],
  referenceTime: number
): number {
  const isLive = (match: Match) =>
    matchDisplayStatus(match.startsAt, referenceTime, match.status) === 'live';

  return matches.filter(isLive).length;
}
