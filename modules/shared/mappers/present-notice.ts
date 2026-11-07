import type { ScheduleLoadState } from '../gateways';

export function presentNotice(loadState: ScheduleLoadState): string | null {
  if (loadState.status === 'ok') {
    return null;
  }

  if (loadState.status === 'loading') {
    return 'Loading schedule…';
  }

  if (loadState.status === 'unconfigured') {
    return 'Schedule API is not configured.';
  }

  return loadState.message ?? "Couldn't load schedule.";
}
