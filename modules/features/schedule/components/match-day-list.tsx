import { ScrollView, Text, View } from 'react-native';

import type { DaySectionModel, MatchCardModel } from '../contracts';

type Props = {
  groups: DaySectionModel[];
  emptyMessage: string;
};

type MatchDaySectionProps = {
  day: DaySectionModel;
};

type MatchCardProps = {
  match: MatchCardModel;
};

type SideLabelProps = {
  label: string;
};

export default function MatchDayList({ groups, emptyMessage }: Props) {
  const hasGroups = groups.length > 0;

  return (
    <ScrollView className="flex-1" contentContainerClassName="px-4 pb-8">
      {hasGroups ? (
        groups.map((day) => <MatchDaySection key={day.dayKey} day={day} />)
      ) : (
        <Text className="mt-12 text-center text-[15px] text-muted">
          {emptyMessage}
        </Text>
      )}
    </ScrollView>
  );
}

function MatchDaySection({ day }: MatchDaySectionProps) {
  const { label, matches } = day;

  return (
    <View className="mb-2 gap-2.5">
      <Text className="mt-4 mb-2 text-[13px] font-bold tracking-[0.4px] text-muted uppercase">
        {label}
      </Text>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </View>
  );
}

function MatchCard({ match }: MatchCardProps) {
  return (
    <View className="flex-row items-center gap-3.5 rounded-card bg-card px-3.5 py-3.5">
      <MatchKickoffColumn match={match} />
      <MatchBody match={match} />
    </View>
  );
}

function MatchKickoffColumn({ match }: MatchCardProps) {
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

function MatchBody({ match }: MatchCardProps) {
  return (
    <View className="flex-1 gap-1">
      <SideLabel label={match.left} />
      <SideLabel label={match.right} />
      <Text className="mt-1 text-xs text-muted" numberOfLines={1}>
        {match.meta}
      </Text>
    </View>
  );
}

function SideLabel({ label }: SideLabelProps) {
  return (
    <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
      {label}
    </Text>
  );
}
