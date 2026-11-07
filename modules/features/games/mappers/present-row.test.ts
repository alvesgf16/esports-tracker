import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/shared/shared.harness';

import { stubGameCatalog } from '../games.harness';
import { presentRow } from './present-row';

const lol = stubGameCatalog().get('lol');

describe('presentRow', () => {
  it('labels a game with upcoming matches', () => {
    const matches = [
      aMatch({ id: '1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: '2', game: 'lol', startsAt: hoursFromNow(4) }),
    ];

    expect(presentRow(lol, matches, FIXED_NOW)).toEqual({
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      upcomingLabel: '2 upcoming',
      accessibilityLabel: 'League of Legends, 2 upcoming',
    });
  });

  it('labels a game with no upcoming matches', () => {
    expect(presentRow(lol, [], FIXED_NOW)).toEqual({
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      upcomingLabel: 'No upcoming matches',
      accessibilityLabel: 'League of Legends, no upcoming matches',
    });
  });
});
