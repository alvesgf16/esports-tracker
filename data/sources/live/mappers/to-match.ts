import { asOrNull } from '@/data/mappers/as-or-null';
import { parseAll } from '@/data/mappers/parse-all';
import { parseOptional } from '@/data/mappers/parse-optional';
import { teamWithOptionals } from '@/data/mappers/team-with-optionals';
import type { Competition, Match, Team } from '@/modules/shared/entities';

import { matchOptionalsFrom } from './match-optionals-from';
import { toCompetition } from './to-competition';

type MatchCore = {
  id: string;
  game: string;
  name: string;
  competition: Competition;
  format: string;
  startsAt: string;
};

type MatchMeta = {
  competition: Competition;
  format: string;
  startsAt: string;
};

export function toMatch(value: unknown): Match | null {
  const record = asOrNull.record(value);

  return record && matchFrom(record);
}

function matchFrom(record: Record<string, unknown>): Match | null {
  const core = matchCoreFrom(record);
  const teams = parseAll(record.teams, toTeam);
  const optionals = teams && matchOptionalsFrom(record, teams);

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
  const competition = toCompetition(record.competition);
  const format = asOrNull.string(record.format);
  const startsAt = asOrNull.string(record.startsAt);

  return competition && format && startsAt
    ? { competition, format, startsAt }
    : null;
}

function toTeam(value: unknown): Team | null {
  const record = asOrNull.record(value);

  return record && teamFrom(record);
}

function teamFrom(record: Record<string, unknown>): Team | null {
  const name = asOrNull.string(record.name);
  const shortName = asOrNull.string(record.shortName);
  const id = parseOptional(record.id, asOrNull.string);
  const imageUrl = parseOptional(record.imageUrl, asOrNull.string);

  return name && shortName && id !== null && imageUrl !== null
    ? teamWithOptionals({ id, name, shortName, imageUrl })
    : null;
}
