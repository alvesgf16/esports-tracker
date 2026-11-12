import type { Match, SeriesScore, Team } from '@/modules/shared/entities';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type { MatchSideModel, SideEmphasis } from '../contracts';

type MatchSides = {
  left: MatchSideModel;
  right: MatchSideModel;
};

type DisplayStatus = 'live' | 'soon' | 'upcoming' | 'finished';

export function sidesFor(match: Match, now: number): MatchSides {
  const { name, startsAt, status, teams } = match;
  const displayStatus = matchDisplayStatus(startsAt, now, status);

  return teams.length > 2
    ? lobbySides(name, teams.length)
    : duelSides(match, displayStatus);
}

function lobbySides(name: string, teamCount: number): MatchSides {
  return {
    left: plainSide(name),
    right: plainSide(`${teamCount} teams`),
  };
}

function plainSide(text: string): MatchSideModel {
  return { name: text, score: null, emphasis: 'undecided' };
}

function duelSides(match: Match, displayStatus: DisplayStatus): MatchSides {
  const { teams } = match;

  return {
    left: sideFor(teams[0], match, displayStatus),
    right: sideFor(teams[1], match, displayStatus),
  };
}

function sideFor(
  team: Team | undefined,
  match: Match,
  displayStatus: DisplayStatus
): MatchSideModel {
  return {
    name: team?.name ?? 'TBD',
    score: scoreLabel(team, match, displayStatus),
    emphasis: emphasisFor(team, match.winnerId),
  };
}

function scoreLabel(
  team: Team | undefined,
  match: Match,
  displayStatus: DisplayStatus
): string | null {
  return shouldShowScore(match, displayStatus)
    ? mappedScore(team, match.scores)
    : null;
}

function shouldShowScore(match: Match, displayStatus: DisplayStatus): boolean {
  return (
    hasTwoTeams(match) && hasStarted(match, displayStatus) && hasScores(match)
  );
}

function hasTwoTeams(match: Match) {
  return match.teams.length === 2;
}

function hasStarted(match: Match, displayStatus: DisplayStatus) {
  return (
    isLiveOrFinished(displayStatus) ||
    Boolean(match.winnerId) ||
    (match.scores?.some(isPositiveScore) ?? false)
  );
}

function isPositiveScore(entry: SeriesScore): boolean {
  return entry.score > 0;
}

function isLiveOrFinished(displayStatus: string) {
  return displayStatus === 'live' || displayStatus === 'finished';
}

function hasScores(match: Match): boolean {
  return Boolean(match.scores?.length);
}

function mappedScore(
  team: Team | undefined,
  scores: SeriesScore[] | undefined
): string | null {
  const teamId = team?.id;
  const forTeam = (entry: SeriesScore) => entry.teamId === teamId;
  const entry = teamId ? scores?.find(forTeam) : undefined;

  return entry ? String(entry.score) : null;
}

function emphasisFor(
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
