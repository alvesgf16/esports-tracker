import { calendarDay } from './calendar-day';
import { formatCountdown } from './format-countdown';
import { formatKickoff } from './format-kickoff';

export function scheduleClock(now: number, timeZone: string) {
  return {
    now,
    calendar: calendarDay.forZone(timeZone),
    labels: clockLabels(now, timeZone),
  };
}

function clockLabels(now: number, timeZone: string) {
  return {
    kickoff: (startsAt: string) => formatKickoff(startsAt, timeZone),
    countdown: (startsAt: string) => formatCountdown(startsAt, now),
  };
}
