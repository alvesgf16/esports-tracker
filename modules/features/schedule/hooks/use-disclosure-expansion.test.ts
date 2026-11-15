import { act, renderHook } from '@testing-library/react-native';

import { useDisclosureExpansion } from './use-disclosure-expansion';

describe('useDisclosureExpansion', () => {
  it('starts expanded', async () => {
    const { result } = await renderHook(() => useDisclosureExpansion());

    expect(result.current.isExpanded('lec')).toBe(true);
  });

  it('collapses and expands a disclosure', async () => {
    const { result } = await renderHook(() => useDisclosureExpansion());

    await act(() => {
      result.current.toggle('lec');
    });

    expect(result.current.isExpanded('lec')).toBe(false);

    await act(() => {
      result.current.toggle('lec');
    });

    expect(result.current.isExpanded('lec')).toBe(true);
  });
});
