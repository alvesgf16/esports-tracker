import { useRouter } from 'expo-router';

import { scheduleGameRoute } from '@/modules/shared/schedule-game-route';

import type { GamesRouter } from './contracts';

export function useGamesRouter(): GamesRouter {
  const router = useRouter();

  return {
    openSchedule: (gameId) => {
      router.push(scheduleGameRoute.href(gameId));
    },
  };
}
