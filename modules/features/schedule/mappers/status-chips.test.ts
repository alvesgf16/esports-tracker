import { statusChips } from './status-chips';

describe('statusChips', () => {
  it('lists All, Live with count, and Upcoming', () => {
    const setStatusFilter = jest.fn();
    const chips = statusChips(3, setStatusFilter);

    expect(chips.map(({ id, label }) => ({ id, label }))).toEqual([
      { id: 'all', label: 'All' },
      { id: 'live', label: 'Live (3)' },
      { id: 'upcoming', label: 'Upcoming' },
    ]);

    chips[0].onPress();
    chips[1].onPress();
    chips[2].onPress();

    expect(setStatusFilter).toHaveBeenCalledWith('all');
    expect(setStatusFilter).toHaveBeenCalledWith('live');
    expect(setStatusFilter).toHaveBeenCalledWith('upcoming');
  });
});
