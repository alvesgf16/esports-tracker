import { FIXED_NOW } from '@/modules/shared/shared.harness';

import { statusFilterBoard } from '../schedule.harness';
import { countLiveMatches } from './count-live-matches';

describe('countLiveMatches', () => {
  it('counts only live rows', () => {
    expect(countLiveMatches(statusFilterBoard(), FIXED_NOW)).toBe(1);
  });
});
