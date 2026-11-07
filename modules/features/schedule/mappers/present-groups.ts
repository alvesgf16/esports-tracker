import type { Match, Team } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';
import { matchStatus } from '@/modules/shared/use-cases/match-status';

import type {
  DayGroup,
  DaySectionModel,
  MatchCardModel,
  MatchLabels,
  ScheduleClock,
} from '../contracts';
import { groupByDay } from '../use-cases/group-by-day';

type PresentContext = {
  games: GameCatalog;
  now: number;
  labels: MatchLabels;
};

type MatchSides = {
  teamA: string;
  teamB: string;
};

export function presentGroups(
  matches: Match[],
  games: GameCatalog,
  clock: ScheduleClock
): DaySectionModel[] {
  const context = {
    games,
    now: clock.now,
    labels: clock.labels,
  };

  return groupByDay(matches, clock.now, clock.calendar).map((group) =>
    presentDay(group, context)
  );
}

function presentDay(group: DayGroup, context: PresentContext): DaySectionModel {
  return {
    key: group.key,
    label: group.label,
    matches: group.matches.map((match) => presentMatch(match, context)),
  };
}

function presentMatch(match: Match, context: PresentContext): MatchCardModel {
  const status = matchStatus(match.startsAt, context.now, match.progress);
  const game = context.games.get(match.game);
  const isLive = status === 'live';
  const sides = presentSides(match);

  return {
    id: match.id,
    kickoffLabel: isLive ? 'LIVE' : context.labels.kickoff(match.startsAt),
    countdownLabel: isLive ? '' : context.labels.countdown(match.startsAt),
    isLive,
    teamA: sides.teamA,
    teamB: sides.teamB,
    meta: `${game.shortName} · ${match.tournament} · ${match.format}`,
  };
}

function presentSides(match: Match): MatchSides {
  if (match.teams.length > 2) {
    return {
      teamA: match.name,
      teamB: `${match.teams.length} teams`,
    };
  }

  return {
    teamA: teamName(match.teams[0]),
    teamB: teamName(match.teams[1]),
  };
}

function teamName(team?: Team): string {
  return team?.name ?? 'TBD';
}
