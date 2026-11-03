import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { GAMES } from '@/data/games';
import { getVisibleMatches } from '@/lib/schedule';
import { useNow } from '@/lib/useNow';

const palette = Colors.dark;

export default function GamesScreen() {
  const now = useNow();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {GAMES.map((game) => {
        const count = getVisibleMatches(game.id, now).length;
        return (
          <Link key={game.id} href={`/?game=${game.id}`} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${game.name}, ${count === 0 ? 'no upcoming matches' : `${count} upcoming`}`}
              style={styles.row}>
              <View>
                <Text style={styles.name}>{game.name}</Text>
                <Text style={styles.meta}>
                  {count === 0 ? 'No upcoming matches' : `${count} upcoming`}
                </Text>
              </View>
              <Text style={styles.short}>{game.shortName}</Text>
            </Pressable>
          </Link>
        );
      })}
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
