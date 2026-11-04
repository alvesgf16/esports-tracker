import { formatCountdown, formatKickoff } from '@/lib/format-time';
import type { Game } from '@/modules/games/entities';
import type { GameCatalog } from '@/modules/games/gateways';

import type {
  ChipModel,
  DaySectionModel,
  MatchCardModel,
  ScheduleViewModel,
} from './contracts';
import type { GameFilter, Match } from './entities';
import type { MatchCatalog } from './gateways';
import { groupByDay } from './use-cases/day-groups';
import { gameName } from './use-cases/game-name';
import { matchStatus } from './use-cases/match-status';
import { parseFilter } from './use-cases/parse-filter';
import { visibleMatches } from './use-cases/visible-matches';

type PresentInput = {
  games: GameCatalog;
  matches: MatchCatalog;
  now: number;
  gameParam: string | string[] | undefined;
};

export function presentSchedule(input: PresentInput): ScheduleViewModel {
  const catalogGames = input.games.list();
  const selected = parseFilter(input.gameParam, catalogGames) ?? 'all';
  const matches = visibleMatches(input.matches.list(), selected, input.now);
  const groups = groupByDay(matches, input.now);

  return {
    selected,
    chips: buildChips(catalogGames),
    groups: groups.map((group) => presentDay(group, input)),
    emptyMessage: emptyMessage(selected, catalogGames),
  };
}

function buildChips(games: Game[]): ChipModel[] {
  return [
    { id: 'all', label: 'All' },
    ...games.map((game) => ({
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
  const status = matchStatus(match.startsAt, input.now);
  const game = input.games.get(match.game);
  const isLive = status === 'live';

  return {
    id: match.id,
    kickoffLabel: isLive ? 'LIVE' : formatKickoff(match.startsAt),
    countdownLabel: isLive
      ? 'LIVE'
      : formatCountdown(match.startsAt, input.now),
    isLive,
    teamA: match.teamA.name,
    teamB: match.teamB.name,
    meta: `${game.shortName} · ${match.tournament} · ${match.format}`,
  };
}

function emptyMessage(selected: GameFilter, games: Game[]): string {
  if (selected === 'all') {
    return 'No upcoming matches.';
  }

  return `No upcoming ${gameName(selected, games)} matches.`;
}
