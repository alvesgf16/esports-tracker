import type { Game } from '@/modules/shared/entities';

import type { ChipModel } from '../contracts';

export function presentChips(games: Game[]): ChipModel[] {
  return [
    { id: 'all', label: 'All' },
    ...games.map((game) => ({
      id: game.id,
      label: game.shortName,
    })),
  ];
}
