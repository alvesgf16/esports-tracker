import type { Team } from '@/modules/shared/entities';

import type { SideEmphasis } from '../contracts';

export function sideEmphasis(
  team: Team | undefined,
  winnerId: string | undefined
): SideEmphasis {
  if (!winnerId || !team?.id) {
    return 'undecided';
  }

  if (team.id === winnerId) {
    return 'winner';
  }

  return 'loser';
}
