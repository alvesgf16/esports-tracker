import type { Game } from '@/data/games';

import type { GameRowModel, GamesViewModel } from './contracts';
import type { GamesInteractor } from './interactor';

type PresentInput = {
  interactor: GamesInteractor;
  now: number;
};

export function presentGames(input: PresentInput): GamesViewModel {
  return {
    rows: input.interactor
      .listGames()
      .map((game) => presentRow(game, input.interactor, input.now)),
  };
}

function presentRow(
  game: Game,
  interactor: GamesInteractor,
  now: number
): GameRowModel {
  const count = interactor.upcomingCount(game.id, now);
  const upcomingLabel =
    count === 0 ? 'No upcoming matches' : `${count} upcoming`;
  return {
    id: game.id,
    name: game.name,
    shortName: game.shortName,
    upcomingLabel,
    accessibilityLabel: `${game.name}, ${upcomingLabel.toLowerCase()}`,
  };
}
