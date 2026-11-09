import { stubGameCatalog } from '../schedule.harness';
import { gameChips } from './game-chips';

describe('gameChips', () => {
  it('puts All ahead of catalog short names', () => {
    const setGameFilter = jest.fn();
    const chips = gameChips(stubGameCatalog().list(), setGameFilter);

    expect(chips.map(({ id, label }) => ({ id, label }))).toEqual([
      { id: 'all', label: 'All' },
      { id: 'lol', label: 'LoL' },
    ]);

    chips[0].onPress();
    chips[1].onPress();

    expect(setGameFilter).toHaveBeenCalledWith('all');
    expect(setGameFilter).toHaveBeenCalledWith('lol');
  });
});
