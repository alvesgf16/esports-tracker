import { useLocalSearchParams, useRouter } from 'expo-router';

import { scheduleGameRoute } from '@/modules/shared/schedule-game-route';

import type { ScheduleRouter } from './contracts';

type ScheduleSearchParams = {
  [Key in typeof scheduleGameRoute.param]?: string | string[];
};

export function useScheduleRouter(): ScheduleRouter {
  const router = useRouter();
  const params = useLocalSearchParams<ScheduleSearchParams>();
  const game = params[scheduleGameRoute.param];

  return {
    gameFilter: firstQueryValue(game),
    setGameFilter: (next) => {
      router.setParams({
        [scheduleGameRoute.param]: next === 'all' ? '' : next,
      });
    },
  };
}

function firstQueryValue(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
