import { ScrollView, Text, View } from 'react-native';

import type { DaySectionModel } from '../contracts';
import MatchCard from './match-card';

type Props = {
  groups: DaySectionModel[];
  emptyMessage: string;
};

export default function DayList({ groups, emptyMessage }: Props) {
  return (
    <ScrollView className="flex-1" contentContainerClassName="px-4 pb-8">
      {groups.length === 0 ? (
        <Text className="mt-12 text-center text-[15px] text-muted">
          {emptyMessage}
        </Text>
      ) : (
        groups.map((group) => <DaySection key={group.key} group={group} />)
      )}
    </ScrollView>
  );
}

type DaySectionProps = {
  group: DaySectionModel;
};

function DaySection({ group }: DaySectionProps) {
  return (
    <View className="mb-2 gap-2.5">
      <Text className="mt-4 mb-2 text-[13px] font-bold tracking-[0.4px] text-muted uppercase">
        {group.label}
      </Text>
      {group.matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </View>
  );
}
