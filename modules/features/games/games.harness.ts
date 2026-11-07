import type { Game } from '@/modules/shared/entities';
import type { GameCatalog } from '@/modules/shared/gateways';
import { aGameCatalog } from '@/modules/shared/shared.harness';

const sampleGames: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
];

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return { ...aGameCatalog(sampleGames), ...overrides };
}
