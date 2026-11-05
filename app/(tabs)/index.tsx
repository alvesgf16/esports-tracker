import { useLocalSearchParams, useRouter } from 'expo-router';

import { sampleGameCatalog } from '@/data/sample/games';
import { sampleMatchCatalog } from '@/data/sample/matches';
import { deviceTimeZone } from '@/lib/device-time-zone';
import { boardFromCatalogs } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import { useScheduleBoard } from '@/lib/use-schedule-board';
import type { ScheduleRouter } from '@/modules/features/schedule/contracts';
import { presentSchedule } from '@/modules/features/schedule/presenter';
import ScheduleView from '@/modules/features/schedule/view';
import type { GameFilter } from '@/modules/shared/entities';

const offlineBoard = boardFromCatalogs(sampleGameCatalog, sampleMatchCatalog);

export default function ScheduleScreen() {
  const now = useNow();
  const board = useScheduleBoard(offlineBoard);
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const scheduleRouter = createScheduleRouter(router);

  return (
    <ScheduleView
      model={scheduleModel(board, now, game)}
      notice={board.notice}
      onSelectGame={scheduleRouter.setGameFilter}
    />
  );
}

function scheduleModel(
  board: ReturnType<typeof useScheduleBoard>,
  now: number,
  game: string | undefined
) {
  return presentSchedule({
    games: board.games,
    matches: board.matches,
    now,
    timeZone: deviceTimeZone(),
    gameParam: game,
  });
}

function createScheduleRouter(
  router: ReturnType<typeof useRouter>
): ScheduleRouter {
  return {
    setGameFilter: (next: GameFilter) => {
      router.setParams({ game: next === 'all' ? '' : next });
    },
  };
}
