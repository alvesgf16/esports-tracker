import type { Team } from '@/modules/shared/entities';

export function hasTeamId(id: string | undefined, teams: Team[]) {
  const hasId = (team: Team) => team.id === id;

  return Boolean(id) && teams.some(hasId);
}
