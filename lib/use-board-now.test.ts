import { renderHook } from '@testing-library/react-native';

import { gameCatalog } from '@/data/game-catalog';
import { matchCatalog } from '@/data/match-catalog';
import type { ScheduleBoardSource } from '@/modules/shared/gateways';

import { deviceTimeZone } from './device-time-zone';
import { useBoardNow } from './use-board-now';
import { useNow } from './use-now';
import { useScheduleBoard } from './use-schedule-board';

jest.mock('./use-now');
jest.mock('./device-time-zone');
jest.mock('./use-schedule-board');

describe('useBoardNow', () => {
  it('returns the board, clock, and zone together', async () => {
    const source: ScheduleBoardSource = {
      initial: {
        games: gameCatalog([]),
        matches: matchCatalog([]),
        loadState: { status: 'ok' },
      },
    };

    jest.mocked(useNow).mockReturnValue(42);
    jest.mocked(deviceTimeZone).mockReturnValue('UTC');
    jest.mocked(useScheduleBoard).mockReturnValue(source.initial);

    const { result } = await renderHook(() => useBoardNow(source));

    expect(useScheduleBoard).toHaveBeenCalledWith(source);
    expect(result.current).toEqual({
      board: source.initial,
      now: 42,
      timeZone: 'UTC',
    });
  });
});
