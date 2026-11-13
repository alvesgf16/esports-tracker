import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { notice } from '@/modules/shared/mappers/notice';

import type { GamesPresenter } from './contracts';
import { gameRows } from './mappers/game-rows';
import { useGamesRouter } from './router';

export function useGamesPresenter(
  board: ScheduleBoardState,
  now: number
): GamesPresenter {
  const { games, matches, loadState } = board;

  const { openSchedule } = useGamesRouter();

  const listedGames = games.list();
  const listedMatches = matches.list();
  const matchesSnapshot = { matches: listedMatches, referenceTime: now };

  return {
    rows: gameRows(listedGames, matchesSnapshot, openSchedule),
    notice: notice(loadState),
  };
}
