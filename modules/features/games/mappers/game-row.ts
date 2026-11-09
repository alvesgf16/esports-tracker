import type { Game, MatchesSnapshot } from '@/modules/shared/entities';

import type { GameRowModel } from '../contracts';
import { countUpcomingMatchesFor } from '../use-cases/count-upcoming-matches-for';

export function gameRow(
  game: Game,
  matchesSnapshot: MatchesSnapshot,
  onPress: () => void
): GameRowModel {
  const { id, name, shortName } = game;

  const upcomingMatchesCount = countUpcomingMatchesFor(id, matchesSnapshot);
  const upcomingLabel =
    upcomingMatchesCount === 0
      ? 'No upcoming matches'
      : `${upcomingMatchesCount} upcoming`;

  return {
    id,
    name,
    shortName,
    upcomingLabel,
    accessibilityLabel: `${game.name}, ${upcomingLabel.toLowerCase()}`,
    onPress,
  };
}
