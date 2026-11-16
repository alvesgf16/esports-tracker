import type { Match, MatchesSnapshot } from '../entities';

export function visibleMatchesFor(
  gameId: string | null,
  matchesSnapshot: MatchesSnapshot
): Match[] {
  const { matches } = matchesSnapshot;

  const byVisibility = (match: Match): boolean =>
    !gameId || match.game === gameId;

  return matches.filter(byVisibility).sort(byKickoffTime);
}

function byKickoffTime(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}
