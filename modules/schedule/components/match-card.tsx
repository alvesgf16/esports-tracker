import { Text, View } from 'react-native';

import type { MatchCardModel } from '../contracts';

type Props = {
  match: MatchCardModel;
};

export default function MatchCard({ match }: Props) {
  return (
    <View className="flex-row items-center gap-3.5 rounded-card bg-card px-3.5 py-3.5">
      <KickoffColumn match={match} />
      <MatchBody match={match} />
    </View>
  );
}

function KickoffColumn({ match }: Props) {
  const kickoffTone = match.isLive ? 'text-live' : 'text-foreground';

  return (
    <View className="w-[72px]">
      <Text className={`text-base font-bold ${kickoffTone}`}>
        {match.kickoffLabel}
      </Text>
      <Text className="mt-1 text-xs font-semibold text-muted">
        {match.countdownLabel}
      </Text>
    </View>
  );
}

function MatchBody({ match }: Props) {
  return (
    <View className="flex-1 gap-1">
      <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
        {match.teamA}
      </Text>
      <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
        {match.teamB}
      </Text>
      <Text className="mt-1 text-xs text-muted" numberOfLines={1}>
        {match.meta}
      </Text>
    </View>
  );
}
