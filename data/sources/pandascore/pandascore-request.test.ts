import {
  PANDASCORE_API_BASE,
  VIDEOGAMES_PAGE_1,
  abortOnTimeoutSignal,
  aTimeoutError,
  mockPandaScoreFetch,
  rejectWhenAborted,
  stubPandaScoreRoutes,
} from './pandascore.harness';
import { pandascoreRequest } from './pandascore-request';

describe('pandascoreRequest.ok', () => {
  const fetchMock = mockPandaScoreFetch();

  it('returns the response when PandaScore succeeds', async () => {
    stubPandaScoreRoutes(fetchMock, { [VIDEOGAMES_PAGE_1]: [] });

    const response = await pandascoreRequest.ok(VIDEOGAMES_PAGE_1, 'secret');

    expect(response.ok).toBe(true);
  });

  it('sends the bearer token', async () => {
    stubPandaScoreRoutes(fetchMock, { [VIDEOGAMES_PAGE_1]: [] });

    await pandascoreRequest.ok(VIDEOGAMES_PAGE_1, 'secret');

    expect(fetchMock).toHaveBeenCalledWith(
      `${PANDASCORE_API_BASE}${VIDEOGAMES_PAGE_1}`,
      expect.objectContaining({
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer secret',
        },
        signal: expect.any(AbortSignal),
      })
    );
  });

  it('throws the path and status when PandaScore rejects the request', async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 429 });

    await expect(
      pandascoreRequest.ok(VIDEOGAMES_PAGE_1, 'secret')
    ).rejects.toThrow(`PandaScore ${VIDEOGAMES_PAGE_1} failed: 429`);
  });

  it('throws timeout when the request is aborted', async () => {
    abortOnTimeoutSignal();
    fetchMock.mockImplementation((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        rejectWhenAborted(init?.signal, reject);
      });
    });

    await expect(
      pandascoreRequest.ok(VIDEOGAMES_PAGE_1, 'secret')
    ).rejects.toThrow(`PandaScore ${VIDEOGAMES_PAGE_1} failed: timeout`);
    expect(AbortSignal.timeout).toHaveBeenCalledWith(10_000);
  });

  it('includes the request path when fetch fails', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));

    await expect(
      pandascoreRequest.ok(VIDEOGAMES_PAGE_1, 'secret')
    ).rejects.toMatchObject({
      message: `PandaScore ${VIDEOGAMES_PAGE_1} failed: network down`,
      cause: expect.objectContaining({ message: 'network down' }),
    });
  });
});

describe('pandascoreRequest.json', () => {
  it('returns the parsed body', async () => {
    const response = jsonResponse([{ slug: 'league-of-legends' }]);

    await expect(
      pandascoreRequest.json(VIDEOGAMES_PAGE_1, response)
    ).resolves.toEqual([{ slug: 'league-of-legends' }]);
  });

  it('throws timeout when reading the body stalls', async () => {
    const response = jsonResponse(Promise.reject(aTimeoutError()));

    await expect(
      pandascoreRequest.json(VIDEOGAMES_PAGE_1, response)
    ).rejects.toThrow(`PandaScore ${VIDEOGAMES_PAGE_1} failed: timeout`);
  });

  it('includes the path when the body is not JSON', async () => {
    const response = jsonResponse(Promise.reject(new SyntaxError('bad json')));

    await expect(
      pandascoreRequest.json(VIDEOGAMES_PAGE_1, response)
    ).rejects.toMatchObject({
      message: `PandaScore ${VIDEOGAMES_PAGE_1} failed: bad json`,
      cause: expect.objectContaining({ message: 'bad json' }),
    });
  });
});

function jsonResponse(body: unknown): Response {
  return { json: () => Promise.resolve(body) } as Response;
}
