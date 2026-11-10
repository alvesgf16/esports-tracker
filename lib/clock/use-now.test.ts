import { act, renderHook } from '@testing-library/react-native';

import { useNow } from './use-now';

describe('useNow', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(1_700_000_000_000);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts at the current time', async () => {
    const { result } = await renderHook(() => useNow());

    expect(result.current).toBe(1_700_000_000_000);
  });

  it('ticks on the given interval', async () => {
    const { result } = await renderHook(() => useNow(1000));

    await act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe(1_700_000_001_000);
  });
});
