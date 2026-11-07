import { renderHook } from '@testing-library/react-native';
import { useRouter } from 'expo-router';

import { useGamesRouter } from './router';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

describe('useGamesRouter', () => {
  it('opens the schedule route for a game', async () => {
    const push = jest.fn();

    jest.mocked(useRouter).mockReturnValue({ push } as never);

    const { result } = await renderHook(() => useGamesRouter());

    result.current.openSchedule('lol');

    expect(push).toHaveBeenCalledWith({
      pathname: '/',
      params: { game: 'lol' },
    });
  });
});
