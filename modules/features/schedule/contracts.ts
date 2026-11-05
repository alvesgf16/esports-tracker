import type { GameFilter } from '@/modules/shared/entities';

export type ScheduleRouter = {
  gameFilter?: string;
  setGameFilter: (game: GameFilter) => void;
};

export type ChipModel = {
  id: GameFilter;
  label: string;
};

export type MatchCardModel = {
  id: string;
  kickoffLabel: string;
  countdownLabel: string;
  isLive: boolean;
  teamA: string;
  teamB: string;
  meta: string;
};

export type DaySectionModel = {
  key: string;
  label: string;
  matches: MatchCardModel[];
};

export type SchedulePresenter = {
  selected: GameFilter;
  chips: ChipModel[];
  groups: DaySectionModel[];
  emptyMessage: string;
  notice: string | null;
  setGameFilter: (game: GameFilter) => void;
};
