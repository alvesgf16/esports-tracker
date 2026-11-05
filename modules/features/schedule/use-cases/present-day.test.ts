import type { ScheduleBoardState } from '@/lib/schedule-board';
import type { Match } from '@/modules/shared/entities';

import {
  aMatch,
  FIXED_NOW,
  stubGameCatalog,
  stubMatchCatalog,
  TEST_TIME_ZONE,
} from '../schedule.harness';
import { presentDay } from './present-day';

const context = {
  board: {
    games: stubGameCatalog(),
    matches: stubMatchCatalog(),
    notice: null,
    ready: true,
  } satisfies ScheduleBoardState,
  now: FIXED_NOW,
  timeZone: TEST_TIME_ZONE,
};

function presentedCard(match: Match) {
  return presentDay(
    { key: '2026-03-15', label: 'Today', matches: [match] },
    context
  ).matches[0];
}

describe('presentDay', () => {
  it('keeps the day key and label', () => {
    const section = presentDay(
      { key: '2026-03-16', label: 'Tomorrow', matches: [] },
      context
    );

    expect(section).toEqual({
      key: '2026-03-16',
      label: 'Tomorrow',
      matches: [],
    });
  });

  it('maps a live match into card labels', () => {
    const card = presentedCard(
      aMatch({
        id: 'live-1',
        startsAt: new Date(FIXED_NOW).toISOString(),
      })
    );

    expect(card).toEqual({
      id: 'live-1',
      kickoffLabel: 'LIVE',
      countdownLabel: '',
      isLive: true,
      teamA: 'Alpha',
      teamB: 'Beta',
      meta: 'LoL · LEC · Spring · Bo3',
    });
  });

  it('maps an upcoming match into kickoff and countdown', () => {
    const card = presentedCard(aMatch({ id: 'soon-1' }));

    expect(card).toMatchObject({
      id: 'soon-1',
      kickoffLabel: '2:00 PM',
      countdownLabel: '2h',
      isLive: false,
    });
  });

  it('maps a lobby match into name and team count', () => {
    const card = presentedCard(
      aMatch({
        id: 'lobby-1',
        name: 'Group A — Match 3',
        tournament: 'PGS · Global Series',
        format: 'Maps',
        teams: [
          { name: 'Alpha', shortName: 'ALP' },
          { name: 'Beta', shortName: 'BET' },
          { name: 'Gamma', shortName: 'GAM' },
        ],
      })
    );

    expect(card).toMatchObject({
      teamA: 'Group A — Match 3',
      teamB: '3 teams',
      meta: 'LoL · PGS · Global Series · Maps',
    });
  });
});
