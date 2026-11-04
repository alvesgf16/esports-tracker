import type { MatchProgress } from '@/modules/schedule/entities';

const FINISHED = new Set(['finished', 'canceled', 'postponed']);

export function mapProgress(status: string): MatchProgress | undefined {
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
