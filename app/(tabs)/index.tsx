import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';

import type { GameFilter } from '@/data/types';
import { useNow } from '@/lib/use-now';
import type { ScheduleRouter } from '@/modules/schedule/contracts';
import { scheduleInteractor } from '@/modules/schedule/interactor';
import { presentSchedule } from '@/modules/schedule/presenter';
import ScheduleView from '@/modules/schedule/view';

export default function ScheduleScreen() {
  const now = useNow();
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const scheduleRouter = useMemo(() => createScheduleRouter(router), [router]);
  const model = useMemo(
    () =>
      presentSchedule({
        interactor: scheduleInteractor,
        now,
        gameParam: game,
      }),
    [game, now]
  );

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
