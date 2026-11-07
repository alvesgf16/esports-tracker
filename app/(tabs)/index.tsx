import { scheduleClock } from '@/lib/schedule-clock';
import { scheduleSource } from '@/lib/schedule-source';
import { useBoardNow } from '@/lib/use-board-now';
import { useSchedulePresenter } from '@/modules/features/schedule/presenter';
import ScheduleView from '@/modules/features/schedule/view';

export default function ScheduleScreen() {
  const { board, now, timeZone } = useBoardNow(scheduleSource());
  const presenter = useSchedulePresenter(board, scheduleClock(now, timeZone));

  return <ScheduleView presenter={presenter} />;
}
