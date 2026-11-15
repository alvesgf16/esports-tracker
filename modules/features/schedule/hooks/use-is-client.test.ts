import { renderHook } from '@testing-library/react-native';

import { useIsClient } from './use-is-client';

describe('useIsClient', () => {
  it('is true in a client render', async () => {
    const { result } = await renderHook(() => useIsClient());

    expect(result.current).toBe(true);
  });
});
