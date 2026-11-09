import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { notice } from '@/modules/shared/mappers/notice';
import { visibleMatchesFor } from '@/modules/shared/use-cases/visible-matches-for';

import type { ScheduleClock, SchedulePresenter } from './contracts';
import { emptyMessage } from './mappers/empty-message';
import { gameChips } from './mappers/game-chips';
import { matchDays } from './mappers/match-days';
import { useScheduleRouter } from './router';
import { selectGameFromFilter } from './use-cases/select-game-from-filter';

export function useSchedulePresenter(
  board: ScheduleBoardState,
  clock: ScheduleClock
): SchedulePresenter {
  const { games, matches, loadState } = board;

  const { gameFilter, setGameFilter } = useScheduleRouter();

  const listedGames = games.list();
  const selectedGame = selectGameFromFilter(gameFilter, listedGames);
  const selectedChip = selectedGame ?? 'all';
  const listedMatches = matches.list();
  const matchesSnapshot = { matches: listedMatches, referenceTime: clock.now };
  const visibleMatches = visibleMatchesFor(selectedGame, matchesSnapshot);

  return {
    selectedChip,
    chips: gameChips(listedGames, setGameFilter),
    groups: matchDays(visibleMatches, games, clock),
    emptyMessage: emptyMessage(selectedChip, listedGames),
    notice: notice(loadState),
  };
}
