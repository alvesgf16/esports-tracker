import { gameCatalog } from '@/data/catalogs/game-catalog';
import { matchCatalog } from '@/data/catalogs/match-catalog';
import { cachedLiveSchedule } from '@/data/sources/live/cached-schedule';
import type { LiveScheduleResult } from '@/data/sources/live/schedule-result';
import type {
  ScheduleBoardSource,
  ScheduleBoardState,
  ScheduleLoadFailure,
} from '@/modules/shared/gateways';

import { sampleBoard } from './sample-board';

const loadCachedLiveSchedule = cachedLiveSchedule();

const emptyCatalogs = {
  games: gameCatalog([]),
  matches: matchCatalog([]),
};

const liveBoardSource: ScheduleBoardSource = {
  initial: {
    ...emptyCatalogs,
    loadState: { status: 'loading' },
  },
  load: loadLiveBoard,
};

export function scheduleSource(): ScheduleBoardSource {
  return process.env.EXPO_PUBLIC_LIVE_SCHEDULE === '1'
    ? liveBoardSource
    : { initial: sampleBoard };
}

async function loadLiveBoard(): Promise<ScheduleBoardState> {
  return boardFromLive(await loadCachedLiveSchedule());
}

function boardFromLive(result: LiveScheduleResult): ScheduleBoardState {
  if (result.status === 'ok') {
    return {
      games: result.games,
      matches: result.matches,
      loadState: { status: 'ok' },
    };
  }

  return failedBoard(result);
}

function failedBoard(loadState: ScheduleLoadFailure): ScheduleBoardState {
  return {
    ...emptyCatalogs,
    loadState,
  };
}
