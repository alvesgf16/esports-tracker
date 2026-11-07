import { G2_VS_FNC } from './live.harness';
import { parseMatch } from './parse-match';

describe('parseMatch', () => {
  it('maps a complete match', () => {
    expect(parseMatch(G2_VS_FNC)).toEqual(G2_VS_FNC);
  });

  it('keeps a valid progress value', () => {
    const match = { ...G2_VS_FNC, progress: 'running' };

    expect(parseMatch(match)).toEqual(match);
  });

  it('rejects a non-object', () => {
    expect(parseMatch([])).toBeNull();
  });

  it('rejects a blank kickoff', () => {
    expect(parseMatch({ ...G2_VS_FNC, startsAt: '  ' })).toBeNull();
  });

  it('rejects an incomplete team', () => {
    expect(
      parseMatch({ ...G2_VS_FNC, teams: [{ name: 'G2 Esports' }] })
    ).toBeNull();
  });

  it('rejects unknown progress', () => {
    expect(parseMatch({ ...G2_VS_FNC, progress: 'canceled' })).toBeNull();
  });
});
