import type { Match } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';

import type {
  DayGroup,
  DaySectionModel,
  MatchLabels,
  ScheduleClock,
} from '../contracts';
import { groupByDay } from '../use-cases/group-by-day';
import { dayLabel } from './day-label';
import { matchRow } from './match-row';

type MatchContext = {
  games: GameCatalog;
  now: number;
  labels: MatchLabels;
};

export function matchDays(
  matches: Match[],
  games: GameCatalog,
  clock: ScheduleClock
): DaySectionModel[] {
  const context = {
    games,
    now: clock.now,
    labels: clock.labels,
  };

  const toMatchDay = (group: DayGroup) => matchDay(group, clock, context);

  return groupByDay(matches, clock).map(toMatchDay);
}

function matchDay(
  group: DayGroup,
  clock: ScheduleClock,
  context: MatchContext
): DaySectionModel {
  const { dayKey, matches } = group;
  const toMatchRow = (match: Match) => matchRow(match, context);

  return {
    dayKey,
    label: dayLabel(dayKey, clock),
    matches: matches.map(toMatchRow),
  };
}
