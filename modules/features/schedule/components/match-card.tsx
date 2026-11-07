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
      {match.countdownLabel ? (
        <Text className="mt-1 text-xs font-semibold text-muted">
          {match.countdownLabel}
        </Text>
      ) : null}
    </View>
  );
}

function MatchBody({ match }: Props) {
  return (
    <View className="flex-1 gap-1">
      <TeamName name={match.teamA} />
      <TeamName name={match.teamB} />
      <Text className="mt-1 text-xs text-muted" numberOfLines={1}>
        {match.meta}
      </Text>
    </View>
  );
}

type TeamNameProps = {
  name: string;
};

function TeamName({ name }: TeamNameProps) {
  return (
    <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
      {name}
    </Text>
  );
}
