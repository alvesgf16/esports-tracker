import type { Match } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';

import type {
  CompetitionDisclosureModel,
  LogoFilter,
  ScheduleClock,
} from '../contracts';
import type { CompetitionGroup } from '../entities';
import { groupByCompetition } from '../use-cases/group-by-competition';
import { competitionLogo } from './competition-logo';
import { matchRow } from './match-row';

type DisclosureExpansion = {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
};

type CompetitionDisclosuresInput = {
  matches: Match[];
  games: GameCatalog;
  clock: ScheduleClock;
  logos: LogoFilter;
  expansion: DisclosureExpansion;
};

type DisclosureContext = {
  games: GameCatalog;
  clock: ScheduleClock;
  logos: LogoFilter;
  expansion: DisclosureExpansion;
};

export function competitionDisclosures(
  input: CompetitionDisclosuresInput
): CompetitionDisclosureModel[] {
  const { matches, games, clock, logos, expansion } = input;
  const context = { games, clock, logos, expansion };
  const toDisclosure = (group: CompetitionGroup) =>
    competitionDisclosure(group, context);

  return groupByCompetition(matches).map(toDisclosure);
}

function competitionDisclosure(
  group: CompetitionGroup,
  context: DisclosureContext
): CompetitionDisclosureModel {
  const { id, game, competition, matches } = group;
  const { games, clock, logos, expansion } = context;

  return {
    id,
    label: `${competition.title} · ${games.get(game).shortName}`,
    ...competitionLogo(competition.imageUrl, logos),
    expanded: expansion.isExpanded(id),
    onToggle: () => expansion.toggle(id),
    matches: matchRowsFor(matches, clock, logos),
  };
}

function matchRowsFor(
  matches: Match[],
  clock: ScheduleClock,
  logos: LogoFilter
) {
  return matches.map((match) =>
    matchRow(match, {
      referenceTime: clock.now,
      labels: clock.labels,
      logos,
    })
  );
}
