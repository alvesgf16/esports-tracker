import {
  aMatch,
  FIXED_NOW,
  stubGameCatalog,
  stubMatchCatalog,
} from './schedule.harness';
import { presentSchedule } from './presenter';

describe('presentSchedule', () => {
  it('defaults an invalid game param to all', () => {
    const model = presentSchedule({
      games: stubGameCatalog(),
      matches: stubMatchCatalog(),
      now: FIXED_NOW,
      gameParam: 'chess',
    });

    expect(model.selected).toBe('all');
  });

  it('builds chips from the game catalog', () => {
    const model = presentSchedule({
      games: stubGameCatalog(),
      matches: stubMatchCatalog(),
      now: FIXED_NOW,
      gameParam: undefined,
    });

    expect(model.chips).toEqual([
      { id: 'all', label: 'All' },
      { id: 'lol', label: 'LoL' },
    ]);
  });

  it('maps a live match into card labels', () => {
    const match = aMatch({
      id: 'live-1',
      startsAt: new Date(FIXED_NOW).toISOString(),
    });
    const model = presentSchedule({
      games: stubGameCatalog(),
      matches: stubMatchCatalog({ list: () => [match] }),
      now: FIXED_NOW,
      gameParam: 'all',
    });

    expect(model.groups[0].matches[0]).toMatchObject({
      id: 'live-1',
      kickoffLabel: 'LIVE',
      countdownLabel: 'LIVE',
      isLive: true,
      teamA: 'Alpha',
      teamB: 'Beta',
      meta: 'LoL · LEC · Spring · Bo3',
    });
  });

  it('maps a lobby match into name and team count', () => {
    const match = aMatch({
      id: 'lobby-1',
      name: 'Group A — Match 3',
      tournament: 'PGS · Global Series',
      format: 'Maps',
      teams: [
        { name: 'Alpha', shortName: 'ALP' },
        { name: 'Beta', shortName: 'BET' },
        { name: 'Gamma', shortName: 'GAM' },
      ],
    });
    const model = presentSchedule({
      games: stubGameCatalog(),
      matches: stubMatchCatalog({ list: () => [match] }),
      now: FIXED_NOW,
      gameParam: 'all',
    });

    expect(model.groups[0].matches[0]).toMatchObject({
      teamA: 'Group A — Match 3',
      teamB: '3 teams',
      meta: 'LoL · PGS · Global Series · Maps',
    });
  });

  it('uses the filtered empty copy when a game is selected', () => {
    const model = presentSchedule({
      games: stubGameCatalog(),
      matches: stubMatchCatalog(),
      now: FIXED_NOW,
      gameParam: 'lol',
    });

    expect(model.emptyMessage).toBe('No upcoming League of Legends matches.');
  });
});
