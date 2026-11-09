import type { Match } from '@/modules/shared/entities';
import { aMatch, FIXED_NOW } from '@/modules/shared/shared.harness';

import type { MatchCardModel } from '../contracts';
import { stubGameCatalog, stubScheduleClock } from '../schedule.harness';
import { matchDays } from './match-days';

function presentedCard(match: Match): MatchCardModel {
  return matchDays([match], stubGameCatalog(), stubScheduleClock())[0]
    .matches[0];
}

describe('matchDays', () => {
  it('keeps the day label on the section', () => {
    const groups = matchDays(
      [aMatch()],
      stubGameCatalog(),
      stubScheduleClock()
    );

    expect(groups[0].label).toBe('Today');
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
      left: 'Alpha',
      right: 'Beta',
      meta: 'LoL · LEC · Spring · Bo3',
    });
  });

  it('maps an upcoming match into kickoff and countdown', () => {
    const match = aMatch({ id: 'soon-1' });
    const card = presentedCard(match);

    expect(card).toMatchObject({
      id: 'soon-1',
      kickoffLabel: `kickoff:${match.startsAt}`,
      countdownLabel: `countdown:${match.startsAt}`,
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
      left: 'Group A — Match 3',
      right: '3 teams',
      meta: 'LoL · PGS · Global Series · Maps',
    });
  });
});
