import { ScrollView } from 'react-native';

import type { GameRowModel, GamesViewModel } from './contracts';
import GameRow from './components/game-row';

type Props = {
  model: GamesViewModel;
  onOpenSchedule: (gameId: GameRowModel['id']) => void;
};

export default function GamesView({ model, onOpenSchedule }: Props) {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-2.5 p-4"
    >
      {model.rows.map((row) => (
        <GameRow key={row.id} row={row} onPress={onOpenSchedule} />
      ))}
    </ScrollView>
  );
}
