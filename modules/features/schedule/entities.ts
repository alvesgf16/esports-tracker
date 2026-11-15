import type { Competition, Match } from '@/modules/shared/entities';

export type CompetitionGroup = {
  id: string;
  game: string;
  competition: Competition;
  matches: Match[];
};
