import { getCalendars } from 'expo-localization';

/** IANA zone for kickoff / day labels. Prefers the device calendar, then Intl, then env. */
export function deviceTimeZone(): string {
  return (
    calendarTimeZone() ??
    intlTimeZone() ??
    process.env.EXPO_PUBLIC_TIMEZONE?.trim() ??
    'UTC'
  );
}

function calendarTimeZone(): string | null {
  try {
    const timeZone = getCalendars()[0]?.timeZone?.trim();

    return timeZone || null;
  } catch {
    return null;
  }
}

function intlTimeZone(): string | null {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone?.trim();

  return timeZone || null;
}
