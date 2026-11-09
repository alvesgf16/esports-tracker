import { matchDisplayStatus } from './match-display-status';
import { FIXED_NOW, hoursFromNow } from '../shared.harness';

describe('matchDisplayStatus', () => {
  it('returns live inside the live window after kickoff', () => {
    expect(matchDisplayStatus(hoursFromNow(-1), FIXED_NOW)).toBe('live');
  });

  it('returns finished after the live window', () => {
    expect(matchDisplayStatus(hoursFromNow(-4), FIXED_NOW)).toBe('finished');
  });

  it('returns soon within an hour before kickoff', () => {
    expect(matchDisplayStatus(hoursFromNow(0.5), FIXED_NOW)).toBe('soon');
  });

  it('returns upcoming more than an hour before kickoff', () => {
    expect(matchDisplayStatus(hoursFromNow(2), FIXED_NOW)).toBe('upcoming');
  });

  it('returns live when status is running past the live window', () => {
    expect(matchDisplayStatus(hoursFromNow(-4), FIXED_NOW, 'running')).toBe(
      'live'
    );
  });

  it('returns finished when status is finished inside the live window', () => {
    expect(matchDisplayStatus(hoursFromNow(-1), FIXED_NOW, 'finished')).toBe(
      'finished'
    );
  });
});
