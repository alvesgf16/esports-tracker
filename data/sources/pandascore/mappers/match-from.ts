import { teamWithOptionalId } from '@/data/mappers/team-with-optional-id';
import type { Match, MatchStatus, Team } from '@/modules/shared/entities';

import type {
  VendorMatch,
  VendorOpponent,
  VendorOpponentBody,
} from '../vendor-types';
import { isSimulatedSport } from './is-simulated-sport';
import { seriesFrom } from './series-from';

const FINISHED = new Set(['finished', 'canceled', 'postponed']);

export function matchFrom(match: VendorMatch): Match | null {
  const slug = gameSlugFrom(match);
  const startsAt = startsAtFrom(match);
  const teams = teamsFrom(match.opponents);

  return slug && startsAt && teams.length >= 2
    ? {
        id: String(match.id),
        game: slug,
        name: nameFrom(match) || matchNameFrom(teams),
        tournament: tournamentFrom(match),
        format: formatFrom(match),
        startsAt,
        teams,
        status: statusFrom(match.status),
        ...seriesFrom(match, teams),
      }
    : null;
}

function gameSlugFrom(match: VendorMatch): string | null {
  const slug = match.videogame?.slug;

  return slug && !isSimulatedSport(slug) ? slug : null;
}

function startsAtFrom(match: VendorMatch): string | null {
  return match.begin_at ?? match.scheduled_at;
}

function teamsFrom(opponents: VendorOpponent[]): Team[] {
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

  return teamWithOptionalId({ id, name, shortName });
}

function nameFrom(match: VendorMatch): string | undefined {
  return match.name?.trim();
}

function matchNameFrom(teams: Team[]): string {
  return teams.length === 2
    ? `${teams[0].name} vs ${teams[1].name}`
    : `${teams.length} teams`;
}

// eslint-disable-next-line complexity -- league/stage cases stay flat
function tournamentFrom(match: VendorMatch): string {
  const league = match.league?.name?.trim() ?? '';
  const stage = match.tournament?.name?.trim() ?? '';

  if (!league) {
    return stage || 'Tournament';
  }

  if (!stage || league.includes(stage)) {
    return league;
  }

  return `${league} · ${stage}`;
}

// eslint-disable-next-line complexity -- vendor match_type branches stay flat
function formatFrom(match: VendorMatch): string {
  const games = match.number_of_games;
  const type = match.match_type;

  if (type === 'best_of' && games) {
    return `Bo${games}`;
  }

  if (type === 'first_to' && games) {
    return `Ft${games}`;
  }

  if (type === 'all_games_played') {
    return 'Maps';
  }

  return type?.replaceAll('_', ' ') || 'Match';
}

function statusFrom(status: string): MatchStatus | undefined {
  if (status === 'running') {
    return 'running';
  }

  if (status === 'not_started') {
    return 'not_started';
  }

  if (FINISHED.has(status)) {
    return 'finished';
  }

  return undefined;
}
