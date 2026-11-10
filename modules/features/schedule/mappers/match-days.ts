import type { Match } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';

import type {
  DayGroup,
  DaySectionModel,
  MatchLabels,
  MatchRowModel,
  ScheduleClock,
} from '../contracts';
import { groupByDay } from '../use-cases/group-by-day';
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

  const toMatchDay = (group: DayGroup): DaySectionModel =>
    matchDay(group, context);

  return groupByDay(matches, clock).map(toMatchDay);
}

function matchDay(group: DayGroup, context: MatchContext): DaySectionModel {
  const { dayKey, label, matches } = group;

  const toMatchRow = (match: Match): MatchRowModel => matchRow(match, context);

  return {
    dayKey,
    label,
    matches: matches.map(toMatchRow),
  };
}
