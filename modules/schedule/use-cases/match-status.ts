import type { MatchProgress } from '../entities';

export type MatchStatus = 'live' | 'soon' | 'upcoming' | 'finished';

const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const SOON_WINDOW_MS = 60 * 60 * 1000;

export function matchStatus(
  startsAt: string,
  now = Date.now(),
  progress?: MatchProgress
): MatchStatus {
  if (progress === 'running') {
    return 'live';
  }

  if (progress === 'finished') {
    return 'finished';
  }

  const delta = new Date(startsAt).getTime() - now;

  if (delta > 0) {
    return upcomingStatus(delta);
  }

  return elapsedStatus(delta);
}

function upcomingStatus(delta: number): MatchStatus {
  if (delta <= SOON_WINDOW_MS) {
    return 'soon';
  }

  return 'upcoming';
}

function elapsedStatus(delta: number): MatchStatus {
  if (-delta < LIVE_WINDOW_MS) {
    return 'live';
  }

  return 'finished';
}
