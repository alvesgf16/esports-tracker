const API_BASE = 'https://api.pandascore.co';
const REQUEST_TIMEOUT_MS = 10_000;

export const pandascoreRequest = {
  ok: okResponse,
  json: jsonFrom,
};

async function okResponse(path: string, token: string): Promise<Response> {
  const response = await fetchPandaScore(path, token);

  if (!response.ok) {
    throw new Error(`PandaScore ${path} failed: ${response.status}`);
  }

  return response;
}

async function jsonFrom<T>(path: string, response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch (error) {
    throw pandascoreRequestFailure(path, error);
  }
}

async function fetchPandaScore(path: string, token: string): Promise<Response> {
  try {
    return await fetch(`${API_BASE}${path}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    throw pandascoreRequestFailure(path, error);
  }
}

function pandascoreRequestFailure(path: string, error: unknown): Error {
  if (isTimeout(error)) {
    return new Error(`PandaScore ${path} failed: timeout`);
  }

  if (error instanceof Error) {
    return new Error(`PandaScore ${path} failed: ${error.message}`, {
      cause: error,
    });
  }

  return new Error(`PandaScore ${path} failed`);
}

function isTimeout(error: unknown): boolean {
  return error instanceof Error && error.name === 'TimeoutError';
}
