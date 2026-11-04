import { GAMES } from '@/data/games';
import type { GameFilter, GameId } from '@/data/types';

export function parseFilter(
  value: string | string[] | undefined
): GameFilter | null {
  const game = Array.isArray(value) ? value[0] : value;
  if (game === 'all' || GAMES.some((item) => item.id === game)) {
    return game as GameFilter;
  }
  return null;
}

export function gameName(id: GameId): string {
  return GAMES.find((item) => item.id === id)?.name ?? id;
}
