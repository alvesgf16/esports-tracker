import { aMatch } from '@/modules/shared/shared.harness';

import { stubScheduleClock } from '../schedule.harness';
import { matchDays } from './match-days';

describe('matchDays', () => {
  it('keeps the day label on the section', () => {
    const groups = matchDays([aMatch()], stubScheduleClock());

    expect(groups[0].label).toBe('Today');
  });
});
