import { stubGamesInteractor } from './games.harness';
import { presentGames } from './presenter';

describe('presentGames', () => {
  it('maps upcoming counts into row labels', () => {
    const model = presentGames({
      interactor: stubGamesInteractor({
        upcomingCount: (gameId) => (gameId === 'lol' ? 3 : 0),
      }),
      now: 0,
    });

    expect(model.rows).toEqual([
      {
        id: 'lol',
        name: 'League of Legends',
        shortName: 'LoL',
        upcomingLabel: '3 upcoming',
        accessibilityLabel: 'League of Legends, 3 upcoming',
      },
      {
        id: 'cs2',
        name: 'Counter-Strike 2',
        shortName: 'CS2',
        upcomingLabel: 'No upcoming matches',
        accessibilityLabel: 'Counter-Strike 2, no upcoming matches',
      },
    ]);
  });
});
