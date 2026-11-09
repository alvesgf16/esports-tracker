import { stubGameCatalog } from '../schedule.harness';
import { emptyMessage } from './empty-message';

const games = stubGameCatalog().list();

describe('emptyMessage', () => {
  it('uses the unfiltered copy for all', () => {
    expect(emptyMessage('all', games)).toBe('No upcoming matches.');
  });

  it('names the selected game', () => {
    expect(emptyMessage('lol', games)).toBe(
      'No upcoming League of Legends matches.'
    );
  });
});
