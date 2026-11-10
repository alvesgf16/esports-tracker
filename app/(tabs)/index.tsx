import { scheduleClock } from '@/lib/schedule-clock';
import { scheduleSource } from '@/lib/schedule-source';
import { useScheduleSnapshot } from '@/lib/use-schedule-snapshot';
import { useSchedulePresenter } from '@/modules/features/schedule/presenter';
import ScheduleView from '@/modules/features/schedule/view';

export default function ScheduleScreen() {
  const { board, now, timezone } = useScheduleSnapshot(scheduleSource());
  const presenter = useSchedulePresenter(board, scheduleClock(now, timezone));

  return <ScheduleView presenter={presenter} />;
}
