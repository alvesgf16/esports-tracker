import { loadScheduleBoard } from './load-schedule-board';
import { aVendorMatch, aVendorVideogame } from './pandascore.harness';

const API_BASE = 'https://api.pandascore.co';

describe('loadScheduleBoard', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('maps traditional games and skips simulated sports', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [
        aVendorVideogame(),
        aVendorVideogame({ id: 99, name: 'eSoccer', slug: 'e-soccer' }),
      ],
      '/matches/running?per_page=100': [],
      '/matches/upcoming?per_page=100': [],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.games).toEqual([
      { id: 'league-of-legends', name: 'LoL', shortName: 'LoL' },
    ]);
    expect(fetchMock.mock.calls.map(requestPath)).toEqual([
      '/videogames?per_page=50&sort=name',
      '/matches/running?per_page=100',
      '/matches/upcoming?per_page=100',
    ]);
  });

  it('loads running and upcoming matches', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [aVendorVideogame()],
      '/matches/running?per_page=100': [
        aVendorMatch({
          id: 2,
          name: 'Later',
          begin_at: '2026-11-04T18:00:00Z',
        }),
      ],
      '/matches/upcoming?per_page=100': [
        aVendorMatch({
          id: 1,
          name: 'Sooner',
          begin_at: '2026-11-04T12:00:00Z',
        }),
      ],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.matches.map((match) => match.id).sort()).toEqual(['1', '2']);
  });

  it('sends the bearer token', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [],
      '/matches/running?per_page=100': [],
      '/matches/upcoming?per_page=100': [],
    });

    await loadScheduleBoard('secret');

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE}/videogames?per_page=50&sort=name`,
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer secret',
        },
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('throws when PandaScore does not respond in time', async () => {
    abortOnTimeoutSignal();
    fetchMock.mockImplementation((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        rejectWhenAborted(init?.signal, reject);
      });
    });

    await expect(loadScheduleBoard('secret')).rejects.toThrow(
      'PandaScore /videogames?per_page=50&sort=name failed: timeout'
    );
    expect(AbortSignal.timeout).toHaveBeenCalledWith(10_000);
  });

  it('throws when the PandaScore response body stalls', async () => {
    const controller = new AbortController();

    jest.spyOn(AbortSignal, 'timeout').mockReturnValue(controller.signal);
    fetchMock.mockImplementation((_url: string, init?: RequestInit) => {
      return Promise.resolve({
        ok: true,
        json: () =>
          new Promise((_resolve, reject) => {
            rejectWhenAborted(init?.signal, reject);
            queueMicrotask(() => controller.abort());
          }),
      });
    });

    await expect(loadScheduleBoard('secret')).rejects.toThrow(
      'PandaScore /videogames?per_page=50&sort=name failed: timeout'
    );
  });

  it('includes the request path when PandaScore fetch fails', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));

    await expect(loadScheduleBoard('secret')).rejects.toMatchObject({
      message:
        'PandaScore /videogames?per_page=50&sort=name failed: network down',
      cause: expect.objectContaining({ message: 'network down' }),
    });
  });

  it('throws when PandaScore returns an error status', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 429 });

    await expect(loadScheduleBoard('secret')).rejects.toThrow(
      'PandaScore /videogames?per_page=50&sort=name failed: 429'
    );
  });

  function stubRoutes(routes: Record<string, unknown>): void {
    fetchMock.mockImplementation((url: string) => {
      const path = url.replace(API_BASE, '');
      const body = routes[path];

      if (body === undefined) {
        throw new Error(`Unexpected PandaScore path: ${path}`);
      }

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(body),
      });
    });
  }
});

function requestPath(call: unknown[]): string {
  return String(call[0]).replace(API_BASE, '');
}

function abortOnTimeoutSignal(): void {
  jest.spyOn(AbortSignal, 'timeout').mockImplementation(() => {
    const controller = new AbortController();

    queueMicrotask(() => controller.abort());

    return controller.signal;
  });
}

function rejectWhenAborted(
  signal: AbortSignal | null | undefined,
  reject: (error: Error) => void
): void {
  if (signal?.aborted) {
    reject(aTimeoutError());

    return;
  }

  signal?.addEventListener('abort', () => {
    reject(aTimeoutError());
  });
}

function aTimeoutError(): Error {
  const timeout = new Error('The operation was aborted due to timeout');

  timeout.name = 'TimeoutError';

  return timeout;
}
