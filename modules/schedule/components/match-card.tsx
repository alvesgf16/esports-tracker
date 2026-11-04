import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';

import type { MatchCardModel } from '../contracts';

const palette = Colors.dark;

type Props = {
  match: MatchCardModel;
};

export default function MatchCard({ match }: Props) {
  return (
    <View style={styles.card}>
      <KickoffColumn match={match} />
      <MatchBody match={match} />
    </View>
  );
}

function KickoffColumn({ match }: Props) {
  return (
    <View style={styles.timeCol}>
      <Text style={[styles.kickoff, match.isLive && styles.liveText]}>
        {match.kickoffLabel}
      </Text>
      <Text style={styles.countdown}>{match.countdownLabel}</Text>
    </View>
  );
}

function MatchBody({ match }: Props) {
  return (
    <View style={styles.body}>
      <Text style={styles.team} numberOfLines={1}>
        {match.teamA}
      </Text>
      <Text style={styles.team} numberOfLines={1}>
        {match.teamB}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {match.meta}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 14,
  },
  timeCol: {
    width: 72,
  },
  kickoff: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  liveText: {
    color: palette.live,
  },
  countdown: {
    marginTop: 4,
    color: palette.muted,
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    flex: 1,
    gap: 4,
  },
  team: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    marginTop: 4,
    color: palette.muted,
    fontSize: 12,
  },
});
