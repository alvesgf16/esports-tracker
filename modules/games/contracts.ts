import type { GameId } from './entities';

export type GamesRouter = {
  openSchedule: (gameId: GameId) => void;
};

export type GameRowModel = {
  id: GameId;
  name: string;
  shortName: string;
  upcomingLabel: string;
  accessibilityLabel: string;
};

export type GamesViewModel = {
  rows: GameRowModel[];
};
