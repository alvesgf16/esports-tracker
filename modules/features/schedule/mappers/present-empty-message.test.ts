import { stubGameCatalog } from '../schedule.harness';
import { presentEmptyMessage } from './present-empty-message';

const games = stubGameCatalog().list();

describe('presentEmptyMessage', () => {
  it('uses the unfiltered copy for all', () => {
    expect(presentEmptyMessage('all', games)).toBe('No upcoming matches.');
  });

  it('names the selected game', () => {
    expect(presentEmptyMessage('lol', games)).toBe(
      'No upcoming League of Legends matches.'
    );
  });
});
