import type { MatchStatus } from './match-status';

export function formatKickoff(startsAt: string): string {
  return new Date(startsAt).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatCountdown(
  startsAt: string,
  now: number,
  status: MatchStatus
): string {
  if (status === 'live') {
    return 'LIVE';
  }
  return formatRemaining(Math.max(0, new Date(startsAt).getTime() - now));
}

function formatRemaining(deltaMs: number): string {
  const totalMinutes = Math.round(deltaMs / 60000);
  if (totalMinutes < 1) {
    return 'Starting';
  }
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  return formatHoursOrDays(totalMinutes);
}

function formatHoursOrDays(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  if (hours < 24) {
    return formatHours(hours, totalMinutes % 60);
  }
  return `${Math.floor(hours / 24)}d`;
}

function formatHours(hours: number, minutes: number): string {
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}
