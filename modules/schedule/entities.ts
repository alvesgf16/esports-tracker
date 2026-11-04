import type { GameId } from '@/modules/games/entities';

export type GameFilter = GameId | 'all';

export type MatchProgress = 'not_started' | 'running' | 'finished';

export type Team = {
  name: string;
  shortName: string;
};

export type Match = {
  id: string;
  game: GameId;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
  teams: Team[];
  progress?: MatchProgress;
};
