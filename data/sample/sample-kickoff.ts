/** Offset from the current hour, used only by sample match data. */
export function sampleKickoff(hoursAhead: number, extraMinutes = 0): string {
  const date = new Date();

  date.setMinutes(0, 0, 0);
  date.setHours(date.getHours() + hoursAhead);
  date.setMinutes(extraMinutes);

  return date.toISOString();
}

/** Exact offset from now — keeps soon/live samples stable across the hour. */
export function sampleMinutesFromNow(minutesAhead: number): string {
  return new Date(Date.now() + minutesAhead * 60_000).toISOString();
}
