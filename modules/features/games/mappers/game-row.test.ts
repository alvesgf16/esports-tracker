import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/shared/shared.harness';

import { stubGameCatalog } from '../games.harness';
import { gameRow } from './game-row';

const lol = stubGameCatalog().get('lol');

describe('gameRow', () => {
  it('labels a game with upcoming matches', () => {
    const matches = [
      aMatch({ id: '1', game: 'lol', startsAt: hoursFromNow(2) }),
      aMatch({ id: '2', game: 'lol', startsAt: hoursFromNow(4) }),
    ];
    const onPress = jest.fn();

    expect(
      gameRow(lol, { matches, referenceTime: FIXED_NOW }, onPress)
    ).toEqual({
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      upcomingLabel: '2 upcoming',
      accessibilityLabel: 'League of Legends, 2 upcoming',
      onPress,
    });
  });

  it('labels a game with no upcoming matches', () => {
    const onPress = jest.fn();

    expect(
      gameRow(lol, { matches: [], referenceTime: FIXED_NOW }, onPress)
    ).toEqual({
      id: 'lol',
      name: 'League of Legends',
      shortName: 'LoL',
      upcomingLabel: 'No upcoming matches',
      accessibilityLabel: 'League of Legends, no upcoming matches',
      onPress,
    });
  });
});
