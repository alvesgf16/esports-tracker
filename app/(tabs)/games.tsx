import { useRouter } from 'expo-router';

import { useNow } from '@/lib/use-now';
import type { GamesRouter } from '@/modules/games/contracts';
import { gamesInteractor } from '@/modules/games/interactor';
import { presentGames } from '@/modules/games/presenter';
import GamesView from '@/modules/games/view';

export default function GamesScreen() {
  const now = useNow();
  const router = useRouter();
  const gamesRouter = createGamesRouter(router);
  const model = presentGames({ interactor: gamesInteractor, now });

  return <GamesView model={model} onOpenSchedule={gamesRouter.openSchedule} />;
}

function createGamesRouter(router: ReturnType<typeof useRouter>): GamesRouter {
  return {
    openSchedule: (gameId) => {
      router.push(`/?game=${gameId}`);
    },
  };
}
