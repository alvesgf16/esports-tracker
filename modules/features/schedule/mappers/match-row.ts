import type { Match } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type { MatchLabels, MatchRowModel } from '../contracts';
import { sidesFor } from './sides-for';

type MatchContext = {
  games: GameCatalog;
  now: number;
  labels: MatchLabels;
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
  const { left, right } = sidesFor(match, now);
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
