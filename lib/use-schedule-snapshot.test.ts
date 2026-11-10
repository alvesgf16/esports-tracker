import { renderHook } from '@testing-library/react-native';

import { gameCatalog } from '@/data/catalogs/game-catalog';
import { matchCatalog } from '@/data/catalogs/match-catalog';
import type { ScheduleBoardSource } from '@/modules/shared/gateways';

import { useScheduleBoard } from './board/use-schedule-board';
import { deviceTimeZone } from './clock/device-time-zone';
import { useNow } from './clock/use-now';
import { useScheduleSnapshot } from './use-schedule-snapshot';

jest.mock('./clock/use-now');
jest.mock('./clock/device-time-zone');
jest.mock('./board/use-schedule-board');

describe('useScheduleSnapshot', () => {
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

    const { result } = await renderHook(() => useScheduleSnapshot(source));

    expect(useScheduleBoard).toHaveBeenCalledWith(source);
    expect(result.current).toEqual({
      board: source.initial,
      now: 42,
      timezone: 'UTC',
    });
  });
});
