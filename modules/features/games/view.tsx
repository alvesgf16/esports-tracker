import { ScrollView } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

import GameRow from './components/game-row';
import type { GamesPresenter } from './contracts';

type Props = {
  presenter: GamesPresenter;
};

export default function GamesView({ presenter }: Props) {
  const { notice, rows } = presenter;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-2.5 p-4"
    >
      {notice ? <NoticeBanner text={notice} className="mb-1" /> : null}
      {rows.map((row) => (
        <GameRow key={row.id} row={row} />
      ))}
    </ScrollView>
  );
}
