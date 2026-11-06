import moment from 'moment-timezone';

const DAY_KEY = 'YYYY-MM-DD';
const DAY_HEADING = 'dddd, MMM D';

export const calendarDay = {
  key(instant: string | number, timeZone: string): string {
    return formatDayKey(instantInZone(instant, timeZone));
  },
  todayKey(now: number, timeZone: string): string {
    return formatDayKey(startOfCalendarDay(now, timeZone));
  },
  tomorrowKey(now: number, timeZone: string): string {
    return formatDayKey(startOfCalendarDay(now, timeZone).add(1, 'day'));
  },
  heading(key: string, timeZone: string): string {
    return parseDayKey(key, timeZone).format(DAY_HEADING);
  },
  forZone(timeZone: string) {
    return {
      key: (instant: string | number) => calendarDay.key(instant, timeZone),
      todayKey: (now: number) => calendarDay.todayKey(now, timeZone),
      tomorrowKey: (now: number) => calendarDay.tomorrowKey(now, timeZone),
      heading: (key: string) => calendarDay.heading(key, timeZone),
    };
  },
};

function formatDayKey(zoned: moment.Moment) {
  return zoned.format(DAY_KEY);
}

function instantInZone(instant: string | number, timeZone: string) {
  return moment.tz(instant, timeZone);
}

function startOfCalendarDay(now: number, timeZone: string) {
  return instantInZone(now, timeZone).startOf('day');
}

function parseDayKey(key: string, timeZone: string) {
  return moment.tz(key, DAY_KEY, timeZone);
}
