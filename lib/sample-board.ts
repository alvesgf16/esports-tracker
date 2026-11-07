import { sampleGameCatalog } from '@/data/sample/games';
import { sampleMatchCatalog } from '@/data/sample/matches';
import type { ScheduleBoardState } from '@/modules/shared/gateways';

export const sampleBoard: ScheduleBoardState = {
  games: sampleGameCatalog,
  matches: sampleMatchCatalog,
  loadState: { status: 'ok' },
};
