import { ScrollView, StyleSheet } from 'react-native';

import GameRow from '@/components/game-row';
import Colors from '@/constants/colors';
import { GAMES } from '@/data/games';
import { useNow } from '@/lib/use-now';

const palette = Colors.dark;

export default function GamesScreen() {
  const now = useNow();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {GAMES.map((game) => (
        <GameRow key={game.id} game={game} now={now} />
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
