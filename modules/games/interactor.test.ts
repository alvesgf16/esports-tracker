import { scheduleInteractor } from '@/modules/schedule/interactor';

import { gamesInteractor } from './interactor';

describe('gamesInteractor', () => {
  it('counts upcoming matches through the schedule interactor', () => {
    const now = Date.now();

    expect(gamesInteractor.upcomingCount('lol', now)).toBe(
      scheduleInteractor.visibleMatches('lol', now).length
    );
  });

  it('lists the catalog games', () => {
    expect(gamesInteractor.listGames().map((game) => game.id)).toContain('lol');
  });
});
