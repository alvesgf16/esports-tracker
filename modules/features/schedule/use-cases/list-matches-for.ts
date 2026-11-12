import type { Match } from '@/modules/shared/entities';
import type { MatchCatalog } from '@/modules/shared/gateways';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

import type { ScheduleClock } from '../contracts';

type ScheduleContext = {
  matches: MatchCatalog;
  clock: ScheduleClock;
};

export function listMatchesFor(
  selectedGame: string | null,
  dayKey: string,
  context: ScheduleContext
): Match[] {
  const { matches, clock } = context;
  const snapshot = {
    matches: matches.list(),
    referenceTime: clock.now,
  };
  const isOnDay = (match: Match) =>
    clock.calendar.dayKey(match.startsAt) === dayKey;

  return visibleMatchesFor(selectedGame, snapshot).filter(isOnDay);
}
