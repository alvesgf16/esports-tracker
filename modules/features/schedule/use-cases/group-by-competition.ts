import type { Match } from '@/modules/shared/entities';

import type { CompetitionGroup } from '../entities';

type CompetitionEntry = readonly [string, Match[]];

export function groupByCompetition(matches: Match[]): CompetitionGroup[] {
  const matchesByCompetition = Map.groupBy(matches, competitionKey);

  return Array.from(matchesByCompetition, toCompetitionGroup);
}

function competitionKey(match: Match): string {
  return JSON.stringify([match.game, match.tournament]);
}

function toCompetitionGroup([id, matches]: CompetitionEntry): CompetitionGroup {
  const [{ game, tournament }] = matches;

  return { id, game, tournament, matches };
}
