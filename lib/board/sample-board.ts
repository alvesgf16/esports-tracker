import { sampleGameCatalog } from '@/data/sources/sample/games';
import { sampleMatchCatalog } from '@/data/sources/sample/matches';
import type { ScheduleBoardState } from '@/modules/shared/gateways';

export const sampleBoard: ScheduleBoardState = {
  games: sampleGameCatalog,
  matches: sampleMatchCatalog,
  loadState: { status: 'ok' },
};
