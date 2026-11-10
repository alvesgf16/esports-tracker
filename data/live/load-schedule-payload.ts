import { createCachedScheduleBoardLoader } from '@/data/pandascore/create-cached-schedule-board-loader';

import { scheduleError } from './schedule-error';
import type { LiveSchedulePayload } from './schedule-result';

const loadCachedScheduleBoard = createCachedScheduleBoardLoader();

export async function loadSchedulePayload(
  token: string | undefined
): Promise<LiveSchedulePayload> {
  if (!token) {
    return { status: 'unconfigured' };
  }

  return payloadFromBoard(token);
}

async function payloadFromBoard(token: string): Promise<LiveSchedulePayload> {
  try {
    const board = await loadCachedScheduleBoard(token);

    return {
      status: 'ok',
      games: board.games,
      matches: board.matches,
    };
  } catch (error) {
    return scheduleError(error);
  }
}
