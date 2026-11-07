import { calendarDay } from '@/lib/calendar-day';
import type { Game } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';
import {
  aGameCatalog,
  FIXED_NOW,
  TEST_TIME_ZONE,
} from '@/modules/shared/shared.harness';

import type { ScheduleClock } from './contracts';

const lol: Game = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return { ...aGameCatalog([lol]), ...overrides };
}

export function stubMatchCatalog(
  overrides: Partial<MatchCatalog> = {}
): MatchCatalog {
  return { list: () => [], ...overrides };
}

export function stubDayCalendar(timeZone = TEST_TIME_ZONE) {
  return calendarDay.forZone(timeZone);
}

export function stubScheduleClock(
  overrides: Partial<ScheduleClock> = {}
): ScheduleClock {
  return {
    now: FIXED_NOW,
    calendar: stubDayCalendar(),
    labels: {
      kickoff: (startsAt) => `kickoff:${startsAt}`,
      countdown: (startsAt) => `countdown:${startsAt}`,
    },
    ...overrides,
  };
}
