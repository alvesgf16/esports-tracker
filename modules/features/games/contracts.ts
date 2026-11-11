export type GamesRouter = {
  openSchedule: (gameId: string) => void;
};

export type GameRowModel = {
  id: string;
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
