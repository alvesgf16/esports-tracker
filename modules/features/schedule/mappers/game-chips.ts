import type { Game } from '@/modules/shared/entities';

import type { ChipModel, GameFilter } from '../contracts';

export function gameChips(
  games: Game[],
  setGameFilter: (game: GameFilter) => void
): ChipModel[] {
  const toGameChip = (game: Game): ChipModel => gameChip(game, setGameFilter);

  return [
    { id: 'all', label: 'All', onPress: () => setGameFilter('all') },
    ...games.map(toGameChip),
  ];
}

function gameChip(
  game: Game,
  setGameFilter: (game: GameFilter) => void
): ChipModel {
  const { id, shortName } = game;

  return {
    id,
    label: shortName,
    onPress: () => setGameFilter(id),
  };
}
