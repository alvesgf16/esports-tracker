const ALLOWED_LOGO_HOSTS = new Set([
  'cdn.pandascore.co',
  'cdn-api.pandascore.co',
  'static.wikia.nocookie.net',
]);

export function allowedUrlFrom(rawUrl: string | undefined): string | undefined {
  const trimmedUrl = rawUrl?.trim();

  if (!trimmedUrl) {
    return undefined;
  }

  const parsedUrl = URL.parse(trimmedUrl);

  return parsedUrl && isAllowed(parsedUrl) ? trimmedUrl : undefined;
}

function isAllowed(url: URL) {
  return (
    url.protocol === 'https:' &&
    !url.username &&
    url.port === '' &&
    ALLOWED_LOGO_HOSTS.has(url.hostname)
  );
}
