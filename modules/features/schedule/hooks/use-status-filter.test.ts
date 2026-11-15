import { act, renderHook } from '@testing-library/react-native';

import { useStatusFilter } from './use-status-filter';

describe('useStatusFilter', () => {
  it('defaults to all', async () => {
    const { result } = await renderHook(() => useStatusFilter());

    expect(result.current.statusFilter).toBe('all');
  });

  it('updates when the caller selects a status', async () => {
    const { result } = await renderHook(() => useStatusFilter());

    await act(() => {
      result.current.setStatusFilter('live');
    });

    expect(result.current.statusFilter).toBe('live');
  });
});
