import type { Match } from '@/modules/shared/entities';

import { matchCatalog } from './match-catalog';

const match: Match = {
  id: '1',
  game: 'lol',
  name: 'Alpha vs Beta',
  tournament: 'LEC · Spring',
  format: 'Bo3',
  startsAt: '2026-03-15T14:00:00.000Z',
  teams: [
    { id: 'alpha', name: 'Alpha', shortName: 'ALP' },
    { id: 'beta', name: 'Beta', shortName: 'BET' },
  ],
};

describe('matchCatalog', () => {
  it('lists the given matches', () => {
    expect(matchCatalog([match]).list()).toEqual([match]);
  });
});
