import { sampleGameCatalog } from '@/data/sample/games';
import { sampleMatchCatalog } from '@/data/sample/matches';
import { boardFromCatalogs } from '@/lib/schedule-board';

export const sampleBoard = boardFromCatalogs(
  sampleGameCatalog,
  sampleMatchCatalog
);
