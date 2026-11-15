import type { Match, Team } from '@/modules/shared/entities';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type { LogoFilter, MatchSideModel } from '../contracts';
import { sideEmphasis } from './side-emphasis';
import { sideLogo } from './side-logo';
import { sideScore } from './side-score';

type MatchSides = {
  left: MatchSideModel;
  right: MatchSideModel;
};

type DisplayStatus = 'live' | 'soon' | 'upcoming' | 'finished';

export function sidesFor(
  match: Match,
  referenceTime: number,
  logos: LogoFilter
): MatchSides {
  const { name, startsAt, status, teams } = match;
  const displayStatus = matchDisplayStatus(startsAt, referenceTime, status);

  return teams.length > 2
    ? lobbySides(name, teams.length)
    : duelSides(match, displayStatus, logos);
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

function duelSides(
  match: Match,
  displayStatus: DisplayStatus,
  logos: LogoFilter
): MatchSides {
  const { teams } = match;

  return {
    left: sideFor({ team: teams[0], match, displayStatus, logos }),
    right: sideFor({ team: teams[1], match, displayStatus, logos }),
  };
}

type SideInput = {
  team: Team | undefined;
  match: Match;
  displayStatus: DisplayStatus;
  logos: LogoFilter;
};

function sideFor({
  team,
  match,
  displayStatus,
  logos,
}: SideInput): MatchSideModel {
  return {
    name: team?.name ?? 'TBD',
    score: sideScore(team, match, displayStatus),
    emphasis: sideEmphasis(team, match.winnerId),
    ...sideLogo(team?.imageUrl, logos),
  };
}
