import { fetchScheduleBoard } from '@/data/pandascore/fetch-schedule-board';

type ScheduleBoard = Awaited<ReturnType<typeof fetchScheduleBoard>>;

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

  return token
    ? loadBoardResponse(token)
    : respondWithBoard({ status: 'unconfigured' });
}

async function loadBoardResponse(token: string): Promise<Response> {
  try {
    const board = await loadCachedBoard(token);

    return respondWithBoard({
      status: 'ok',
      games: board.games,
      matches: board.matches,
    });
  } catch (error) {
    return respondWithBoardError(error);
  }
}

function respondWithBoardError(error: unknown): Response {
  const message =
    error instanceof Error ? error.message : 'Failed to load schedule';

  return respondWithBoard({ status: 'error', message }, 502);
}

function respondWithBoard(body: BoardResponse, status = 200): Response {
  return Response.json(body, { status });
}

async function loadCachedBoard(token: string): Promise<ScheduleBoard> {
  const now = Date.now();

  if (cache && cache.expiresAt > now) {
    return cache.board;
  }

  const board = await fetchScheduleBoard(token);

  cache = { board, expiresAt: now + CACHE_TTL_MS };

  return board;
}
