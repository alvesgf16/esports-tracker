import type { Match } from '@/modules/shared/entities';

export type GameFilter = string | 'all';

export type ScheduleRouter = {
  gameFilter?: string;
  setGameFilter: (game: GameFilter) => void;
};

export type DayCalendar = {
  dayKey: (instant: string | number) => string;
  todayKey: (now: number) => string;
  tomorrowKey: (now: number) => string;
  heading: (dayKey: string) => string;
  shiftKey: (dayKey: string, days: number) => string;
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

export type DayPagerModel = {
  label: string;
  onPrev: () => void;
  onNext: () => void;
};

export type SideEmphasis = 'winner' | 'loser' | 'undecided';

export type MatchSideModel = {
  name: string;
  score: string | null;
  emphasis: SideEmphasis;
};

export type MatchRowModel = {
  id: string;
  kickoffLabel: string;
  countdownLabel: string;
  isLive: boolean;
  left: MatchSideModel;
  right: MatchSideModel;
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
  dayPager: DayPagerModel;
  groups: DaySectionModel[];
  emptyMessage: string;
  notice: string | null;
};
