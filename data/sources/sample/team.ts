import type { Team } from '@/modules/shared/entities';

export function team([name, shortName, id]: [string, string, string]): Team {
  return { id, name, shortName };
}
