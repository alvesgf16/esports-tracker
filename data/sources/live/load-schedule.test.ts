import { LOL, OK_PAYLOAD } from './live.harness';
import { loadLiveSchedule } from './load-schedule';

describe('loadLiveSchedule', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as typeof fetch;
  });

  it('wraps an ok payload in catalogs', async () => {
    stubPayload(OK_PAYLOAD);

    const result = await loadLiveSchedule();

    expect(result).toMatchObject({ status: 'ok' });

    if (result.status === 'ok') {
      expect(result.games.list()).toEqual([LOL]);
      expect(result.matches.list()).toEqual(OK_PAYLOAD.matches);
    }
  });

  it('forwards an unconfigured payload', async () => {
    stubPayload({ status: 'unconfigured' });

    await expect(loadLiveSchedule()).resolves.toEqual({
      status: 'unconfigured',
    });
  });

  it('forwards an error payload', async () => {
    stubPayload({ status: 'error', message: 'PandaScore 502' });

    await expect(loadLiveSchedule()).resolves.toEqual({
      status: 'error',
      message: 'PandaScore 502',
    });
  });

  it('keeps the fetch error message', async () => {
    fetchMock.mockRejectedValue(new Error('network'));

    await expect(loadLiveSchedule()).resolves.toEqual({
      status: 'error',
      message: 'network',
    });
  });

  it('keeps a fallback message when fetch fails without one', async () => {
    fetchMock.mockRejectedValue(null);

    await expect(loadLiveSchedule()).resolves.toEqual({
      status: 'error',
      message: 'Failed to load schedule',
    });
  });

  it('rejects a payload that does not match the schema', async () => {
    stubPayload({ status: 'ok', games: 'lol', matches: [] });

    await expect(loadLiveSchedule()).resolves.toEqual({
      status: 'error',
      message: 'Invalid schedule payload',
    });
  });

  function stubPayload(payload: unknown) {
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve(payload),
    });
  }
});
