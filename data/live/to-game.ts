import type { Game } from '@/modules/shared/entities';

import { asOrNull } from './as-or-null';

export function toGame(value: unknown): Game | null {
  const gameRecord = asOrNull.record(value);

  return gameRecord && gameFrom(gameRecord);
}

function gameFrom(gameRecord: Record<string, unknown>): Game | null {
  const id = asOrNull.string(gameRecord.id);
  const name = asOrNull.string(gameRecord.name);
  const shortName = asOrNull.string(gameRecord.shortName);

  return id && name && shortName ? { id, name, shortName } : null;
}
