import type { Game, GameId } from '@/modules/shared/entities';

export function parseFilter(
  value: string | undefined,
  games: Game[]
): GameId | null {
  if (value && games.some((item) => item.id === value)) {
    return value;
  }

  return null;
}
