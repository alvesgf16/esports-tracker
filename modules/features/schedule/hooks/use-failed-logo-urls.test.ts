import { act, renderHook } from '@testing-library/react-native';

import { useFailedUrls } from './use-failed-logo-urls';

describe('useFailedLogoUrls', () => {
  it('starts with no failed urls', async () => {
    const { result } = await renderHook(() => useFailedUrls());

    expect(result.current.failedUrls.size).toBe(0);
  });

  it('records a failed url', async () => {
    const { result } = await renderHook(() => useFailedUrls());

    await act(() => {
      result.current.markAsFailed('https://cdn.example/a.png');
    });

    expect(result.current.failedUrls.has('https://cdn.example/a.png')).toBe(
      true
    );
  });

  it('keeps the same set when the url already failed', async () => {
    const { result } = await renderHook(() => useFailedUrls());

    await act(() => {
      result.current.markAsFailed('https://cdn.example/a.png');
    });

    const first = result.current.failedUrls;

    await act(() => {
      result.current.markAsFailed('https://cdn.example/a.png');
    });

    expect(result.current.failedUrls).toBe(first);
  });
});
