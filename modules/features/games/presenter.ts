import type { Game, Match } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';

import type { GameRowModel, GamesViewModel } from './contracts';
import { upcomingCount } from './use-cases/upcoming-count';

type PresentInput = {
  games: GameCatalog;
  matches: MatchCatalog;
  now: number;
};

export function presentGames(input: PresentInput): GamesViewModel {
  return {
    rows: input.games
      .list()
      .map((game) => presentRow(game, input.matches.list(), input.now)),
  };
}

function presentRow(game: Game, matches: Match[], now: number): GameRowModel {
  const count = upcomingCount(matches, game.id, now);
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
