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
    });

    const board = await loadScheduleBoard('secret');

    expect(board.games).toEqual([
      { id: 'league-of-legends', name: 'LoL', shortName: 'LoL' },
    ]);
    expect(fetchMock.mock.calls.map(pandascorePath)).toEqual([
      VIDEOGAMES_PAGE_1,
      '/matches/running?per_page=100',
      '/matches/upcoming?per_page=100',
    ]);
  });

  it('loads running and upcoming matches', async () => {
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
    });

    const board = await loadScheduleBoard('secret');

    expect(board.matches.map((match) => match.id).sort()).toEqual(['1', '2']);
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
    });

    const board = await loadScheduleBoard('secret');

    expect(board.games.map((game) => game.id)).toEqual([
      'league-of-legends',
      'cs-go',
    ]);
    expect(board.matches.map((match) => match.id)).toEqual(['2']);
  });
});
