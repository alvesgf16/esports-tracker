import { matchCatalog } from '@/data/catalogs/match-catalog';
import type { Match } from '@/modules/shared/entities';

import { EARLY_MATCHES } from './matches-early';
import { LATER_MATCHES } from './matches-later';
import { LOBBY_MATCHES } from './matches-lobby';

/** Sample board covering duel, lobby, formats, and status edge cases. */
const MATCHES: Match[] = [...EARLY_MATCHES, ...LOBBY_MATCHES, ...LATER_MATCHES];

export const sampleMatchCatalog = matchCatalog(MATCHES);
