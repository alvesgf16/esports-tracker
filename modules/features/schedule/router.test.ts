import { renderHook } from '@testing-library/react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useScheduleRouter } from './router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

describe('useScheduleRouter', () => {
  const setParams = jest.fn();

  beforeEach(() => {
    setParams.mockReset();
    jest.mocked(useRouter).mockReturnValue({ setParams } as never);
  });

  it('exposes a string game param', async () => {
    jest.mocked(useLocalSearchParams).mockReturnValue({ game: 'lol' });

    const { result } = await renderHook(() => useScheduleRouter());

    expect(result.current.gameFilter).toBe('lol');
  });

  it('uses the first value when the param is an array', async () => {
    jest.mocked(useLocalSearchParams).mockReturnValue({
      game: ['valorant', 'lol'],
    });

    const { result } = await renderHook(() => useScheduleRouter());

    expect(result.current.gameFilter).toBe('valorant');
  });

  it('clears the param when selecting all', async () => {
    jest.mocked(useLocalSearchParams).mockReturnValue({});

    const { result } = await renderHook(() => useScheduleRouter());

    result.current.setGameFilter('all');

    expect(setParams).toHaveBeenCalledWith({ game: '' });
  });
});
