import { cachedLiveSchedule } from './cached-schedule';
import type { LiveScheduleResult } from './schedule-result';

const unconfigured: LiveScheduleResult = { status: 'unconfigured' };
const failed: LiveScheduleResult = { status: 'error', message: 'network' };

describe('cachedLiveSchedule', () => {
  it('reuses a successful result', async () => {
    const load = jest.fn().mockResolvedValue(unconfigured);
    const cached = cachedLiveSchedule(load);

    await expect(cached()).resolves.toBe(unconfigured);
    await expect(cached()).resolves.toBe(unconfigured);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('shares an in-flight load', async () => {
    const { promise, resolve } = deferred(unconfigured);
    const load = jest.fn().mockReturnValue(promise);
    const cached = cachedLiveSchedule(load);
    const first = cached();
    const second = cached();

    resolve();

    await expect(first).resolves.toBe(unconfigured);
    await expect(second).resolves.toBe(unconfigured);
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('retries after an error', async () => {
    const load = jest
      .fn()
      .mockResolvedValueOnce(failed)
      .mockResolvedValueOnce(unconfigured);
    const cached = cachedLiveSchedule(load);

    await expect(cached()).resolves.toBe(failed);
    await expect(cached()).resolves.toBe(unconfigured);
    expect(load).toHaveBeenCalledTimes(2);
  });
});

function deferred(result: LiveScheduleResult) {
  let resolve = () => {};
  const promise = new Promise<LiveScheduleResult>((next) => {
    resolve = () => next(result);
  });

  return { promise, resolve };
}
