import { G2_VS_FNC } from '../live.harness';
import { toMatch } from './to-match';

describe('toMatch', () => {
  it('maps a complete match', () => {
    expect(toMatch(G2_VS_FNC)).toEqual(G2_VS_FNC);
  });

  it('keeps a valid status value', () => {
    const match = { ...G2_VS_FNC, status: 'running' };

    const parsed = toMatch(match);

    expect(parsed).toEqual(match);
  });

  it('rejects a non-object', () => {
    expect(toMatch([])).toBeNull();
  });

  it('rejects a blank kickoff', () => {
    expect(toMatch({ ...G2_VS_FNC, startsAt: '  ' })).toBeNull();
  });

  it('rejects an incomplete team', () => {
    const match = { ...G2_VS_FNC, teams: [{ name: 'G2 Esports' }] };

    const parsed = toMatch(match);

    expect(parsed).toBeNull();
  });

  it('rejects unknown status', () => {
    expect(toMatch({ ...G2_VS_FNC, status: 'canceled' })).toBeNull();
  });
});
