import { ScrollView, Text, View } from 'react-native';

import type { DaySectionModel } from '../contracts';
import MatchRow from './match-row';

type Props = {
  groups: DaySectionModel[];
  emptyMessage: string;
};

type MatchDaySectionProps = {
  day: DaySectionModel;
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
  const { matches } = day;
  const lastIndex = matches.length - 1;

  return (
    <View className="mb-2 mt-2">
      {matches.map((match, index) => (
        <MatchRow key={match.id} match={match} isLast={index === lastIndex} />
      ))}
    </View>
  );
}
