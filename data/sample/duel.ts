import type { Team } from '@/modules/shared/entities';

import { team } from './team';

export function duel(left: [string, string], right: [string, string]): Team[] {
  return [team(left), team(right)];
}
