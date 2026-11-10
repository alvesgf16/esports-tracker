import type { Match, Team } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type {
  DayGroup,
  DaySectionModel,
  MatchCardModel,
  MatchLabels,
  ScheduleClock,
} from '../contracts';
import { groupByDay } from '../use-cases/group-by-day';

type MatchContext = {
  games: GameCatalog;
  now: number;
  labels: MatchLabels;
};

type MatchSides = {
  left: string;
  right: string;
};

export function matchDays(
  matches: Match[],
  games: GameCatalog,
  clock: ScheduleClock
): DaySectionModel[] {
  const context = {
    games,
    now: clock.now,
    labels: clock.labels,
  };

  const toMatchDay = (group: DayGroup): DaySectionModel =>
    matchDay(group, context);

  return groupByDay(matches, clock).map(toMatchDay);
}

function matchDay(group: DayGroup, context: MatchContext): DaySectionModel {
  const { dayKey, label, matches } = group;

  const toMatchCard = (match: Match): MatchCardModel =>
    matchCard(match, context);

  return {
    dayKey,
    label,
    matches: matches.map(toMatchCard),
  };
}

function matchCard(match: Match, context: MatchContext): MatchCardModel {
  const { format, game, id, startsAt, status, tournament } = match;
  const { games, labels, now } = context;

  const displayStatus = matchDisplayStatus(startsAt, now, status);
  const matchGame = games.get(game);
  const isLive = displayStatus === 'live';
  const { left, right } = sidesFor(match);

  return {
    id,
    kickoffLabel: isLive ? 'LIVE' : labels.kickoff(startsAt),
    countdownLabel: isLive ? '' : labels.countdown(startsAt),
    isLive,
    left,
    right,
    meta: `${matchGame.shortName} · ${tournament} · ${format}`,
  };
}

function sidesFor(match: Match): MatchSides {
  const { name, teams } = match;

  return teams.length > 2
    ? {
        left: name,
        right: `${teams.length} teams`,
      }
    : {
        left: nameFor(teams[0]),
        right: nameFor(teams[1]),
      };
}

function nameFor(team?: Team): string {
  return team?.name ?? 'TBD';
}
