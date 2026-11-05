import { useLocalSearchParams, useRouter } from 'expo-router';

import type { ScheduleRouter } from './contracts';

type ScheduleSearchParams = {
  game?: string;
};

export function useScheduleRouter(): ScheduleRouter {
  const router = useRouter();
  const { game: gameFilter } = useLocalSearchParams<ScheduleSearchParams>();

  return {
    gameFilter,
    setGameFilter: (next) => {
      router.setParams({ game: next === 'all' ? '' : next });
    },
  };
}
