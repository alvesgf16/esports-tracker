import type { ScheduleBoardSource } from '@/modules/shared/gateways';

import { deviceTimeZone } from './device-time-zone';
import { useNow } from './use-now';
import { useScheduleBoard } from './use-schedule-board';

export function useBoardNow(source: ScheduleBoardSource) {
  const now = useNow();
  const board = useScheduleBoard(source);
  const timeZone = deviceTimeZone();

  return { board, now, timeZone };
}
