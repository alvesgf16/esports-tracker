// Exported and closed over by href so Games and Schedule share one path and query key.
const pathname = '/' as const;
const param = 'game' as const;

export const scheduleGameRoute = {
  pathname,
  param,
  href(gameId: string) {
    return {
      pathname,
      params: { [param]: gameId },
    };
  },
};
