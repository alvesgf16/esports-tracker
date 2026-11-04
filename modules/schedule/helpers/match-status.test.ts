import { FIXED_NOW, hoursFromNow } from '../schedule.harness';
import { matchStatus } from './match-status';

describe('matchStatus', () => {
  it('returns live inside the live window after kickoff', () => {
    expect(matchStatus(hoursFromNow(-1), FIXED_NOW)).toBe('live');
  });

  it('returns finished after the live window', () => {
    expect(matchStatus(hoursFromNow(-4), FIXED_NOW)).toBe('finished');
  });

  it('returns soon within an hour before kickoff', () => {
    expect(matchStatus(hoursFromNow(0.5), FIXED_NOW)).toBe('soon');
  });

  it('returns upcoming more than an hour before kickoff', () => {
    expect(matchStatus(hoursFromNow(2), FIXED_NOW)).toBe('upcoming');
  });
});
