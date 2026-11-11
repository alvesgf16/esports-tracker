import { createCachedScheduleBoardLoader } from './create-cached-schedule-board-loader';
import { loadScheduleBoard } from './load-schedule-board';

jest.mock('./load-schedule-board', () => ({
  loadScheduleBoard: jest.fn(),
}));

const emptyBoard = { games: [], matches: [] };

describe('createCachedScheduleBoardLoader', () => {
  beforeEach(() => {
    jest.mocked(loadScheduleBoard).mockReset();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a cached board within the TTL', async () => {
    const loadCachedScheduleBoard = createCachedScheduleBoardLoader();

    jest.mocked(loadScheduleBoard).mockResolvedValue(emptyBoard);

    await expect(loadCachedScheduleBoard('secret')).resolves.toBe(emptyBoard);
    await expect(loadCachedScheduleBoard('secret')).resolves.toBe(emptyBoard);
    expect(loadScheduleBoard).toHaveBeenCalledTimes(1);
  });

  it('refreshes after the TTL', async () => {
    const loadCachedScheduleBoard = createCachedScheduleBoardLoader();

    jest.mocked(loadScheduleBoard).mockResolvedValue(emptyBoard);

    await loadCachedScheduleBoard('secret');
    jest.setSystemTime(Date.now() + 60_000 + 1);
    await loadCachedScheduleBoard('secret');

    expect(loadScheduleBoard).toHaveBeenCalledTimes(2);
  });

  it('shares one refresh when two loads miss the cache', async () => {
    const loadCachedScheduleBoard = createCachedScheduleBoardLoader();
    const { promise, resolve } = deferredBoard(emptyBoard);

    jest.mocked(loadScheduleBoard).mockReturnValue(promise);

    const first = loadCachedScheduleBoard('secret');
    const second = loadCachedScheduleBoard('secret');

    resolve();

    await expect(first).resolves.toBe(emptyBoard);
    await expect(second).resolves.toBe(emptyBoard);
    expect(loadScheduleBoard).toHaveBeenCalledTimes(1);
  });

  it('retries after a failed refresh', async () => {
    const loadCachedScheduleBoard = createCachedScheduleBoardLoader();

    jest
      .mocked(loadScheduleBoard)
      .mockRejectedValueOnce(new Error('down'))
      .mockResolvedValueOnce(emptyBoard);

    await expect(loadCachedScheduleBoard('secret')).rejects.toThrow('down');
    await expect(loadCachedScheduleBoard('secret')).resolves.toBe(emptyBoard);
    expect(loadScheduleBoard).toHaveBeenCalledTimes(2);
  });
});

function deferredBoard(board: typeof emptyBoard) {
  let resolve = () => {};
  const promise = new Promise<typeof emptyBoard>((next) => {
    resolve = () => next(board);
  });

  return { promise, resolve };
}
