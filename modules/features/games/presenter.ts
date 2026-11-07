import type { ScheduleBoardState } from '@/modules/shared/gateways';
import { presentNotice } from '@/modules/shared/mappers/present-notice';

import type { GamesPresenter } from './contracts';
import { presentRow } from './mappers/present-row';
import { useGamesRouter } from './router';

export function useGamesPresenter(
  board: ScheduleBoardState,
  now: number
): GamesPresenter {
  const { openSchedule } = useGamesRouter();
  const matches = board.matches.list();

  return {
    rows: board.games.list().map((game) => presentRow(game, matches, now)),
    notice: presentNotice(board.loadState),
    openSchedule,
  };
}
