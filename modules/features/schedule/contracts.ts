import type { GameId, Match } from '@/modules/shared/entities';

export type GameFilter = GameId | 'all';

export type ScheduleRouter = {
  gameFilter?: string;
  setGameFilter: (game: GameFilter) => void;
};

export type DayCalendar = {
  key: (instant: string | number) => string;
  todayKey: (now: number) => string;
  tomorrowKey: (now: number) => string;
  heading: (key: string) => string;
};

export type DayGroup = {
  key: string;
  label: string;
  matches: Match[];
};

export type MatchLabels = {
  kickoff: (startsAt: string) => string;
  countdown: (startsAt: string) => string;
};

export type ScheduleClock = {
  now: number;
  calendar: DayCalendar;
  labels: MatchLabels;
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
