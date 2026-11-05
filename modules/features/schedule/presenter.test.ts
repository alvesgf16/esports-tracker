import {
  aMatch,
  FIXED_NOW,
  stubGameCatalog,
  stubMatchCatalog,
  TEST_TIME_ZONE,
} from './schedule.harness';
import { presentSchedule } from './presenter';

function present(
  overrides: Partial<Parameters<typeof presentSchedule>[0]> = {}
) {
  return presentSchedule({
    games: stubGameCatalog(),
    matches: stubMatchCatalog(),
    now: FIXED_NOW,
    timeZone: TEST_TIME_ZONE,
    gameParam: undefined,
    ...overrides,
  });
}

function presentedCard(match: ReturnType<typeof aMatch>) {
  return present({
    matches: stubMatchCatalog({ list: () => [match] }),
    gameParam: 'all',
  }).groups[0].matches[0];
}

describe('presentSchedule', () => {
  it('defaults an invalid game param to all', () => {
    const model = present({ gameParam: 'chess' });

    expect(model.selected).toBe('all');
  });

  it('builds chips from the game catalog', () => {
    const model = present();

    expect(model.chips).toEqual([
      { id: 'all', label: 'All' },
      { id: 'lol', label: 'LoL' },
    ]);
  });

  it('maps a live match into card labels', () => {
    const card = presentedCard(
      aMatch({
        id: 'live-1',
        startsAt: new Date(FIXED_NOW).toISOString(),
      })
    );

    expect(card).toMatchObject({
      id: 'live-1',
      kickoffLabel: 'LIVE',
      countdownLabel: '',
      isLive: true,
      teamA: 'Alpha',
      teamB: 'Beta',
      meta: 'LoL · LEC · Spring · Bo3',
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

  it('uses the filtered empty copy when a game is selected', () => {
    const model = present({ gameParam: 'lol' });

    expect(model.emptyMessage).toBe('No upcoming League of Legends matches.');
  });
});
