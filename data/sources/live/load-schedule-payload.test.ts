import { createCachedScheduleBoardLoader } from '@/data/sources/pandascore/create-cached-schedule-board-loader';

import { loadSchedulePayload } from './load-schedule-payload';

jest.mock(
  '@/data/sources/pandascore/create-cached-schedule-board-loader',
  () => {
    const loadCachedScheduleBoard = jest.fn();

    return {
      createCachedScheduleBoardLoader: () => loadCachedScheduleBoard,
    };
  }
);

const loadCachedScheduleBoard = createCachedScheduleBoardLoader();

const lol = { id: 'lol', name: 'League of Legends', shortName: 'LoL' };

describe('loadSchedulePayload', () => {
  beforeEach(() => {
    jest.mocked(loadCachedScheduleBoard).mockReset();
  });

  it('returns unconfigured when the token is missing', async () => {
    await expect(loadSchedulePayload(undefined)).resolves.toEqual({
      status: 'unconfigured',
    });
    expect(loadCachedScheduleBoard).not.toHaveBeenCalled();
  });

  it('returns unconfigured when the token is empty', async () => {
    await expect(loadSchedulePayload('')).resolves.toEqual({
      status: 'unconfigured',
    });
  });

  it('returns an ok payload from the cached board', async () => {
    jest.mocked(loadCachedScheduleBoard).mockResolvedValue({
      games: [lol],
      matches: [],
    });

    await expect(loadSchedulePayload('secret')).resolves.toEqual({
      status: 'ok',
      games: [lol],
      matches: [],
    });
  });

  it('returns an error payload when the board load fails', async () => {
    jest
      .mocked(loadCachedScheduleBoard)
      .mockRejectedValue(new Error('PandaScore 502'));

    await expect(loadSchedulePayload('secret')).resolves.toEqual({
      status: 'error',
      message: 'PandaScore 502',
    });
  });

  it('returns a fallback error when the failure is not an Error', async () => {
    jest.mocked(loadCachedScheduleBoard).mockRejectedValue(null);

    await expect(loadSchedulePayload('secret')).resolves.toEqual({
      status: 'error',
      message: 'Failed to load schedule',
    });
  });
});
