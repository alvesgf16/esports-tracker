import { act, renderHook } from '@testing-library/react-native';

import { useDayKey } from './use-day-key';

type TodayKeyProps = {
  todayKey: string;
};

async function renderDayKey(todayKey: string) {
  return renderHook(({ todayKey }: TodayKeyProps) => useDayKey(todayKey), {
    initialProps: { todayKey },
  });
}

describe('useDayKey', () => {
  it('follows today until the caller pages away', async () => {
    const { result, rerender } = await renderDayKey('2026-03-15');

    expect(result.current.dayKey).toBe('2026-03-15');

    await act(() => {
      rerender({ todayKey: '2026-03-16' });
    });

    expect(result.current.dayKey).toBe('2026-03-16');
  });

  it('keeps a paged day when today changes', async () => {
    const { result, rerender } = await renderDayKey('2026-03-15');

    await act(() => {
      result.current.selectDayFromKey('2026-03-14');
    });

    await act(() => {
      rerender({ todayKey: '2026-03-16' });
    });

    expect(result.current.dayKey).toBe('2026-03-14');
  });

  it('follows today again after paging back', async () => {
    const { result, rerender } = await renderDayKey('2026-03-15');

    await act(() => {
      result.current.selectDayFromKey('2026-03-16');
    });
    await act(() => {
      result.current.selectDayFromKey('2026-03-15');
    });

    await act(() => {
      rerender({ todayKey: '2026-03-16' });
    });

    expect(result.current.dayKey).toBe('2026-03-16');
  });
});
