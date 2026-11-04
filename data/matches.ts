import type { Match } from '@/modules/schedule/entities';
import type { MatchCatalog } from '@/modules/schedule/gateways';

import { EARLY_MATCHES } from './matches-early';
import { LATER_MATCHES } from './matches-later';

/** Sample upcoming matches. Swap this for a live schedule API later. */
export const MATCHES: Match[] = [...EARLY_MATCHES, ...LATER_MATCHES];

export const sampleMatchCatalog: MatchCatalog = {
  list: () => MATCHES,
};
