import moment from 'moment-timezone';

/** Wall-clock kickoff in the given IANA zone (bundled tz data, not stale host ICU). */
export function formatKickoff(startsAt: string, timeZone: string): string {
  return moment.tz(startsAt, timeZone).format('h:mm A');
}

export function formatCountdown(startsAt: string, now: number): string {
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
