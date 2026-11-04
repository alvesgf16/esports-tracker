import { ScrollView, StyleSheet } from 'react-native';

import Colors from '@/constants/colors';

import type { GameRowModel, GamesViewModel } from './contracts';
import GameRow from './game-row';

const palette = Colors.dark;

type Props = {
  model: GamesViewModel;
  onOpenSchedule: (gameId: GameRowModel['id']) => void;
};

export default function GamesView({ model, onOpenSchedule }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {model.rows.map((row) => (
        <GameRow key={row.id} row={row} onPress={onOpenSchedule} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 16,
    gap: 10,
  },
});
