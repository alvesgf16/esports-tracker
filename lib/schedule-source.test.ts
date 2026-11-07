import { gameCatalog } from '@/data/game-catalog';
import { cachedLiveSchedule } from '@/data/live/cached-live-schedule';
import { matchCatalog } from '@/data/match-catalog';
import type { ScheduleBoardSource } from '@/modules/shared/gateways';

import { sampleBoard } from './sample-board';
import { scheduleSource } from './schedule-source';

jest.mock('@/data/live/cached-live-schedule', () => {
  const loadCached = jest.fn();

  return {
    cachedLiveSchedule: () => loadCached,
  };
});

const mockLoadCached = jest.mocked(cachedLiveSchedule());

describe('scheduleSource', () => {
  const previousLive = process.env.EXPO_PUBLIC_LIVE_SCHEDULE;

  afterEach(() => {
    mockLoadCached.mockReset();
    restoreLiveFlag(previousLive);
  });

  it('returns the sample board when live schedule is off', () => {
    restoreLiveFlag(undefined);

    expect(scheduleSource()).toEqual({ initial: sampleBoard });
  });

  it('starts loading when live schedule is on', () => {
    process.env.EXPO_PUBLIC_LIVE_SCHEDULE = '1';

    const source = scheduleSource();

    expect(source.initial.loadState).toEqual({ status: 'loading' });
    expect(source.load).toEqual(expect.any(Function));
  });

  it('maps an ok live result onto the board', async () => {
    process.env.EXPO_PUBLIC_LIVE_SCHEDULE = '1';
    const games = [{ id: 'lol', name: 'LoL', shortName: 'LoL' }];

    mockLoadCached.mockResolvedValue({
      status: 'ok',
      games: gameCatalog(games),
      matches: matchCatalog([]),
    });

    const board = await loadLive(scheduleSource());

    expect(board.loadState).toEqual({ status: 'ok' });
    expect(board.games.list()).toEqual(games);
  });

  it('keeps a live failure on the board', async () => {
    process.env.EXPO_PUBLIC_LIVE_SCHEDULE = '1';
    mockLoadCached.mockResolvedValue({ status: 'unconfigured' });

    const board = await loadLive(scheduleSource());

    expect(board.loadState).toEqual({ status: 'unconfigured' });
    expect(board.games.list()).toEqual([]);
  });
});

async function loadLive(source: ScheduleBoardSource) {
  if (!source.load) {
    throw new Error('expected a live loader');
  }

  return source.load();
}

function restoreLiveFlag(value: string | undefined): void {
  if (value === undefined) {
    delete process.env.EXPO_PUBLIC_LIVE_SCHEDULE;

    return;
  }

  process.env.EXPO_PUBLIC_LIVE_SCHEDULE = value;
}
