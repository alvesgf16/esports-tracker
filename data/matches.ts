import type { Match } from '@/modules/schedule/entities';

import { EARLY_MATCHES } from './matches-early';
import { LATER_MATCHES } from './matches-later';

/** Sample upcoming matches. Swap this for a live schedule API later. */
export const MATCHES: Match[] = [...EARLY_MATCHES, ...LATER_MATCHES];
