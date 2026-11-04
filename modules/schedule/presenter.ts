import type { GameFilter, Match } from './entities';

import type {
  ChipModel,
  DaySectionModel,
  MatchCardModel,
  ScheduleViewModel,
} from './contracts';
import { formatCountdown, formatKickoff } from './helpers/format-time';
import type { ScheduleInteractor } from './interactor';

type PresentInput = {
  interactor: ScheduleInteractor;
  now: number;
  gameParam: string | string[] | undefined;
};

export function presentSchedule(input: PresentInput): ScheduleViewModel {
  const selected = input.interactor.parseFilter(input.gameParam) ?? 'all';
  const matches = input.interactor.visibleMatches(selected, input.now);
  const groups = input.interactor.groupByDay(matches, input.now);

  return {
    selected,
    chips: buildChips(input.interactor),
    groups: groups.map((group) => presentDay(group, input)),
    emptyMessage: emptyMessage(selected, input.interactor),
  };
}

function buildChips(interactor: ScheduleInteractor): ChipModel[] {
  return [
    { id: 'all', label: 'All' },
    ...interactor.listGames().map((game) => ({
      id: game.id,
      label: game.shortName,
    })),
  ];
}

function presentDay(
  group: { key: string; label: string; matches: Match[] },
  input: PresentInput
): DaySectionModel {
  return {
    key: group.key,
    label: group.label,
    matches: group.matches.map((match) => presentMatch(match, input)),
  };
}

function presentMatch(match: Match, input: PresentInput): MatchCardModel {
  const status = input.interactor.matchStatus(match.startsAt, input.now);
  const game = input.interactor.getGame(match.game);

  return {
    id: match.id,
    kickoffLabel: status === 'live' ? 'LIVE' : formatKickoff(match.startsAt),
    countdownLabel: formatCountdown(match.startsAt, input.now, status),
    isLive: status === 'live',
    teamA: match.teamA.name,
    teamB: match.teamB.name,
    meta: `${game.shortName} · ${match.tournament} · ${match.format}`,
  };
}

function emptyMessage(
  selected: GameFilter,
  interactor: ScheduleInteractor
): string {
  if (selected === 'all') {
    return 'No upcoming matches.';
  }

  return `No upcoming ${interactor.gameName(selected)} matches.`;
}
