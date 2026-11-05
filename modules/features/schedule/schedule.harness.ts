import type { Game } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';

export {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
  TEST_TIME_ZONE,
} from '@/modules/shared/shared.harness';

const lol: Game = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return {
    list: () => [lol],
    get: () => lol,
    ...overrides,
  };
}

export function stubMatchCatalog(
  overrides: Partial<MatchCatalog> = {}
): MatchCatalog {
  return {
    list: () => [],
    ...overrides,
  };
}
