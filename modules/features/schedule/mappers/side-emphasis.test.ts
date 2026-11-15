import { sideEmphasis } from './side-emphasis';

const ALPHA = { id: 'alpha', name: 'Alpha', shortName: 'ALP' };

describe('sideEmphasis', () => {
  it('stays undecided without a winner', () => {
    expect(sideEmphasis(ALPHA, undefined)).toBe('undecided');
  });

  it('stays undecided when the side has no team id', () => {
    expect(sideEmphasis({ name: 'Alpha', shortName: 'ALP' }, 'alpha')).toBe(
      'undecided'
    );
  });

  it('marks the winning side', () => {
    expect(sideEmphasis(ALPHA, 'alpha')).toBe('winner');
  });

  it('marks the losing side', () => {
    expect(sideEmphasis(ALPHA, 'beta')).toBe('loser');
  });
});
