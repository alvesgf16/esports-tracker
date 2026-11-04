import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';
import type { Game } from '@/data/games';
import { getVisibleMatches } from '@/lib/schedule';

const palette = Colors.dark;

type Props = {
  game: Game;
  now: number;
};

export default function GameRow({ game, now }: Props) {
  const count = getVisibleMatches(game.id, now).length;
  const upcoming = count === 0 ? 'No upcoming matches' : `${count} upcoming`;

  return (
    <Link href={`/?game=${game.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${game.name}, ${upcoming.toLowerCase()}`}
        style={styles.row}
      >
        <View>
          <Text style={styles.name}>{game.name}</Text>
          <Text style={styles.meta}>{upcoming}</Text>
        </View>
        <Text style={styles.short}>{game.shortName}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: palette.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: palette.muted,
    marginTop: 4,
    fontSize: 13,
  },
  short: {
    color: palette.tint,
    fontSize: 13,
    fontWeight: '700',
  },
});
