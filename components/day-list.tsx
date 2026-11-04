import { ScrollView, StyleSheet, Text, View } from 'react-native';

import MatchCard from '@/components/match-card';
import Colors from '@/constants/colors';
import type { GameFilter } from '@/data/types';
import { gameName } from '@/lib/game-filter';
import type { DayGroup } from '@/lib/schedule';

const palette = Colors.dark;

type Props = {
  groups: DayGroup[];
  now: number;
  selected: GameFilter;
};

export default function DayList({ groups, now, selected }: Props) {
  return (
    <ScrollView style={styles.listWrap} contentContainerStyle={styles.list}>
      {groups.length === 0 ? (
        <EmptySchedule selected={selected} />
      ) : (
        groups.map((group) => (
          <DaySection key={group.key} group={group} now={now} />
        ))
      )}
    </ScrollView>
  );
}

function EmptySchedule({ selected }: { selected: GameFilter }) {
  const label = selected === 'all' ? '' : `${gameName(selected)} `;
  return <Text style={styles.empty}>No upcoming {label}matches.</Text>;
}

function DaySection({ group, now }: { group: DayGroup; now: number }) {
  return (
    <View style={styles.group}>
      <Text style={styles.section}>{group.label}</Text>
      {group.matches.map((match) => (
        <MatchCard key={match.id} match={match} now={now} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
