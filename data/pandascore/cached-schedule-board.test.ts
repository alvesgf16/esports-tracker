import { fetchScheduleBoard } from './fetch-schedule-board';
import { cachedScheduleBoard } from './cached-schedule-board';

jest.mock('./fetch-schedule-board', () => ({
  fetchScheduleBoard: jest.fn(),
}));

const emptyBoard = { games: [], matches: [] };

describe('cachedScheduleBoard', () => {
  beforeEach(() => {
    jest.mocked(fetchScheduleBoard).mockReset();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns a cached board within the TTL', async () => {
    const loadCachedScheduleBoard = cachedScheduleBoard();

    jest.mocked(fetchScheduleBoard).mockResolvedValue(emptyBoard);

    await expect(loadCachedScheduleBoard('secret')).resolves.toBe(emptyBoard);
    await expect(loadCachedScheduleBoard('secret')).resolves.toBe(emptyBoard);
    expect(fetchScheduleBoard).toHaveBeenCalledTimes(1);
  });

  it('refreshes after the TTL', async () => {
    const loadCachedScheduleBoard = cachedScheduleBoard();

    jest.mocked(fetchScheduleBoard).mockResolvedValue(emptyBoard);

    await loadCachedScheduleBoard('secret');
    jest.setSystemTime(Date.now() + 60_000 + 1);
    await loadCachedScheduleBoard('secret');

    expect(fetchScheduleBoard).toHaveBeenCalledTimes(2);
  });
});
