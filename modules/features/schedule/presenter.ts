import { formatCountdown, formatKickoff } from '@/lib/format-time';
import type { Game, GameFilter, Match, Team } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';
import { matchStatus } from '@/modules/shared/use-cases/match-status';
import { visibleMatches } from '@/modules/shared/use-cases/visible-matches';

import type {
  ChipModel,
  DaySectionModel,
  MatchCardModel,
  ScheduleViewModel,
} from './contracts';
import { groupByDay } from './use-cases/group-by-day';
import { gameName } from './use-cases/game-name';
import { parseFilter } from './use-cases/parse-filter';

type PresentInput = {
  games: GameCatalog;
  matches: MatchCatalog;
  now: number;
  timeZone: string;
  gameParam: string | string[] | undefined;
};

export function presentSchedule(input: PresentInput): ScheduleViewModel {
  const catalogGames = input.games.list();
  const selected = parseFilter(input.gameParam, catalogGames) ?? 'all';
  const matches = visibleMatches(input.matches.list(), selected, input.now);
  const groups = groupByDay(matches, input.now, input.timeZone);

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
  const status = matchStatus(match.startsAt, input.now, match.progress);
  const game = input.games.get(match.game);
  const isLive = status === 'live';
  const sides = presentSides(match);

  return {
    id: match.id,
    kickoffLabel: isLive
      ? 'LIVE'
      : formatKickoff(match.startsAt, input.timeZone),
    countdownLabel: isLive ? '' : formatCountdown(match.startsAt, input.now),
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

function teamName(team: Team | undefined): string {
  return team?.name ?? 'TBD';
}

function emptyMessage(selected: GameFilter, games: Game[]): string {
  if (selected === 'all') {
    return 'No upcoming matches.';
  }

  return `No upcoming ${gameName(selected, games)} matches.`;
}
