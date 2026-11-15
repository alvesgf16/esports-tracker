import type { Team } from '@/modules/shared/entities';

import { team } from './team';
import type { TeamFields } from './team-fields';

export function duel(left: TeamFields, right: TeamFields): Team[] {
  return [team(left), team(right)];
}
