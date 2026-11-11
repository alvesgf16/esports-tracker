import { sampleGameCatalog } from '@/data/sources/sample/catalogs/games';
import { sampleMatchCatalog } from '@/data/sources/sample/catalogs/matches';
import type { ScheduleBoardState } from '@/modules/shared/gateways';

export const sampleBoard: ScheduleBoardState = {
  games: sampleGameCatalog,
  matches: sampleMatchCatalog,
  loadState: { status: 'ok' },
};
