import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';

import type { DaySectionModel } from './contracts';
import MatchCard from './match-card';

const palette = Colors.dark;

type Props = {
  groups: DaySectionModel[];
  emptyMessage: string;
};

export default function DayList({ groups, emptyMessage }: Props) {
  return (
    <ScrollView style={styles.listWrap} contentContainerStyle={styles.list}>
      {groups.length === 0 ? (
        <Text style={styles.empty}>{emptyMessage}</Text>
      ) : (
        groups.map((group) => <DaySection key={group.key} group={group} />)
      )}
    </ScrollView>
  );
}

function DaySection({ group }: { group: DaySectionModel }) {
  return (
    <View style={styles.group}>
      <Text style={styles.section}>{group.label}</Text>
      {group.matches.map((match) => (
        <MatchCard key={match.id} match={match} />
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
