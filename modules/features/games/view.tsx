import { ScrollView } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

import type { GameRowModel, GamesViewModel } from './contracts';
import GameRow from './components/game-row';

type Props = {
  model: GamesViewModel;
  notice?: string | null;
  onOpenSchedule: (gameId: GameRowModel['id']) => void;
};

export default function GamesView({ model, notice, onOpenSchedule }: Props) {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-2.5 p-4"
    >
      {notice ? <NoticeBanner text={notice} className="mb-1" /> : null}
      {model.rows.map((row) => (
        <GameRow key={row.id} row={row} onPress={onOpenSchedule} />
      ))}
    </ScrollView>
  );
}
