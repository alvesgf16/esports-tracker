import { getCalendars } from 'expo-localization';

import { deviceTimeZone } from './device-time-zone';

jest.mock('expo-localization', () => ({
  getCalendars: jest.fn(),
}));

describe('deviceTimeZone', () => {
  const calendars = jest.mocked(getCalendars);
  const previousZone = process.env.EXPO_PUBLIC_TIMEZONE;

  afterEach(() => {
    calendars.mockReset();
    restoreEnv('EXPO_PUBLIC_TIMEZONE', previousZone);
    jest.restoreAllMocks();
  });

  it('prefers the device calendar zone', () => {
    calendars.mockReturnValue([{ timeZone: 'America/Edmonton' }] as never);

    expect(deviceTimeZone()).toBe('America/Edmonton');
  });

  it('falls back to Intl when the calendar has no zone', () => {
    calendars.mockReturnValue([{ timeZone: '' }] as never);
    stubIntlZone('Europe/Paris');

    expect(deviceTimeZone()).toBe('Europe/Paris');
  });

  it('falls back to EXPO_PUBLIC_TIMEZONE when calendar and Intl are empty', () => {
    calendars.mockImplementation(() => {
      throw new Error('unavailable');
    });
    stubIntlZone('');
    process.env.EXPO_PUBLIC_TIMEZONE = 'America/Sao_Paulo';

    expect(deviceTimeZone()).toBe('America/Sao_Paulo');
  });

  it('falls back to UTC when nothing else resolves', () => {
    calendars.mockReturnValue([{ timeZone: '' }] as never);
    stubIntlZone('');
    restoreEnv('EXPO_PUBLIC_TIMEZONE', undefined);

    expect(deviceTimeZone()).toBe('UTC');
  });
});

function stubIntlZone(timezone: string): void {
  jest.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
    resolvedOptions: () => ({ timeZone: timezone }),
  } as never);
}

function restoreEnv(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name];

    return;
  }

  process.env[name] = value;
}
