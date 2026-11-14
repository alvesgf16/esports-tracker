import { asOrNull } from '@/data/mappers/as-or-null';
import { teamWithOptionals } from '@/data/mappers/team-with-optionals';
import type { Team } from '@/modules/shared/entities';

import type { VendorOpponent, VendorOpponentBody } from '../vendor-types';

export function teamsFrom(opponents: VendorOpponent[]): Team[] {
  return opponents.flatMap(toTeam);
}

function toTeam(entry: VendorOpponent): Team[] {
  const { opponent } = entry;
  const name = opponent?.name?.trim();

  return opponent && name ? [teamFrom(opponent, name)] : [];
}

function teamFrom(opponent: VendorOpponentBody, name: string): Team {
  const id = opponent.id ? String(opponent.id) : undefined;
  const shortName = opponent.acronym?.trim() || name;
  const imageUrl = asOrNull.string(opponent.image_url) ?? undefined;

  return teamWithOptionals({ id, name, shortName, imageUrl });
}
