import { asOrNull } from '@/data/mappers/as-or-null';
import { parseAll } from '@/data/mappers/parse-all';
import { parseOptional } from '@/data/mappers/parse-optional';
import { teamWithOptionalId } from '@/data/mappers/team-with-optional-id';
import type { Match, Team } from '@/modules/shared/entities';

import { matchOptionalsFrom } from './match-optionals-from';

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
  const tournament = asOrNull.string(record.tournament);
  const format = asOrNull.string(record.format);
  const startsAt = asOrNull.string(record.startsAt);

  return tournament && format && startsAt
    ? { tournament, format, startsAt }
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

  return name && shortName && id !== null
    ? teamWithOptionalId({ id, name, shortName })
    : null;
}
