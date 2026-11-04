import { useLocalSearchParams, useRouter } from 'expo-router';

import { sampleGameCatalog } from '@/data/sample/games';
import { sampleMatchCatalog } from '@/data/sample/matches';
import { useNow } from '@/lib/use-now';
import type { ScheduleRouter } from '@/modules/schedule/contracts';
import type { GameFilter } from '@/modules/schedule/entities';
import { presentSchedule } from '@/modules/schedule/presenter';
import ScheduleView from '@/modules/schedule/view';

export default function ScheduleScreen() {
  const now = useNow();
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const scheduleRouter = createScheduleRouter(router);
  const model = presentSchedule({
    games: sampleGameCatalog,
    matches: sampleMatchCatalog,
    now,
    gameParam: game,
  });

  return (
    <ScheduleView model={model} onSelectGame={scheduleRouter.setGameFilter} />
  );
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
