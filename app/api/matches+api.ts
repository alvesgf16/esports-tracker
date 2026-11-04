import {
  fetchScheduleBoard,
  type ScheduleBoard,
} from '@/data/pandascore/client';

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  expiresAt: number;
  board: ScheduleBoard;
};

type OkBoard = {
  status: 'ok';
  games: ScheduleBoard['games'];
  matches: ScheduleBoard['matches'];
};

type BoardResponse =
  OkBoard | { status: 'unconfigured' } | { status: 'error'; message: string };

let cache: CacheEntry | null = null;

export async function GET(): Promise<Response> {
  const token = process.env.PANDASCORE_TOKEN?.trim();

  if (!token) {
    return jsonBoard({ status: 'unconfigured' });
  }

  return loadBoardResponse(token);
}

async function loadBoardResponse(token: string): Promise<Response> {
  try {
    const board = await cachedBoard(token);

    return jsonBoard({
      status: 'ok',
      games: board.games,
      matches: board.matches,
    });
  } catch (error) {
    return errorBoard(error);
  }
}

function errorBoard(error: unknown): Response {
  const message =
    error instanceof Error ? error.message : 'Failed to load schedule';

  return jsonBoard({ status: 'error', message }, 502);
}

function jsonBoard(body: BoardResponse, status = 200): Response {
  return Response.json(body, { status });
}

async function cachedBoard(token: string): Promise<ScheduleBoard> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return cache.board;
  }

  const board = await fetchScheduleBoard(token);

  cache = { board, expiresAt: now + CACHE_TTL_MS };

  return board;
}
