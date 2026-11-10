import moment from 'moment-timezone';

import { calendarDay } from './calendar-day';

export function scheduleClock(now: number, timezone: string) {
  return {
    now,
    calendar: calendarDay.forZone(timezone),
    labels: clockLabels(now, timezone),
  };
}

function clockLabels(now: number, timezone: string) {
  return {
    kickoff: (startingTime: string) => formatKickoff(startingTime, timezone),
    countdown: (startingTime: string) => formatCountdown(startingTime, now),
  };
}

/** Wall-clock kickoff in the given IANA zone (bundled tz data, not stale host ICU). */
function formatKickoff(startingTime: string, timezone: string): string {
  return moment.tz(startingTime, timezone).format('h:mm A');
}

function formatCountdown(startingTime: string, now: number): string {
  return formatRemaining(Math.max(0, new Date(startingTime).getTime() - now));
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

  return hours < 24
    ? formatHours(hours, totalMinutes % 60)
    : `${Math.floor(hours / 24)}d`;
}

function formatHours(hours: number, minutes: number): string {
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}
