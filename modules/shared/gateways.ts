import type { Game, Match } from './entities';

export type GameCatalog = {
  list: () => Game[];
  get: (id: string) => Game;
};

export type MatchCatalog = {
  list: () => Match[];
};

export type ScheduleLoadError = { status: 'error'; message?: string };

export type ScheduleLoadFailure =
  { status: 'unconfigured' } | ScheduleLoadError;

export type ScheduleLoadState =
  { status: 'ok' } | { status: 'loading' } | ScheduleLoadFailure;

export type ScheduleBoardState = {
  games: GameCatalog;
  matches: MatchCatalog;
  loadState: ScheduleLoadState;
};

export type ScheduleBoardSource = {
  initial: ScheduleBoardState;
  load?: () => Promise<ScheduleBoardState>;
};
