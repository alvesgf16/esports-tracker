import type { Team } from '@/modules/shared/entities';

import type { VendorOpponent } from './vendor-types';

export function mapTeams(opponents: VendorOpponent[]): Team[] {
  return opponents.flatMap(teamFromOpponent);
}

function teamFromOpponent(entry: VendorOpponent): Team[] {
  const name = entry.opponent?.name?.trim();

  if (!name) {
    return [];
  }

  return [namedTeam(name, entry.opponent?.acronym)];
}

function namedTeam(name: string, acronym: string | null | undefined): Team {
  const shortName = acronym?.trim() || name;

  return { name, shortName };
}

export function fallbackMatchName(teams: Team[]): string {
  if (teams.length === 2) {
    return `${teams[0].name} vs ${teams[1].name}`;
  }

  return `${teams.length} teams`;
}
