import type { Match } from '@/modules/shared/entities';

export type CompetitionGroup = {
  id: string;
  game: string;
  tournament: string;
  matches: Match[];
};
