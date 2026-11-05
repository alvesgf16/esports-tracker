import { useRouter } from 'expo-router';

import { sampleGameCatalog } from '@/data/sample/games';
import { sampleMatchCatalog } from '@/data/sample/matches';
import { boardFromCatalogs } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import { useScheduleBoard } from '@/lib/use-schedule-board';
import type { GamesRouter } from '@/modules/features/games/contracts';
import { presentGames } from '@/modules/features/games/presenter';
import GamesView from '@/modules/features/games/view';

const offlineBoard = boardFromCatalogs(sampleGameCatalog, sampleMatchCatalog);

export default function GamesScreen() {
  const now = useNow();
  const board = useScheduleBoard(offlineBoard);
  const router = useRouter();
  const gamesRouter = createGamesRouter(router);
  const model = presentGames({
    games: board.games,
    matches: board.matches,
    now,
  });

  return (
    <GamesView
      model={model}
      notice={board.notice}
      onOpenSchedule={gamesRouter.openSchedule}
    />
  );
}

function createGamesRouter(router: ReturnType<typeof useRouter>): GamesRouter {
  return {
    openSchedule: (gameId) => {
      router.push(`/?game=${gameId}`);
    },
  };
}
