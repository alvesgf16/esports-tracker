import type { Game } from '@/modules/shared/entities';

import type { GameFilter } from '../contracts';
import { gameName } from '../use-cases/game-name';

export function presentEmptyMessage(
  selected: GameFilter,
  games: Game[]
): string {
  if (selected === 'all') {
    return 'No upcoming matches.';
  }

  return `No upcoming ${gameName(selected, games)} matches.`;
}
