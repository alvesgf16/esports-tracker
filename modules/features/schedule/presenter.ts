import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { notice } from '@/modules/shared/mappers/notice';

import type { ScheduleClock, SchedulePresenter } from './contracts';
import { useDayKey } from './hooks/use-day-key';
import { useDisclosureExpansion } from './hooks/use-disclosure-expansion';
import { useFailedUrls } from './hooks/use-failed-logo-urls';
import { useIsClient } from './hooks/use-is-client';
import { useStatusFilter } from './hooks/use-status-filter';
import { competitionDisclosures } from './mappers/competition-disclosures';
import { dayPager } from './mappers/day-pager';
import { emptyMessage } from './mappers/empty-message';
import { gameChips } from './mappers/game-chips';
import { statusChips } from './mappers/status-chips';
import { useScheduleRouter } from './router';
import { countLiveMatches } from './use-cases/count-live-matches';
import { listMatchesFor } from './use-cases/list-matches-for';
import { selectGameFromFilter } from './use-cases/select-game-from-filter';

export function useSchedulePresenter(
  board: ScheduleBoardState,
  clock: ScheduleClock
): SchedulePresenter {
  const { games, matches, loadState } = board;
  const todayKey = clock.calendar.todayKey(clock.now);

  const { gameFilter, setGameFilter } = useScheduleRouter();
  const { statusFilter, setStatusFilter } = useStatusFilter();
  const { dayKey, selectDayFromKey } = useDayKey(todayKey);
  const isClient = useIsClient();
  const { failedUrls, markAsFailed } = useFailedUrls();
  const expansion = useDisclosureExpansion();

  const listedGames = games.list();
  const selectedGame = selectGameFromFilter(gameFilter, listedGames);
  const selectedGameChip = selectedGame ?? 'all';
  const dayGameMatches = listMatchesFor(selectedGame, dayKey, {
    matches,
    clock,
  });
  const liveCount = countLiveMatches(dayGameMatches, clock.now);
  const listedMatches = listMatchesFor(selectedGame, dayKey, {
    matches,
    clock,
    statusFilter,
  });

  return {
    selectedGameChip,
    gameChips: gameChips(listedGames, setGameFilter),
    selectedStatusChip: statusFilter,
    statusChips: statusChips(liveCount, setStatusFilter),
    dayPager: dayPager(dayKey, clock, selectDayFromKey),
    groups: competitionDisclosures({
      matches: listedMatches,
      games,
      clock,
      logos: { isClient, failedUrls, markAsFailed },
      expansion,
    }),
    emptyMessage: emptyMessage(selectedGameChip, listedGames),
    notice: notice(loadState),
  };
}
