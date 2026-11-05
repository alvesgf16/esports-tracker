import { sampleBoard } from '@/lib/sample-board';
import { useSchedulePresenter } from '@/modules/features/schedule/presenter';
import ScheduleView from '@/modules/features/schedule/view';

export default function ScheduleScreen() {
  const presenter = useSchedulePresenter(sampleBoard);

  return <ScheduleView presenter={presenter} />;
}
