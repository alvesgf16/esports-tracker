import { fetchScheduleBoard } from './fetch-schedule-board';
import { aVendorMatch, aVendorVideogame } from './pandascore.harness';

const API_BASE = 'https://api.pandascore.co';

describe('fetchScheduleBoard', () => {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as typeof fetch;
  });

  it('maps traditional games and skips simulated sports', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [
        aVendorVideogame(),
        aVendorVideogame({ id: 99, name: 'eSoccer', slug: 'e-soccer' }),
      ],
      '/matches/running?filter[videogame]=1&per_page=20': [],
      '/matches/upcoming?filter[videogame]=1&per_page=20': [],
    });

    const board = await fetchScheduleBoard('secret');

    expect(board.games).toEqual([
      { id: 'league-of-legends', name: 'LoL', shortName: 'LoL' },
    ]);
    expect(fetchMock.mock.calls.map(requestPath)).not.toContain(
      '/matches/running?filter[videogame]=99&per_page=20'
    );
  });

  it('loads running and upcoming matches sorted by kickoff', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [aVendorVideogame()],
      '/matches/running?filter[videogame]=1&per_page=20': [
        aVendorMatch({
          id: 2,
          name: 'Later',
          begin_at: '2026-11-04T18:00:00Z',
        }),
      ],
      '/matches/upcoming?filter[videogame]=1&per_page=20': [
        aVendorMatch({
          id: 1,
          name: 'Sooner',
          begin_at: '2026-11-04T12:00:00Z',
        }),
      ],
    });

    const board = await fetchScheduleBoard('secret');

    expect(board.matches.map((match) => match.id)).toEqual(['1', '2']);
  });

  it('sends the bearer token', async () => {
    stubRoutes({
      '/videogames?per_page=50&sort=name': [],
    });

    await fetchScheduleBoard('secret');

    expect(fetchMock).toHaveBeenCalledWith(
      `${API_BASE}/videogames?per_page=50&sort=name`,
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer secret',
        },
      })
    );
  });

  it('throws when PandaScore returns an error status', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 429 });

    await expect(fetchScheduleBoard('secret')).rejects.toThrow(
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
