import type { Match, Team } from '@/modules/shared/entities';

import { formatLabel } from './format-label';
import { isSimulatedSport } from './is-simulated-sport';
import { mapStatus } from './map-status';
import { mapTeams } from './map-teams';
import { tournamentLabel } from './tournament-label';
import type { VendorMatch } from './vendor-types';

type MatchParts = {
  vendor: VendorMatch;
  slug: string;
  startsAt: string;
  teams: Team[];
};

export function mapMatch(vendor: VendorMatch): Match | null {
  const parts = matchParts(vendor);

  if (!parts) {
    return null;
  }

  return buildMatch(parts);
}

function matchParts(vendor: VendorMatch): MatchParts | null {
  const slug = gameSlug(vendor);

  if (!slug) {
    return null;
  }

  return timedTeams(vendor, slug);
}

function gameSlug(vendor: VendorMatch): string | null {
  const slug = vendor.videogame?.slug;

  if (!slug || isSimulatedSport(slug)) {
    return null;
  }

  return slug;
}

function timedTeams(vendor: VendorMatch, slug: string): MatchParts | null {
  const startsAt = vendor.begin_at ?? vendor.scheduled_at;
  const teams = mapTeams(vendor.opponents);

  if (!startsAt || teams.length < 2) {
    return null;
  }

  return { vendor, slug, startsAt, teams };
}

function buildMatch(parts: MatchParts): Match {
  return {
    id: String(parts.vendor.id),
    game: parts.slug,
    name: parts.vendor.name?.trim() || fallbackMatchName(parts.teams),
    tournament: tournamentLabel(parts.vendor),
    format: formatLabel(parts.vendor),
    startsAt: parts.startsAt,
    teams: parts.teams,
    status: mapStatus(parts.vendor.status),
  };
}

function fallbackMatchName(teams: Team[]): string {
  if (teams.length === 2) {
    return `${teams[0].name} vs ${teams[1].name}`;
  }

  return `${teams.length} teams`;
}
