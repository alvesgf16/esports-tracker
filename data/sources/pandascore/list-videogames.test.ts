import { listVideogames } from './list-videogames';
import {
  PANDASCORE_API_BASE,
  VIDEOGAMES_PAGE_1,
  VIDEOGAMES_PAGE_2,
  aVendorVideogame,
  mockPandaScoreFetch,
  stubPandaScoreRoutes,
  videogamesOnTwoPages,
} from './pandascore.harness';

describe('listVideogames', () => {
  const fetchMock = mockPandaScoreFetch();

  it('returns a single page when Link has no next', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: [aVendorVideogame()],
    });

    await expect(listVideogames('secret')).resolves.toEqual([
      aVendorVideogame(),
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('concatenates pages while Link has rel=next', async () => {
    stubPandaScoreRoutes(fetchMock, videogamesOnTwoPages());

    const videogames = await listVideogames('secret');

    expect(videogames.map((game) => game.slug)).toEqual([
      'league-of-legends',
      'cs-go',
    ]);
  });

  it('does not follow a Link without rel=next', async () => {
    stubPandaScoreRoutes(fetchMock, {
      [VIDEOGAMES_PAGE_1]: {
        body: [aVendorVideogame()],
        link: `<${PANDASCORE_API_BASE}${VIDEOGAMES_PAGE_2}>; rel="last"`,
      },
    });

    await listVideogames('secret');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
