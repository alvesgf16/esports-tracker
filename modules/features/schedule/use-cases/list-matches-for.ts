import type { Match } from '@/modules/shared/entities';
import type { MatchCatalog } from '@/modules/shared/gateways';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

import type { ScheduleClock, StatusFilter } from '../contracts';

type ScheduleContext = {
  matches: MatchCatalog;
  clock: ScheduleClock;
  statusFilter?: StatusFilter;
};

type ActiveStatusFilter = 'live' | 'upcoming';

export function listMatchesFor(
  selectedGame: string | null,
  dayKey: string,
  context: ScheduleContext
): Match[] {
  const { matches, clock, statusFilter = 'all' } = context;
  const snapshot = {
    matches: matches.list(),
    referenceTime: clock.now,
  };
  const isOnDay = (match: Match) =>
    clock.calendar.dayKey(match.startsAt) === dayKey;
  const onDay = visibleMatchesFor(selectedGame, snapshot).filter(isOnDay);

  return filterMatchesByStatus(onDay, statusFilter, clock.now);
}

function filterMatchesByStatus(
  matches: Match[],
  statusFilter: StatusFilter,
  referenceTime: number
): Match[] {
  if (statusFilter === 'all') {
    return matches;
  }

  const hasMatchingStatus = (match: Match) =>
    hasSelectedStatus(match, statusFilter, referenceTime);

  return matches.filter(hasMatchingStatus);
}

function hasSelectedStatus(
  match: Match,
  statusFilter: ActiveStatusFilter,
  referenceTime: number
): boolean {
  const displayStatus = matchDisplayStatus(
    match.startsAt,
    referenceTime,
    match.status
  );

  return statusFilter === 'live'
    ? displayStatus === 'live'
    : displayStatus === 'soon' || displayStatus === 'upcoming';
}
