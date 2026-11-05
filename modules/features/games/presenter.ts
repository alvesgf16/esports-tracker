import type { ScheduleBoardState } from '@/lib/schedule-board';
import { useNow } from '@/lib/use-now';
import { useScheduleBoard } from '@/lib/use-schedule-board';
import type { Game, Match } from '@/modules/shared/entities';

import type { GameRowModel, GamesPresenter } from './contracts';
import { useGamesRouter } from './router';
import { upcomingCount } from './use-cases/upcoming-count';

export function useGamesPresenter(
  sampleBoard: ScheduleBoardState
): GamesPresenter {
  const now = useNow();
  const board = useScheduleBoard(sampleBoard);
  const { openSchedule } = useGamesRouter();
  const matches = board.matches.list();

  return {
    rows: board.games.list().map((game) => presentRow(game, matches, now)),
    notice: board.notice,
    openSchedule,
  };
}

function presentRow(game: Game, matches: Match[], now: number): GameRowModel {
  const count = upcomingCount(matches, game.id, now);
  const upcomingLabel =
    count === 0 ? 'No upcoming matches' : `${count} upcoming`;

  return {
    id: game.id,
    name: game.name,
    shortName: game.shortName,
    upcomingLabel,
    accessibilityLabel: `${game.name}, ${upcomingLabel.toLowerCase()}`,
  };
}
