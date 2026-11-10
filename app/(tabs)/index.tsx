import { scheduleSource } from '@/lib/board/schedule-source';
import { scheduleClock } from '@/lib/clock/schedule-clock';
import { useScheduleSnapshot } from '@/lib/use-schedule-snapshot';
import { useSchedulePresenter } from '@/modules/features/schedule/presenter';
import ScheduleView from '@/modules/features/schedule/view';

export default function ScheduleScreen() {
  const { board, now, timezone } = useScheduleSnapshot(scheduleSource());
  const presenter = useSchedulePresenter(board, scheduleClock(now, timezone));

  return <ScheduleView presenter={presenter} />;
}
