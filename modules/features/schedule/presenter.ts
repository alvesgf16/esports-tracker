import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { presentNotice } from '@/modules/shared/mappers/present-notice';
import { visibleMatches } from '@/modules/shared/use-cases/visible-matches';

import type { ScheduleClock, SchedulePresenter } from './contracts';
import { presentChips } from './mappers/present-chips';
import { presentEmptyMessage } from './mappers/present-empty-message';
import { presentGroups } from './mappers/present-groups';
import { useScheduleRouter } from './router';
import { parseFilter } from './use-cases/parse-filter';

export function useSchedulePresenter(
  board: ScheduleBoardState,
  clock: ScheduleClock
): SchedulePresenter {
  const { gameFilter, setGameFilter } = useScheduleRouter();
  const catalogGames = board.games.list();
  const parsed = parseFilter(gameFilter, catalogGames);
  const selected = parsed ?? 'all';
  const matches = visibleMatches(board.matches.list(), parsed, clock.now);

  return {
    selected,
    chips: presentChips(catalogGames),
    groups: presentGroups(matches, board.games, clock),
    emptyMessage: presentEmptyMessage(selected, catalogGames),
    notice: presentNotice(board.loadState),
    setGameFilter,
  };
}
