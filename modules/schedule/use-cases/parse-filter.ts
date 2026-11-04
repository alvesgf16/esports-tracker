import type { Game } from '@/modules/games/entities';

import type { GameFilter } from '../entities';

export function parseFilter(
  value: string | string[] | undefined,
  games: Game[]
): GameFilter | null {
  const game = Array.isArray(value) ? value[0] : value;

  if (game === 'all' || games.some((item) => item.id === game)) {
    return game as GameFilter;
  }

  return null;
}
