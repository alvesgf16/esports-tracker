import type { Game, MatchesSnapshot } from '@/modules/shared/entities';

import type { GameRowModel } from '../contracts';
import { gameRow } from './game-row';

export function gameRows(
  games: Game[],
  matchesSnapshot: MatchesSnapshot,
  openSchedule: (gameId: string) => void
): GameRowModel[] {
  const toGameRow = (game: Game) =>
    gameRow(game, matchesSnapshot, () => openSchedule(game.id));

  return games.map(toGameRow);
}
