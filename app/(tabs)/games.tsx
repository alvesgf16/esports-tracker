import { useRouter } from 'expo-router';

import { sampleGameCatalog } from '@/data/games';
import { sampleMatchCatalog } from '@/data/matches';
import { useNow } from '@/lib/use-now';
import type { GamesRouter } from '@/modules/games/contracts';
import { presentGames } from '@/modules/games/presenter';
import GamesView from '@/modules/games/view';

export default function GamesScreen() {
  const now = useNow();
  const router = useRouter();
  const gamesRouter = createGamesRouter(router);
  const model = presentGames({
    games: sampleGameCatalog,
    matches: sampleMatchCatalog,
    now,
  });

  return <GamesView model={model} onOpenSchedule={gamesRouter.openSchedule} />;
}

function createGamesRouter(router: ReturnType<typeof useRouter>): GamesRouter {
  return {
    openSchedule: (gameId) => {
      router.push(`/?game=${gameId}`);
    },
  };
}
