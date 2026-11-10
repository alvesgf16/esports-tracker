import type { Match, Team } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type { MatchLabels, MatchRowModel } from '../contracts';

type MatchContext = {
  games: GameCatalog;
  now: number;
  labels: MatchLabels;
};

type MatchSides = {
  left: string;
  right: string;
};

type TimeColumn = {
  kickoffLabel: string;
  countdownLabel: string;
  isLive: boolean;
};

export function matchRow(match: Match, context: MatchContext): MatchRowModel {
  const { format, game, id, startsAt, status, tournament } = match;
  const { games, labels, now } = context;

  const displayStatus = matchDisplayStatus(startsAt, now, status);
  const { left, right } = sidesFor(match);
  const timeColumn = buildTimeColumn(displayStatus, startsAt, labels);

  return {
    id,
    ...timeColumn,
    left,
    right,
    meta: `${games.get(game).shortName} · ${tournament} · ${format}`,
  };
}

function buildTimeColumn(
  displayStatus: string,
  startsAt: string,
  labels: MatchLabels
): TimeColumn {
  if (displayStatus === 'live') {
    return { kickoffLabel: 'LIVE', countdownLabel: '', isLive: true };
  }

  const kickoffLabel = labels.kickoff(startsAt);
  const countdownLabel =
    displayStatus === 'finished' ? 'FT' : labels.countdown(startsAt);

  return { kickoffLabel, countdownLabel, isLive: false };
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
