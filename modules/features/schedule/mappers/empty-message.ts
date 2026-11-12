import type { Game } from '@/modules/shared/entities';

import type { GameFilter } from '../contracts';

export function emptyMessage(selected: GameFilter, games: Game[]): string {
  return selected === 'all'
    ? 'No upcoming matches.'
    : `No upcoming ${nameFor(selected, games)} matches.`;
}

function nameFor(gameId: string, games: Game[]): string {
  const hasId = (game: Game) => game.id === gameId;
  const selectedGame = games.find(hasId);

  return selectedGame?.name ?? gameId;
}
