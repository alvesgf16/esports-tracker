import type { Game } from '@/modules/shared/entities';

export function selectGameFromFilter(
  gameId: string | undefined,
  games: Game[]
): string | null {
  const hasId = (game: Game) => game.id === gameId;

  const selectedGame = games.find(hasId);

  return selectedGame?.id ?? null;
}
