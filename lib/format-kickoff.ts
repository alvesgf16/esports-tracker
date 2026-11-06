import moment from 'moment-timezone';

/** Wall-clock kickoff in the given IANA zone (bundled tz data, not stale host ICU). */
export function formatKickoff(startsAt: string, timeZone: string): string {
  return moment.tz(startsAt, timeZone).format('h:mm A');
}
