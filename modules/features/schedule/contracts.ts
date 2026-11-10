import type { GameId, Match } from '@/modules/shared/entities';

export type GameFilter = GameId | 'all';

export type ScheduleRouter = {
  gameFilter?: string;
  setGameFilter: (game: GameFilter) => void;
};

type DayCalendar = {
  dayKey: (instant: string | number) => string;
  todayKey: (now: number) => string;
  tomorrowKey: (now: number) => string;
  heading: (dayKey: string) => string;
};

export type DayGroup = {
  dayKey: string;
  label: string;
  matches: Match[];
};

export type MatchLabels = {
  kickoff: (startingTime: string) => string;
  countdown: (startingTime: string) => string;
};

export type ScheduleClock = {
  now: number;
  calendar: DayCalendar;
  labels: MatchLabels;
};

export type ChipModel = {
  id: GameFilter;
  label: string;
  onPress: () => void;
};

export type MatchRowModel = {
  id: string;
  kickoffLabel: string;
  countdownLabel: string;
  isLive: boolean;
  left: string;
  right: string;
  meta: string;
};

export type DaySectionModel = {
  dayKey: string;
  label: string;
  matches: MatchRowModel[];
};

export type SchedulePresenter = {
  selectedChip: GameFilter;
  chips: ChipModel[];
  groups: DaySectionModel[];
  emptyMessage: string;
  notice: string | null;
};
