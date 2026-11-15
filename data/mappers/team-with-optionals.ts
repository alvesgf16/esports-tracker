import type { Team } from '@/modules/shared/entities';

export function teamWithOptionals({
  id,
  imageUrl,
  name,
  shortName,
}: Team): Team {
  return {
    name,
    shortName,
    ...(id ? { id } : {}),
    ...(imageUrl ? { imageUrl } : {}),
  };
}
