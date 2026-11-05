import type { Game, GameId } from '@/modules/shared/entities';

export function gameName(id: GameId, games: Game[]): string {
  return games.find((item) => item.id === id)?.name ?? id;
}
