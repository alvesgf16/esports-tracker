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
  return isTwoTeamSeries(match) && hasStarted(match, displayStatus);
}

function isTwoTeamSeries(match: Match) {
  return match.teams.length === 2 && Boolean(match.scores?.length);
}

function hasStarted(match: Match, displayStatus: DisplayStatus) {
  return (
    hasProgress(match) ||
    (!isNotStarted(match) && isLiveOrFinished(displayStatus))
  );
}

function hasProgress(match: Match) {
  return (
    Boolean(match.winnerId) || (match.scores?.some(isPositiveScore) ?? false)
  );
}

function isPositiveScore(entry: SeriesScore): boolean {
  return entry.score > 0;
}

function isNotStarted(match: Match) {
  return match.status === 'not_started';
}

function isLiveOrFinished(displayStatus: string) {
  return displayStatus === 'live' || displayStatus === 'finished';
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
