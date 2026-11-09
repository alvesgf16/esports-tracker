import type { MatchStatus } from '../entities';

type MatchDisplayStatus = 'live' | 'soon' | 'upcoming' | 'finished';

const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const SOON_WINDOW_MS = 60 * 60 * 1000;

export function matchDisplayStatus(
  startsAt: string,
  now: number,
  status?: MatchStatus
): MatchDisplayStatus {
  if (status === 'running') {
    return 'live';
  }

  if (status === 'finished') {
    return 'finished';
  }

  const delta = new Date(startsAt).getTime() - now;

  if (delta > 0) {
    return upcomingStatus(delta);
  }

  return elapsedStatus(delta);
}

function upcomingStatus(delta: number): MatchDisplayStatus {
  if (delta <= SOON_WINDOW_MS) {
    return 'soon';
  }

  return 'upcoming';
}

function elapsedStatus(delta: number): MatchDisplayStatus {
  if (-delta < LIVE_WINDOW_MS) {
    return 'live';
  }

  return 'finished';
}
