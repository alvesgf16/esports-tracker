import { ScrollView, Text, View } from 'react-native';

import type { DaySectionModel, MatchRowModel } from '../contracts';

type Props = {
  groups: DaySectionModel[];
  emptyMessage: string;
};

type MatchDaySectionProps = {
  day: DaySectionModel;
};

type MatchRowProps = {
  match: MatchRowModel;
  isLast: boolean;
};

type MatchRowContentProps = {
  match: MatchRowModel;
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
  const lastIndex = matches.length - 1;

  return (
    <View className="mb-2">
      <Text className="mt-4 mb-1 text-[13px] font-bold tracking-[0.4px] text-muted uppercase">
        {label}
      </Text>
      {matches.map((match, index) => (
        <MatchRow key={match.id} match={match} isLast={index === lastIndex} />
      ))}
    </View>
  );
}

function MatchRow({ match, isLast }: MatchRowProps) {
  const rowBorder = isLast ? '' : 'border-b border-border';

  return (
    <View className={`flex-row items-center gap-3 py-2.5 ${rowBorder}`}>
      <MatchKickoffColumn match={match} />
      <MatchBody match={match} />
    </View>
  );
}

function MatchKickoffColumn({ match }: MatchRowContentProps) {
  const kickoffTone = match.isLive ? 'text-live' : 'text-foreground';

  return (
    <View className="w-16">
      <Text className={`text-sm font-bold ${kickoffTone}`}>
        {match.kickoffLabel}
      </Text>
      {match.countdownLabel ? (
        <Text className="mt-0.5 text-xs font-semibold text-muted">
          {match.countdownLabel}
        </Text>
      ) : null}
    </View>
  );
}

function MatchBody({ match }: MatchRowContentProps) {
  return (
    <View className="flex-1 gap-0.5">
      <SideLabel label={match.left} />
      <SideLabel label={match.right} />
      <Text className="mt-0.5 text-xs text-muted" numberOfLines={1}>
        {match.meta}
      </Text>
    </View>
  );
}

function SideLabel({ label }: SideLabelProps) {
  return (
    <Text
      className="text-[15px] font-semibold text-foreground"
      numberOfLines={1}
    >
      {label}
    </Text>
  );
}
