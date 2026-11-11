import type { Team } from '@/modules/shared/entities';

import { hasTeamId } from './has-team-id';

const TEAMS: Team[] = [
  { id: 'g2', name: 'G2 Esports', shortName: 'G2' },
  { id: 'fnc', name: 'Fnatic', shortName: 'FNC' },
];

describe('hasTeamId', () => {
  it('is true when a team has the id', () => {
    expect(hasTeamId('g2', TEAMS)).toBe(true);
  });

  it('is false when no team has the id', () => {
    expect(hasTeamId('someone-else', TEAMS)).toBe(false);
  });

  it('is false when the id is missing', () => {
    expect(hasTeamId(undefined, TEAMS)).toBe(false);
  });
});
