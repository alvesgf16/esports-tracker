import type { Game, GameId } from '@/modules/shared/entities';

export function selectGameFromFilter(
  gameId: string | undefined,
  games: Game[]
): GameId | null {
  const hasId = (game: Game): boolean => game.id === gameId;

  const selectedGame = games.find(hasId);

  return selectedGame?.id ?? null;
}
