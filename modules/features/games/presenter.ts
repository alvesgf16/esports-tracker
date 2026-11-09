import type { Game } from '@/modules/shared/entities';
import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { notice } from '@/modules/shared/mappers/notice';

import type { GamesPresenter } from './contracts';
import { gameRow } from './mappers/game-row';
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
  const toGameRow = (game: Game) =>
    gameRow(game, matchesSnapshot, () => openSchedule(game.id));

  return {
    rows: listedGames.map(toGameRow),
    notice: notice(loadState),
  };
}
