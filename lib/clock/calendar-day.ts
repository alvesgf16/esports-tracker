import moment from 'moment-timezone';

const DAY_KEY = 'YYYY-MM-DD';
const DAY_HEADING = 'dddd, MMM D';

export const calendarDay = {
  dayKey(instant: string | number, timezone: string): string {
    return formatDayKey(instantInZone(instant, timezone));
  },
  todayKey(now: number, timezone: string): string {
    return formatDayKey(startOfCalendarDay(now, timezone));
  },
  tomorrowKey(now: number, timezone: string): string {
    return formatDayKey(startOfCalendarDay(now, timezone).add(1, 'day'));
  },
  heading(dayKey: string, timezone: string): string {
    return parseDayKey(dayKey, timezone).format(DAY_HEADING);
  },
  shiftKey(dayKey: string, days: number, timezone: string): string {
    return formatDayKey(parseDayKey(dayKey, timezone).add(days, 'day'));
  },
  forZone(timezone: string) {
    return zoneCalendar(timezone);
  },
};

function formatDayKey(zoned: moment.Moment) {
  return zoned.format(DAY_KEY);
}

function instantInZone(instant: string | number, timezone: string) {
  return moment.tz(instant, timezone);
}

function startOfCalendarDay(now: number, timezone: string) {
  return instantInZone(now, timezone).startOf('day');
}

function parseDayKey(dayKey: string, timezone: string) {
  return moment.tz(dayKey, DAY_KEY, timezone);
}

function zoneCalendar(timezone: string) {
  return {
    dayKey: (instant: string | number) => calendarDay.dayKey(instant, timezone),
    todayKey: (now: number) => calendarDay.todayKey(now, timezone),
    tomorrowKey: (now: number) => calendarDay.tomorrowKey(now, timezone),
    heading: (dayKey: string) => calendarDay.heading(dayKey, timezone),
    shiftKey: (dayKey: string, days: number) =>
      calendarDay.shiftKey(dayKey, days, timezone),
  };
}
