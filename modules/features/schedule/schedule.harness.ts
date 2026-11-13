import { calendarDay } from '@/lib/clock/calendar-day';
import type { Game, Match } from '@/modules/shared/entities';
import type { GameCatalog, MatchCatalog } from '@/modules/shared/gateways';
import {
  aGameCatalog,
  aMatch,
  FIXED_NOW,
  hoursFromNow,
  TEST_TIME_ZONE,
} from '@/modules/shared/shared.harness';

import type { DayCalendar, ScheduleClock } from './contracts';

const lol: Game = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

const cs2: Game = {
  id: 'cs2',
  name: 'Counter-Strike 2',
  shortName: 'CS2',
};

export function stubGameCatalog(
  overrides: Partial<GameCatalog> = {}
): GameCatalog {
  return { ...aGameCatalog([lol]), ...overrides };
}

export function mixedGameCatalog(): GameCatalog {
  return aGameCatalog([lol, cs2]);
}

export function stubMatchCatalog(
  overrides: Partial<MatchCatalog> = {}
): MatchCatalog {
  return { list: () => [], ...overrides };
}

export function todayAndTomorrowMatches(): Match[] {
  return [
    aMatch({ id: 'today', startsAt: hoursFromNow(2) }),
    aMatch({ id: 'tomorrow', startsAt: hoursFromNow(26) }),
  ];
}

function stubDayCalendar(timezone = TEST_TIME_ZONE): DayCalendar {
  return calendarDay.forZone(timezone);
}

export function stubScheduleClock(
  overrides: Partial<ScheduleClock> = {}
): ScheduleClock {
  return {
    now: FIXED_NOW,
    calendar: stubDayCalendar(),
    labels: {
      kickoff: (startingTime) => `kickoff:${startingTime}`,
      countdown: (startingTime) => `countdown:${startingTime}`,
    },
    ...overrides,
  };
}
