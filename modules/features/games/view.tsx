import { ScrollView } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

import GameRow from './components/game-row';
import type { GamesPresenter } from './contracts';

type Props = {
  presenter: GamesPresenter;
};

export default function GamesView({ presenter }: Props) {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-2.5 p-4"
    >
      {presenter.notice ? (
        <NoticeBanner text={presenter.notice} className="mb-1" />
      ) : null}
      {presenter.rows.map((row) => (
        <GameRow key={row.id} row={row} onPress={presenter.openSchedule} />
      ))}
    </ScrollView>
  );
}
