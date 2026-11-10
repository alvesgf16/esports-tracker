import type { Game, Match } from '@/modules/shared/entities';

export type ScheduleBoard = {
  games: Game[];
  matches: Match[];
};
