import { stubGameCatalog } from '../schedule.harness';
import { presentChips } from './present-chips';

describe('presentChips', () => {
  it('puts All ahead of catalog short names', () => {
    expect(presentChips(stubGameCatalog().list())).toEqual([
      { id: 'all', label: 'All' },
      { id: 'lol', label: 'LoL' },
    ]);
  });
});
