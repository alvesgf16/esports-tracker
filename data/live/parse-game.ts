import type { Game } from '@/modules/shared/entities';

import { jsonValue } from './json-value';

export function parseGame(value: unknown): Game | null {
  const record = jsonValue.record(value);

  if (!record) {
    return null;
  }

  return gameFromRecord(record);
}

function gameFromRecord(record: Record<string, unknown>): Game | null {
  const id = jsonValue.string(record.id);
  const name = jsonValue.string(record.name);
  const shortName = jsonValue.string(record.shortName);

  if (!id || !name || !shortName) {
    return null;
  }

  return { id, name, shortName };
}
