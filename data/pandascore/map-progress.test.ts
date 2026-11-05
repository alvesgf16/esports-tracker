import { mapProgress } from './map-progress';

describe('mapProgress', () => {
  it('returns running for live vendor status', () => {
    expect(mapProgress('running')).toBe('running');
  });

  it('returns not_started before kickoff', () => {
    expect(mapProgress('not_started')).toBe('not_started');
  });

  it('returns finished for finished, canceled, and postponed', () => {
    expect(mapProgress('finished')).toBe('finished');
    expect(mapProgress('canceled')).toBe('finished');
    expect(mapProgress('postponed')).toBe('finished');
  });

  it('returns undefined for an unknown status', () => {
    expect(mapProgress('unknown')).toBeUndefined();
  });
});
