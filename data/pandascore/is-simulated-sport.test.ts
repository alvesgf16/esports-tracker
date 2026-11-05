import { isSimulatedSport } from './is-simulated-sport';

describe('isSimulatedSport', () => {
  it('returns true for a simulated-sport slug', () => {
    expect(isSimulatedSport('e-soccer')).toBe(true);
  });

  it('returns false for a traditional esports slug', () => {
    expect(isSimulatedSport('league-of-legends')).toBe(false);
  });
});
