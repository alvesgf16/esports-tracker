import { sampleBoard } from '@/lib/sample-board';
import { useGamesPresenter } from '@/modules/features/games/presenter';
import GamesView from '@/modules/features/games/view';

export default function GamesScreen() {
  const presenter = useGamesPresenter(sampleBoard);

  return <GamesView presenter={presenter} />;
}
