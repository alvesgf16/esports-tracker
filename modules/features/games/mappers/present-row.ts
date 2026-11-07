import type { Game, Match } from '@/modules/shared/entities';

import type { GameRowModel } from '../contracts';
import { upcomingCount } from '../use-cases/upcoming-count';

export function presentRow(
  game: Game,
  matches: Match[],
  now: number
): GameRowModel {
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
