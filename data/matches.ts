import { EARLY_MATCHES } from './matches-early';
import { LATER_MATCHES } from './matches-later';
import type { Match } from './types';

/** Sample upcoming matches. Swap this for a live schedule API later. */
export const MATCHES: Match[] = [...EARLY_MATCHES, ...LATER_MATCHES];
