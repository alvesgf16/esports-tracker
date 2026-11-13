import type { Match } from '@/modules/shared/entities';

import type { DayGroup, DaySectionModel, ScheduleClock } from '../contracts';
import { groupByDay } from '../use-cases/group-by-day';
import { dayLabel } from './day-label';
import { matchRow } from './match-row';

export function matchDays(
  matches: Match[],
  clock: ScheduleClock
): DaySectionModel[] {
  const toMatchDay = (group: DayGroup) => matchDay(group, clock);

  return groupByDay(matches, clock).map(toMatchDay);
}

function matchDay(group: DayGroup, clock: ScheduleClock): DaySectionModel {
  const { dayKey, matches } = group;
  const toMatchRow = (match: Match) =>
    matchRow(match, { referenceTime: clock.now, labels: clock.labels });

  return {
    dayKey,
    label: dayLabel(dayKey, clock),
    matches: matches.map(toMatchRow),
  };
}
