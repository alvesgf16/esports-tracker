import type { Team } from '@/modules/shared/entities';

export function team([name, shortName]: [string, string]): Team {
  return { name, shortName };
}
