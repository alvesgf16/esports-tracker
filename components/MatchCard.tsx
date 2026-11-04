import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import { getGame } from '@/data/games';
import type { Match } from '@/data/types';
import { formatCountdown, formatKickoff } from '@/lib/formatTime';
import { getMatchStatus } from '@/lib/schedule';

const palette = Colors.dark;

type Props = {
  match: Match;
  now: number;
};

type KickoffProps = {
  startsAt: string;
  now: number;
  isLive: boolean;
};

type BodyProps = {
  match: Match;
  shortName: string;
};

export default function MatchCard({ match, now }: Props) {
  const game = getGame(match.game);
  const isLive = getMatchStatus(match.startsAt, now) === 'live';

  return (
    <View style={styles.card}>
      <KickoffColumn startsAt={match.startsAt} now={now} isLive={isLive} />
      <MatchBody match={match} shortName={game.shortName} />
    </View>
  );
}

function KickoffColumn({ startsAt, now, isLive }: KickoffProps) {
  return (
    <View style={styles.timeCol}>
      <Text style={[styles.kickoff, isLive && styles.liveText]}>
        {isLive ? 'LIVE' : formatKickoff(startsAt)}
      </Text>
      <Text style={styles.countdown}>{formatCountdown(startsAt, now)}</Text>
    </View>
  );
}

function MatchBody({ match, shortName }: BodyProps) {
  return (
    <View style={styles.body}>
      <Text style={styles.team} numberOfLines={1}>
        {match.teamA.name}
      </Text>
      <Text style={styles.team} numberOfLines={1}>
        {match.teamB.name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {shortName} · {match.tournament} · {match.format}
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
