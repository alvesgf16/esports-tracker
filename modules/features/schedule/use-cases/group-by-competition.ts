import type { Competition, Match } from '@/modules/shared/entities';

import type { CompetitionGroup } from '../entities';

type CompetitionEntry = readonly [string, Match[]];

export function groupByCompetition(matches: Match[]): CompetitionGroup[] {
  const matchesByCompetition = Map.groupBy(matches, competitionKey);

  return Array.from(matchesByCompetition, toCompetitionGroup);
}

function competitionKey(match: Match): string {
  return JSON.stringify([match.game, match.competition.title]);
}

function toCompetitionGroup([id, matches]: CompetitionEntry): CompetitionGroup {
  const [{ game }] = matches;
  const competition = competitionFrom(matches);

  return { id, game, competition, matches };
}

function competitionFrom(matches: Match[]): Competition {
  const { title } = matches[0].competition;
  const { imageUrl } = matches.find(hasCompetitionImage)?.competition ?? {};

  return imageUrl ? { title, imageUrl } : { title };
}

function hasCompetitionImage(match: Match): boolean {
  return Boolean(match.competition.imageUrl);
}
