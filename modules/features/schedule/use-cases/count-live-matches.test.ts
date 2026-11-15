import {
  aMatch,
  FIXED_NOW,
  hoursFromNow,
} from '@/modules/shared/shared.harness';

import { statusFilterBoard } from '../schedule.harness';
import { countLiveMatches } from './count-live-matches';

describe('countLiveMatches', () => {
  it('counts zero, one, and multiple live rows', () => {
    const noneLive = statusFilterBoard().filter((match) => match.id !== 'live');
    const oneLive = statusFilterBoard();
    const twoLive = [
      ...statusFilterBoard(),
      aMatch({
        id: 'live-2',
        startsAt: hoursFromNow(-0.25),
        status: 'running',
      }),
    ];

    expect(countLiveMatches(noneLive, FIXED_NOW)).toBe(0);
    expect(countLiveMatches(oneLive, FIXED_NOW)).toBe(1);
    expect(countLiveMatches(twoLive, FIXED_NOW)).toBe(2);
  });
});
