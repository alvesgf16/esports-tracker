import type { Match } from '@/modules/shared/entities';
import type { MatchCatalog } from '@/modules/shared/gateways';

export function matchCatalog(matches: Match[]): MatchCatalog {
  return { list: () => matches };
}
