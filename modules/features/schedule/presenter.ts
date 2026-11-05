import { deviceTimeZone } from '@/lib/device-time-zone';
import type { ScheduleBoardState } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import { useScheduleBoard } from '@/lib/use-schedule-board';
import type { Game, GameFilter } from '@/modules/shared/entities';
import { visibleMatches } from '@/modules/shared/use-cases/visible-matches';

import type { ChipModel, SchedulePresenter } from './contracts';
import { useScheduleRouter } from './router';
import { gameName } from './use-cases/game-name';
import { groupByDay } from './use-cases/group-by-day';
import { parseFilter } from './use-cases/parse-filter';
import { presentDay } from './use-cases/present-day';

export function useSchedulePresenter(
  sampleBoard: ScheduleBoardState
): SchedulePresenter {
  const now = useNow();
  const board = useScheduleBoard(sampleBoard);
  const { gameFilter, setGameFilter } = useScheduleRouter();

  return {
    ...presentSchedule(board, now, gameFilter),
    notice: board.notice,
    setGameFilter,
  };
}

function presentSchedule(
  board: ScheduleBoardState,
  now: number,
  gameFilter?: string
) {
  const timeZone = deviceTimeZone();
  const catalogGames = board.games.list();
  const selected = parseFilter(gameFilter, catalogGames) ?? 'all';
  const matches = visibleMatches(board.matches.list(), selected, now);
  const context = { board, now, timeZone };

  return {
    selected,
    chips: buildChips(catalogGames),
    groups: groupByDay(matches, now, timeZone).map((group) =>
      presentDay(group, context)
    ),
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

function emptyMessage(selected: GameFilter, games: Game[]): string {
  if (selected === 'all') {
    return 'No upcoming matches.';
  }

  return `No upcoming ${gameName(selected, games)} matches.`;
}
