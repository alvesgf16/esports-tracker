import type { ScheduleBoardSource } from '@/modules/shared/gateways';

import { useScheduleBoard } from './board/use-schedule-board';
import { deviceTimeZone } from './clock/device-time-zone';
import { useNow } from './clock/use-now';

export function useScheduleSnapshot(source: ScheduleBoardSource) {
  const now = useNow();
  const board = useScheduleBoard(source);
  const timezone = deviceTimeZone();

  return { board, now, timezone };
}
