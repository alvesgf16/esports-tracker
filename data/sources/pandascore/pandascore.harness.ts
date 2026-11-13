import type {
  VendorMatch,
  VendorOpponent,
  VendorVideogame,
} from './vendor-types';

export const PANDASCORE_API_BASE = 'https://api.pandascore.co';
export const VIDEOGAMES_PAGE_1 = '/videogames?page=1&per_page=100&sort=name';
export const VIDEOGAMES_PAGE_2 = '/videogames?page=2&per_page=100&sort=name';

type StubPage = {
  body: unknown;
  link?: string;
};

export function aVendorVideogame(
  overrides: Partial<VendorVideogame> = {}
): VendorVideogame {
  return {
    id: 1,
    name: 'LoL',
    slug: 'league-of-legends',
    ...overrides,
  };
}

export function aVendorOpponent(
  name: string | null,
  acronym?: string | null,
  id?: number | null
): VendorOpponent {
  return {
    type: 'Team',
    opponent: { id, name, acronym },
  };
}

export function aVendorMatch(
  overrides: Partial<VendorMatch> = {}
): VendorMatch {
  return {
    id: 1,
    name: 'Alpha vs Beta',
    status: 'not_started',
    match_type: 'best_of',
    number_of_games: 3,
    begin_at: '2026-11-04T12:00:00Z',
    scheduled_at: '2026-11-04T12:00:00Z',
    opponents: [
      aVendorOpponent('Alpha', 'ALP', 11),
      aVendorOpponent('Beta', 'BET', 22),
    ],
    results: [],
    winner_id: null,
    league: { name: 'LEC' },
    tournament: { name: 'Spring' },
    videogame: { name: 'LoL', slug: 'league-of-legends' },
    videogame_title: { name: null },
    ...overrides,
  };
}

export function mockPandaScoreFetch(): jest.Mock {
  const fetchMock = jest.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    globalThis.fetch = fetchMock as typeof fetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  return fetchMock;
}

export function stubPandaScoreRoutes(
  fetchMock: jest.Mock,
  routes: Record<string, unknown>
): void {
  fetchMock.mockImplementation((url: string) => {
    const path = String(url).replace(PANDASCORE_API_BASE, '');
    const stub = routes[path];

    if (stub === undefined) {
      throw new Error(`Unexpected PandaScore path: ${path}`);
    }

    const page = stubPage(stub);

    return Promise.resolve({
      ok: true,
      headers: {
        get: (name: string) => (name === 'link' ? (page.link ?? null) : null),
      },
      json: () => Promise.resolve(page.body),
    });
  });
}

export function videogamesOnTwoPages(): Record<string, unknown> {
  return {
    [VIDEOGAMES_PAGE_1]: {
      body: [aVendorVideogame()],
      link: `<${PANDASCORE_API_BASE}${VIDEOGAMES_PAGE_2}>; rel="next"`,
    },
    [VIDEOGAMES_PAGE_2]: [
      aVendorVideogame({ id: 2, name: 'CS2', slug: 'cs-go' }),
    ],
  };
}

export function pandascorePath(call: unknown[]): string {
  return String(call[0]).replace(PANDASCORE_API_BASE, '');
}

export function abortOnTimeoutSignal(): void {
  jest.spyOn(AbortSignal, 'timeout').mockImplementation(() => {
    const controller = new AbortController();

    queueMicrotask(() => controller.abort());

    return controller.signal;
  });
}

export function rejectWhenAborted(
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

export function aTimeoutError(): Error {
  const timeout = new Error('The operation was aborted due to timeout');

  timeout.name = 'TimeoutError';

  return timeout;
}

function stubPage(stub: unknown): StubPage {
  return isStubPage(stub) ? stub : { body: stub };
}

function isStubPage(stub: unknown): stub is StubPage {
  return Boolean(stub && typeof stub === 'object' && 'body' in stub);
}
