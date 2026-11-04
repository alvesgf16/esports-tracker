import { GAMES, type Game } from '@/data/games';
import type { GameId } from '@/data/types';
import {
  scheduleInteractor,
  type ScheduleInteractor,
} from '@/modules/schedule/interactor';

export type GamesInteractor = {
  listGames: () => Game[];
  upcomingCount: (gameId: GameId, now: number) => number;
};

function createGamesInteractor(
  schedule: ScheduleInteractor = scheduleInteractor
): GamesInteractor {
  return {
    listGames: () => GAMES,
    upcomingCount: (gameId, now) => schedule.visibleMatches(gameId, now).length,
  };
}

export const gamesInteractor = createGamesInteractor();
