import type { ScheduleLoadError } from '@/modules/shared/gateways';

export function scheduleError(error: unknown): ScheduleLoadError {
  return {
    status: 'error',
    message: errorMessage(error),
  };
}

function errorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return trimmedMessage(error);
  }

  if (error instanceof Error) {
    return trimmedMessage(error.message);
  }

  return 'Failed to load schedule';
}

function trimmedMessage(value: string): string {
  return value.trim() || 'Failed to load schedule';
}
