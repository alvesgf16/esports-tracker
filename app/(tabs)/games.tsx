import { scheduleSource } from '@/lib/schedule-source';
import { useBoardNow } from '@/lib/use-board-now';
import { useGamesPresenter } from '@/modules/features/games/presenter';
import GamesView from '@/modules/features/games/view';

export default function GamesScreen() {
  const { board, now } = useBoardNow(scheduleSource());
  const presenter = useGamesPresenter(board, now);

  return <GamesView presenter={presenter} />;
}
