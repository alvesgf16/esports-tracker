import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { getGame } from '@/data/games';
import type { Match } from '@/data/types';
import { formatCountdown, formatKickoff, getMatchStatus } from '@/lib/schedule';

const palette = Colors.dark;

type Props = {
  match: Match;
  now: number;
};

export default function MatchCard({ match, now }: Props) {
  const game = getGame(match.game);
  const status = getMatchStatus(match.startsAt, now);
  const isLive = status === 'live';

  return (
    <View style={styles.card}>
      <View style={styles.timeCol}>
        <Text style={[styles.kickoff, isLive && styles.liveText]}>
          {isLive ? 'LIVE' : formatKickoff(match.startsAt)}
        </Text>
        <Text style={styles.countdown}>{formatCountdown(match.startsAt, now)}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.team} numberOfLines={1}>
          {match.teamA.name}
        </Text>
        <Text style={styles.team} numberOfLines={1}>
          {match.teamB.name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {game.shortName} · {match.tournament} · {match.format}
        </Text>
      </View>
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
