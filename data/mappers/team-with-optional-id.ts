import type { Team } from '@/modules/shared/entities';

export function teamWithOptionalId({ id, name, shortName }: Team): Team {
  return id ? { id, name, shortName } : { name, shortName };
}
