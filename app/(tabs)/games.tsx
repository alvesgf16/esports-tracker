import { scheduleSource } from '@/lib/board/schedule-source';
import { useScheduleSnapshot } from '@/lib/use-schedule-snapshot';
import { useGamesPresenter } from '@/modules/features/games/presenter';
import GamesView from '@/modules/features/games/view';

export default function GamesScreen() {
  const { board, now } = useScheduleSnapshot(scheduleSource());
  const presenter = useGamesPresenter(board, now);

  return <GamesView presenter={presenter} />;
}
