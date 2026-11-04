import { useRouter } from 'expo-router';

import { useNow } from '@/lib/use-now';
import { useScheduleBoard } from '@/lib/use-schedule-board';
import type { GamesRouter } from '@/modules/games/contracts';
import { presentGames } from '@/modules/games/presenter';
import GamesView from '@/modules/games/view';

export default function GamesScreen() {
  const now = useNow();
  const board = useScheduleBoard();
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
