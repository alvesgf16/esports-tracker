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
  onPress: () => void;
};

export type GamesPresenter = {
  rows: GameRowModel[];
  notice: string | null;
};
