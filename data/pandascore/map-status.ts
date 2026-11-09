import type { MatchStatus } from '@/modules/shared/entities';

const FINISHED = new Set(['finished', 'canceled', 'postponed']);

export function mapStatus(status: string): MatchStatus | undefined {
  if (status === 'running') {
    return 'running';
  }

  if (status === 'not_started') {
    return 'not_started';
  }

  if (FINISHED.has(status)) {
    return 'finished';
  }

  return undefined;
}
