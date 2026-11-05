import { formatCountdown, formatKickoff } from '@/lib/format-time';
import type { ScheduleBoardState } from '@/lib/schedule-board';
import type { Match, Team } from '@/modules/shared/entities';
import { matchStatus } from '@/modules/shared/use-cases/match-status';

import type { DaySectionModel, MatchCardModel } from '../contracts';

type PresentContext = {
  board: ScheduleBoardState;
  now: number;
  timeZone: string;
};

export function presentDay(
  group: { key: string; label: string; matches: Match[] },
  context: PresentContext
): DaySectionModel {
  return {
    key: group.key,
    label: group.label,
    matches: group.matches.map((match) => presentMatch(match, context)),
  };
}

function presentMatch(match: Match, context: PresentContext): MatchCardModel {
  const status = matchStatus(match.startsAt, context.now, match.progress);
  const game = context.board.games.get(match.game);
  const isLive = status === 'live';
  const sides = presentSides(match);

  return {
    id: match.id,
    kickoffLabel: isLive
      ? 'LIVE'
      : formatKickoff(match.startsAt, context.timeZone),
    countdownLabel: isLive ? '' : formatCountdown(match.startsAt, context.now),
    isLive,
    teamA: sides.teamA,
    teamB: sides.teamB,
    meta: `${game.shortName} · ${match.tournament} · ${match.format}`,
  };
}

function presentSides(match: Match): { teamA: string; teamB: string } {
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
