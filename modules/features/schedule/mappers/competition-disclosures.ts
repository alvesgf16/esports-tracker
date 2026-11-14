import type { Match } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';

import type { CompetitionDisclosureModel, ScheduleClock } from '../contracts';
import type { CompetitionGroup } from '../entities';
import { groupByCompetition } from '../use-cases/group-by-competition';
import { matchRow } from './match-row';

export function competitionDisclosures(
  matches: Match[],
  games: GameCatalog,
  clock: ScheduleClock
): CompetitionDisclosureModel[] {
  const toDisclosure = (group: CompetitionGroup) =>
    competitionDisclosure(group, games, clock);

  return groupByCompetition(matches).map(toDisclosure);
}

function competitionDisclosure(
  group: CompetitionGroup,
  games: GameCatalog,
  clock: ScheduleClock
): CompetitionDisclosureModel {
  const { id, game, tournament, matches } = group;
  const toMatchRow = (match: Match) =>
    matchRow(match, { referenceTime: clock.now, labels: clock.labels });

  return {
    id,
    label: `${tournament} · ${games.get(game).shortName}`,
    matches: matches.map(toMatchRow),
  };
}
