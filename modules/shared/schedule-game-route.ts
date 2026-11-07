import type { GameId } from './entities';

const pathname = '/' as const;
const param = 'game' as const;

export const scheduleGameRoute = {
  pathname,
  param,
  href(gameId: GameId) {
    return {
      pathname,
      params: { [param]: gameId },
    };
  },
};
