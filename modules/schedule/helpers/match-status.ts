export type MatchStatus = 'live' | 'soon' | 'upcoming' | 'finished';

const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const SOON_WINDOW_MS = 60 * 60 * 1000;

export function matchStatus(startsAt: string, now = Date.now()): MatchStatus {
  const start = new Date(startsAt).getTime();
  const delta = start - now;

  if (delta <= 0 && -delta < LIVE_WINDOW_MS) {
    return 'live';
  }

  if (delta <= 0) {
    return 'finished';
  }

  if (delta <= SOON_WINDOW_MS) {
    return 'soon';
  }

  return 'upcoming';
}
