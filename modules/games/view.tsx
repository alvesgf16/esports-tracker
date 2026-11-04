import { ScrollView, Text } from 'react-native';

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
      {notice ? <NoticeBanner text={notice} /> : null}
      {model.rows.map((row) => (
        <GameRow key={row.id} row={row} onPress={onOpenSchedule} />
      ))}
    </ScrollView>
  );
}

function NoticeBanner({ text }: { text: string }) {
  return (
    <Text className="mb-1 text-center text-[13px] text-muted">{text}</Text>
  );
}
