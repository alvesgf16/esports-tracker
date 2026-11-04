import type { Match } from './entities';

export type MatchCatalog = {
  list: () => Match[];
};
