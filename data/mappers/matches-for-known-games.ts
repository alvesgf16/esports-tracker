import type { Game, Match } from '@/modules/shared/entities';

export function matchesForKnownGames(games: Game[], matches: Match[]): Match[] {
  const toId = (game: Game) => game.id;
  const gameIds = new Set(games.map(toId));
  const isOfKnownGame = (match: Match) => gameIds.has(match.game);

  return matches.filter(isOfKnownGame);
}
