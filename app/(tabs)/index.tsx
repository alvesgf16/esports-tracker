import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import GameChips, { type GameFilter } from '@/components/GameChips';
import MatchCard from '@/components/MatchCard';
import Colors from '@/constants/Colors';
import { GAMES } from '@/data/games';
import type { GameId } from '@/data/types';
import { getVisibleMatches, groupMatchesByDay } from '@/lib/schedule';
import { useNow } from '@/lib/useNow';

const palette = Colors.dark;

function parseGameFilter(value: string | string[] | undefined): GameFilter | null {
  const game = Array.isArray(value) ? value[0] : value;
  if (game === 'all' || GAMES.some((item) => item.id === game)) {
    return game as GameFilter;
  }
  return null;
}

export default function ScheduleScreen() {
  const now = useNow();
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const [selected, setSelected] = useState<GameFilter>('all');

  useEffect(() => {
    const next = parseGameFilter(game);
    if (next) {
      setSelected(next);
    }
  }, [game]);

  const sections = useMemo(() => {
    const matches = getVisibleMatches(selected, now);
    return groupMatchesByDay(matches, now).map((group) => ({
      title: group.label,
      data: group.matches,
    }));
  }, [now, selected]);

  return (
    <View style={styles.screen}>
      <GameChips
        selected={selected}
        onSelect={(next) => {
          setSelected(next);
          router.setParams({ game: next === 'all' ? '' : next });
        }}
      />
      <ScrollView style={styles.listWrap} contentContainerStyle={styles.list}>
        {sections.length === 0 ? (
          <Text style={styles.empty}>
            No upcoming {selected === 'all' ? '' : `${gameName(selected)} `}matches.
          </Text>
        ) : (
          sections.map((section) => (
            <View key={section.title} style={styles.group}>
              <Text style={styles.section}>{section.title}</Text>
              {section.data.map((match) => (
                <MatchCard key={match.id} match={match} now={now} />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

function gameName(id: GameId): string {
  return GAMES.find((item) => item.id === id)?.name ?? id;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  listWrap: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  group: {
    gap: 10,
    marginBottom: 8,
  },
  section: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
  },
  empty: {
    color: palette.muted,
    textAlign: 'center',
    marginTop: 48,
    fontSize: 15,
  },
});
