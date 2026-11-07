import type { Match } from '@/modules/shared/entities';
import { aMatch, FIXED_NOW } from '@/modules/shared/shared.harness';

import type { MatchCardModel } from '../contracts';
import { stubGameCatalog, stubScheduleClock } from '../schedule.harness';
import { presentGroups } from './present-groups';

function presentedCard(match: Match): MatchCardModel {
  return presentGroups([match], stubGameCatalog(), stubScheduleClock())[0]
    .matches[0];
}

describe('presentGroups', () => {
  it('keeps the day label on the section', () => {
    const groups = presentGroups(
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
      teamA: 'Alpha',
      teamB: 'Beta',
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
      teamA: 'Group A — Match 3',
      teamB: '3 teams',
      meta: 'LoL · PGS · Global Series · Maps',
    });
  });
});
