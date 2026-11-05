import type { GameId } from '@/modules/shared/entities';

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

export type GamesPresenter = {
  rows: GameRowModel[];
  notice: string | null;
  openSchedule: (gameId: GameId) => void;
};
