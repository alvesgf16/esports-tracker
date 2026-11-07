import { scheduleGameRoute } from './schedule-game-route';

describe('scheduleGameRoute', () => {
  it('builds a schedule href with the shared game param', () => {
    expect(scheduleGameRoute.href('lol')).toEqual({
      pathname: '/',
      params: { game: 'lol' },
    });
  });
});
