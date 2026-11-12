import { FIXED_NOW } from '@/modules/shared/shared.harness';

import { stubGameCatalog } from '../games.harness';
import { gameRows } from './game-rows';

describe('gameRows', () => {
  it('opens the schedule for the pressed game', () => {
    const openSchedule = jest.fn();
    const rows = gameRows(
      stubGameCatalog().list(),
      { matches: [], referenceTime: FIXED_NOW },
      openSchedule
    );

    rows[1].onPress();

    expect(rows.map((row) => row.id)).toEqual(['lol', 'cs2']);
    expect(openSchedule).toHaveBeenCalledWith('cs2');
  });
});
