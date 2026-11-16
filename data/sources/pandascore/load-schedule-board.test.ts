import { loadScheduleBoard } from './load-schedule-board';
import {
  VIDEOGAMES_PAGE_1,
  aVendorMatch,
  aVendorVideogame,
  mockPandaScoreFetch,
  pandascorePath,
  stubPandaScoreRoutes,
  videogamesOnTwoPages,
} from './pandascore.harness';

describe('loadScheduleBoard', () => {
  const fetchMock = mockPandaScoreFetch();

  it('maps traditional games and skips simulated sports', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [
        aVendorVideogame(),
        aVendorVideogame({ id: 99, name: 'eSoccer', slug: 'e-soccer' }),
      ],
      '/matches/running?per_page=100': [],
      '/matches/upcoming?per_page=100': [],
      '/matches/past?per_page=100': [],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.games).toEqual([
      { id: 'league-of-legends', name: 'LoL', shortName: 'LoL' },
    ]);
    expect(fetchMock.mock.calls.map(pandascorePath)).toEqual([
      VIDEOGAMES_PAGE_1,
      '/matches/running?per_page=100',
      '/matches/upcoming?per_page=100',
      '/matches/past?per_page=100',
    ]);
  });

  it('loads running, upcoming, and past matches', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [aVendorVideogame()],
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
      '/matches/past?per_page=100': [
        aVendorMatch({
          id: 3,
          name: 'Earlier',
          status: 'finished',
          begin_at: '2026-11-04T08:00:00Z',
        }),
      ],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.matches.map((match) => match.id).sort()).toEqual([
      '1',
      '2',
      '3',
    ]);
  });

  it('drops matches whose game is not on the board', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [aVendorVideogame()],
      '/matches/running?per_page=100': [
        aVendorMatch({
          id: 2,
          videogame: { name: 'CS2', slug: 'cs-go' },
        }),
      ],
      '/matches/upcoming?per_page=100': [aVendorMatch()],
      '/matches/past?per_page=100': [],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.matches.map((match) => match.id)).toEqual(['1']);
  });

  it('keeps matches whose game is on a later videogames page', async () => {
    stubPandaScoreRoutes(fetchMock, {
      ...videogamesOnTwoPages(),
      '/matches/running?per_page=100': [
        aVendorMatch({
          id: 2,
          videogame: { name: 'CS2', slug: 'cs-go' },
        }),
      ],
      '/matches/upcoming?per_page=100': [],
      '/matches/past?per_page=100': [],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.games.map((game) => game.id)).toEqual([
      'league-of-legends',
      'cs-go',
    ]);
    expect(board.matches.map((match) => match.id)).toEqual(['2']);
  });

  it('keeps one row when the same match is running and past', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [aVendorVideogame()],
      '/matches/running?per_page=100': [
        aVendorMatch({
          id: 7,
          status: 'running',
          begin_at: '2026-11-04T10:00:00Z',
        }),
      ],
      '/matches/upcoming?per_page=100': [],
      '/matches/past?per_page=100': [
        aVendorMatch({
          id: 7,
          status: 'finished',
          begin_at: '2026-11-04T10:00:00Z',
        }),
      ],
    });

    const board = await loadScheduleBoard('secret');

    expect(board.matches).toHaveLength(1);
    expect(board.matches[0]).toMatchObject({ id: '7', status: 'running' });
  });

  it('fails the load when past returns 429', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [aVendorVideogame()],
      '/matches/running?per_page=100': [],
      '/matches/upcoming?per_page=100': [],
      '/matches/past?per_page=100': [],
    });
    const stubbed = fetchMock.getMockImplementation()!;

    fetchMock.mockImplementation((url: string, init?: RequestInit) => {
      if (pandascorePath([url]) === '/matches/past?per_page=100') {
        return Promise.resolve({ ok: false, status: 429 });
      }

      return stubbed(url, init);
    });

    await expect(loadScheduleBoard('secret')).rejects.toThrow(
      'PandaScore /matches/past?per_page=100 failed: 429'
    );
  });
});
