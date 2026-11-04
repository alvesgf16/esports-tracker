import type { GameFilter } from '@/data/types';

export type ScheduleRouter = {
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

export type ScheduleViewModel = {
  selected: GameFilter;
  chips: ChipModel[];
  groups: DaySectionModel[];
  emptyMessage: string;
};
