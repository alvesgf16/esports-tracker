import { useState } from 'react';

import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { notice } from '@/modules/shared/mappers/notice';

import type { ScheduleClock, SchedulePresenter } from './contracts';
import { dayPager } from './mappers/day-pager';
import { emptyMessage } from './mappers/empty-message';
import { gameChips } from './mappers/game-chips';
import { matchDays } from './mappers/match-days';
import { useScheduleRouter } from './router';
import { listMatchesFor } from './use-cases/list-matches-for';
import { selectGameFromFilter } from './use-cases/select-game-from-filter';

export function useSchedulePresenter(
  board: ScheduleBoardState,
  clock: ScheduleClock
): SchedulePresenter {
  const { games, matches, loadState } = board;
  const todayKey = () => clock.calendar.todayKey(clock.now);

  const { gameFilter, setGameFilter } = useScheduleRouter();
  const [dayKey, setDayKey] = useState(todayKey);

  const listedGames = games.list();
  const selectedGame = selectGameFromFilter(gameFilter, listedGames);
  const selectedChip = selectedGame ?? 'all';
  const listedMatches = listMatchesFor(selectedGame, dayKey, {
    matches,
    clock,
  });

  return {
    selectedChip,
    chips: gameChips(listedGames, setGameFilter),
    dayPager: dayPager(dayKey, clock, setDayKey),
    groups: matchDays(listedMatches, games, clock),
    emptyMessage: emptyMessage(selectedChip, listedGames),
    notice: notice(loadState),
  };
}
