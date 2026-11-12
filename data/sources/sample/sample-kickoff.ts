/** Kickoff times for sample fixtures. */
export const sampleKickoff = {
  onTheHour(hoursAhead: number, extraMinutes = 0): string {
    const date = new Date();

    date.setMinutes(0, 0, 0);
    date.setHours(date.getHours() + hoursAhead);
    date.setMinutes(extraMinutes);

    return date.toISOString();
  },
  minutesFromNow(minutesAhead: number): string {
    return new Date(Date.now() + minutesAhead * 60_000).toISOString();
  },
};
