/** Offset from the current hour, used only by sample match data. */
export function sampleKickoff(hoursAhead: number, extraMinutes = 0): string {
  const date = new Date();

  date.setMinutes(0, 0, 0);
  date.setHours(date.getHours() + hoursAhead);
  date.setMinutes(extraMinutes);

  return date.toISOString();
}
