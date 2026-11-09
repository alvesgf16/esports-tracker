import { mapStatus } from './map-status';

describe('mapStatus', () => {
  it('returns running for live vendor status', () => {
    expect(mapStatus('running')).toBe('running');
  });

  it('returns not_started before kickoff', () => {
    expect(mapStatus('not_started')).toBe('not_started');
  });

  it('returns finished for finished, canceled, and postponed', () => {
    expect(mapStatus('finished')).toBe('finished');
    expect(mapStatus('canceled')).toBe('finished');
    expect(mapStatus('postponed')).toBe('finished');
  });

  it('returns undefined for an unknown status', () => {
    expect(mapStatus('unknown')).toBeUndefined();
  });
});
