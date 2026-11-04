import type { Game } from './entities';

import type { GamesInteractor } from './interactor';

const sampleGames: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
];

export function stubGamesInteractor(
  overrides: Partial<GamesInteractor> = {}
): GamesInteractor {
  return {
    listGames: () => sampleGames,
    upcomingCount: () => 0,
    ...overrides,
  };
}
