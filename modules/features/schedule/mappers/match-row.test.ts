import type { Match } from '@/modules/shared/entities';
import { aMatch, FIXED_NOW } from '@/modules/shared/shared.harness';

import type { MatchRowModel } from '../contracts';
import { stubGameCatalog, stubScheduleClock } from '../schedule.harness';
import { matchRow } from './match-row';

function presentedRow(match: Match): MatchRowModel {
  const clock = stubScheduleClock();

  return matchRow(match, {
    games: stubGameCatalog(),
    now: clock.now,
    labels: clock.labels,
  });
}

describe('matchRow', () => {
  it('maps a live match into LIVE without a countdown', () => {
    const row = presentedRow(
      aMatch({
        id: 'live-1',
        startsAt: new Date(FIXED_NOW).toISOString(),
      })
    );

    expect(row).toEqual({
      id: 'live-1',
      kickoffLabel: 'LIVE',
      countdownLabel: '',
      isLive: true,
      left: 'Alpha',
      right: 'Beta',
      meta: 'LoL · LEC · Spring · Bo3',
    });
  });

  it('maps an upcoming match into kickoff and countdown', () => {
    const match = aMatch({ id: 'soon-1' });
    const row = presentedRow(match);

    expect(row).toMatchObject({
      id: 'soon-1',
      kickoffLabel: `kickoff:${match.startsAt}`,
      countdownLabel: `countdown:${match.startsAt}`,
      isLive: false,
    });
  });

  it('maps a finished match into kickoff and FT', () => {
    const match = aMatch({
      id: 'finished-1',
      startsAt: new Date(FIXED_NOW - 60_000).toISOString(),
      status: 'finished',
    });
    const row = presentedRow(match);

    expect(row).toMatchObject({
      id: 'finished-1',
      kickoffLabel: `kickoff:${match.startsAt}`,
      countdownLabel: 'FT',
      isLive: false,
    });
  });

  it('maps a lobby match into name and team count', () => {
    const row = presentedRow(
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

    expect(row).toMatchObject({
      left: 'Group A — Match 3',
      right: '3 teams',
      meta: 'LoL · PGS · Global Series · Maps',
    });
  });
});
