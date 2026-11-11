import { asOrNull } from '@/data/mappers/as-or-null';
import { hasTeamId } from '@/data/mappers/has-team-id';
import { parseAll } from '@/data/mappers/parse-all';
import { parseOptional } from '@/data/mappers/parse-optional';
import type { MatchStatus, SeriesScore, Team } from '@/modules/shared/entities';

type MatchOptionals = {
  status?: MatchStatus;
  scores?: SeriesScore[];
  winnerId?: string;
};

const MATCH_STATUSES = new Set<unknown>(['not_started', 'running', 'finished']);

export function matchOptionalsFrom(
  record: Record<string, unknown>,
  teams: Team[]
): MatchOptionals | null {
  const status = parseOptional(record.status, toMatchStatus);
  const scores = parseOptional(record.scores, toScores);
  const winnerId = parseOptional(record.winnerId, asOrNull.string);

  return status === null || scores === null || winnerId === null
    ? null
    : optionalMatchFields(
        status,
        scoresForMatchTeams(scores, teams),
        hasTeamId(winnerId, teams) ? winnerId : undefined
      );
}

function optionalMatchFields(
  status: MatchStatus | undefined,
  scores: SeriesScore[] | undefined,
  winnerId: string | undefined
): MatchOptionals {
  return {
    ...(status ? { status } : {}),
    ...(scores && scores.length > 0 ? { scores } : {}),
    ...(winnerId ? { winnerId } : {}),
  };
}

function scoresForMatchTeams(
  scores: SeriesScore[] | undefined,
  teams: Team[]
): SeriesScore[] | undefined {
  const isForMatchTeams = (score: SeriesScore) =>
    hasTeamId(score.teamId, teams);

  return scores?.filter(isForMatchTeams);
}

function toMatchStatus(value: unknown): MatchStatus | null {
  return MATCH_STATUSES.has(value) ? (value as MatchStatus) : null;
}

function toScores(value: unknown): SeriesScore[] | null {
  return parseAll(value, toSeriesScore);
}

function toSeriesScore(value: unknown): SeriesScore | null {
  const record = asOrNull.record(value);
  const teamId = record && asOrNull.string(record.teamId);
  const score = record && asOrNull.number(record.score);

  return teamId && score !== null ? { teamId, score } : null;
}
