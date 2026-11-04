import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import DayList from '@/components/DayList';
import GameChips from '@/components/GameChips';
import Colors from '@/constants/Colors';
import type { GameFilter } from '@/data/types';
import { parseGameFilter } from '@/lib/gameFilter';
import { getVisibleMatches, groupMatchesByDay } from '@/lib/schedule';
import { useNow } from '@/lib/useNow';

const palette = Colors.dark;

export default function ScheduleScreen() {
  const now = useNow();
  const router = useRouter();
  const { game } = useLocalSearchParams<{ game?: string }>();
  const selected = parseGameFilter(game) ?? 'all';
  const groups = useMemo(() => {
    return groupMatchesByDay(getVisibleMatches(selected, now), now);
  }, [now, selected]);

  return (
    <View style={styles.screen}>
      <GameChips
        selected={selected}
        onSelect={(next) => setGameParam(router, next)}
      />
      <DayList groups={groups} now={now} selected={selected} />
    </View>
  );
}

function setGameParam(
  router: ReturnType<typeof useRouter>,
  next: GameFilter
): void {
  router.setParams({ game: next === 'all' ? '' : next });
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
