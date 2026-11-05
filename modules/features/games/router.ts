import { useRouter } from 'expo-router';

import type { GamesRouter } from './contracts';

export function useGamesRouter(): GamesRouter {
  const router = useRouter();

  return {
    openSchedule: (gameId) => {
      router.push(`/?game=${gameId}`);
    },
  };
}
