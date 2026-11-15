import { allowedUrlFrom } from '@/data/mappers/allowed-url-from';
import { teamWithOptionals } from '@/data/mappers/team-with-optionals';
import type { Team } from '@/modules/shared/entities';

import type { TeamFields } from './team-fields';

export function team([name, shortName, id, imageUrl]: TeamFields): Team {
  return teamWithOptionals({
    id,
    name,
    shortName,
    imageUrl: allowedUrlFrom(imageUrl),
  });
}
