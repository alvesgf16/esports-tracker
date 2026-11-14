import type { Match } from '@/modules/shared/entities';
import { matchDisplayStatus } from '@/modules/shared/use-cases/match-display-status';

import type { MatchLabels, MatchRowModel } from '../contracts';
import { sidesFor } from './sides-for';

type MatchContext = {
  referenceTime: number;
  labels: MatchLabels;
};

type TimeColumn = {
  kickoffLabel: string;
  countdownLabel: string;
  isLive: boolean;
};

export function matchRow(match: Match, context: MatchContext): MatchRowModel {
  const { format, id, startsAt, status } = match;
  const { labels, referenceTime } = context;

  const displayStatus = matchDisplayStatus(startsAt, referenceTime, status);
  const { left, right } = sidesFor(match, referenceTime);
  const timeColumn = buildTimeColumn(displayStatus, startsAt, labels);

  return {
    id,
    ...timeColumn,
    left,
    right,
    format,
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
