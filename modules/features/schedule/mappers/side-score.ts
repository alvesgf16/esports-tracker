import type { Match, SeriesScore, Team } from '@/modules/shared/entities';

type DisplayStatus = 'live' | 'soon' | 'upcoming' | 'finished';

export function sideScore(
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
