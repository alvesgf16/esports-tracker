import type { Game, Match } from '@/modules/shared/entities';

import { matchesForKnownGames } from './matches-for-known-games';

const LOL: Game = { id: 'lol', name: 'LoL', shortName: 'LoL' };

describe('matchesForKnownGames', () => {
  it('keeps matches whose game is listed', () => {
    const listed = aBoardMatch({ id: 'listed', game: 'lol' });
    const orphan = aBoardMatch({ id: 'orphan', game: 'cs2' });

    expect(matchesForKnownGames([LOL], [listed, orphan])).toEqual([listed]);
  });
});

function aBoardMatch(overrides: Partial<Match>): Match {
  return {
    id: 'm1',
    game: 'lol',
    name: 'Alpha vs Beta',
    tournament: 'LEC · Spring',
    format: 'Bo3',
    startsAt: '2026-03-15T14:00:00.000Z',
    teams: [],
    ...overrides,
  };
}
