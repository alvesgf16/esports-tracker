import { ScrollView, Text } from 'react-native';

import type { CompetitionDisclosureModel } from '../contracts';
import CompetitionDisclosure from './competition-disclosure';

type Props = {
  groups: CompetitionDisclosureModel[];
  emptyMessage: string;
};

export default function MatchDayList({ groups, emptyMessage }: Props) {
  const hasGroups = groups.length > 0;

  return (
    <ScrollView className="flex-1" contentContainerClassName="px-4 pb-8">
      {hasGroups ? (
        groups.map((disclosure) => (
          <CompetitionDisclosure key={disclosure.id} disclosure={disclosure} />
        ))
      ) : (
        <Text className="mt-12 text-center text-[15px] text-muted">
          {emptyMessage}
        </Text>
      )}
    </ScrollView>
  );
}
