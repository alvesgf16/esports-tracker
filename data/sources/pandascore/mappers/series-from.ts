import { asOrNull } from '@/data/mappers/as-or-null';
import { hasTeamId } from '@/data/mappers/has-team-id';
import type { SeriesScore, Team } from '@/modules/shared/entities';

import type { VendorMatch, VendorResult } from '../vendor-types';

type SeriesFields = {
  scores?: SeriesScore[];
  winnerId?: string;
};

export function seriesFrom(match: VendorMatch, teams: Team[]): SeriesFields {
  return {
    ...scoreFields(match.results, teams),
    ...winnerFields(match.winner_id, teams),
  };
}

function scoreFields(
  results: VendorResult[] | null | undefined,
  teams: Team[]
): SeriesFields {
  const toScore = (team: Team) => scoreFor(team, results ?? []);
  const scores = teams.flatMap(toScore);

  return scores.length > 0 ? { scores } : {};
}

function scoreFor(team: Team, results: VendorResult[]): SeriesScore[] {
  const teamId = team.id;

  if (!teamId) {
    return [];
  }

  const forTeam = (entry: VendorResult) => opponentIdFrom(entry) === teamId;
  const result = results.find(forTeam);

  return mappedScore(teamId, result);
}

function opponentIdFrom(result: VendorResult): string | null {
  const id = result.team_id ?? result.player_id;

  return id ? String(id) : null;
}

function mappedScore(
  teamId: string,
  result: VendorResult | undefined
): SeriesScore[] {
  const score = result && asOrNull.number(result.score);

  return score == null ? [] : [{ teamId, score }];
}

function winnerFields(
  winnerId: number | null | undefined,
  teams: Team[]
): SeriesFields {
  const id = winnerId ? String(winnerId) : undefined;

  return hasTeamId(id, teams) ? { winnerId: id } : {};
}
