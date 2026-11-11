import { asOrNull } from '@/data/mappers/as-or-null';
import { parseAll } from '@/data/mappers/parse-all';
import { parseOptional } from '@/data/mappers/parse-optional';
import type {
  Match,
  MatchStatus,
  SeriesScore,
  Team,
} from '@/modules/shared/entities';

type MatchCore = {
  id: string;
  game: string;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
};

type MatchMeta = {
  tournament: string;
  format: string;
  startsAt: string;
};

type MatchOptionals = {
  status?: MatchStatus;
  scores?: SeriesScore[];
  winnerId?: string;
};

const MATCH_STATUSES = new Set<unknown>(['not_started', 'running', 'finished']);

export function toMatch(value: unknown): Match | null {
  const record = asOrNull.record(value);

  return record && matchFrom(record);
}

function matchFrom(record: Record<string, unknown>): Match | null {
  const core = matchCoreFrom(record);
  const teams = parseAll(record.teams, toTeam);
  const optionals = matchOptionalsFrom(record);

  return core && teams && optionals ? { ...core, teams, ...optionals } : null;
}

function matchCoreFrom(record: Record<string, unknown>): MatchCore | null {
  const id = asOrNull.string(record.id);
  const game = asOrNull.string(record.game);
  const name = asOrNull.string(record.name);
  const meta = matchMetaFrom(record);

  return id && game && name && meta ? { id, game, name, ...meta } : null;
}

function matchMetaFrom(record: Record<string, unknown>): MatchMeta | null {
  const tournament = asOrNull.string(record.tournament);
  const format = asOrNull.string(record.format);
  const startsAt = asOrNull.string(record.startsAt);

  return tournament && format && startsAt
    ? { tournament, format, startsAt }
    : null;
}

function matchOptionalsFrom(
  record: Record<string, unknown>
): MatchOptionals | null {
  const status = parseOptional(record.status, toMatchStatus);
  const scores = parseOptional(record.scores, toScores);
  const winnerId = parseOptional(record.winnerId, asOrNull.string);

  return status === null || scores === null || winnerId === null
    ? null
    : optionalMatchFields(status, scores, winnerId);
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

function toTeam(value: unknown): Team | null {
  const record = asOrNull.record(value);

  return record && teamFrom(record);
}

function teamFrom(record: Record<string, unknown>): Team | null {
  const name = asOrNull.string(record.name);
  const shortName = asOrNull.string(record.shortName);
  const id = parseOptional(record.id, asOrNull.string);

  if (!name || !shortName || id === null) {
    return null;
  }

  return id ? { id, name, shortName } : { name, shortName };
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

function toMatchStatus(value: unknown): MatchStatus | null {
  return MATCH_STATUSES.has(value) ? (value as MatchStatus) : null;
}
