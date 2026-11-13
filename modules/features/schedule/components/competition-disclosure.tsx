import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import type { CompetitionDisclosureModel, MatchRowModel } from '../contracts';
import MatchRow from './match-row';
import DisclosureChevron from './disclosure-chevron';

type Props = {
  disclosure: CompetitionDisclosureModel;
};

type DisclosureHeaderProps = {
  label: string;
  matchCount: number;
  expanded: boolean;
  onPress: () => void;
};

type DisclosureTitleProps = {
  label: string;
};

type DisclosureMatchesProps = {
  matches: MatchRowModel[];
};

export default function CompetitionDisclosure({ disclosure }: Props) {
  const [expanded, setExpanded] = useState(true);
  const { label, matches } = disclosure;
  const toggleExpanded = () => setExpanded((isOpen) => !isOpen);

  return (
    <View className="mt-2">
      <DisclosureHeader
        label={label}
        matchCount={matches.length}
        expanded={expanded}
        onPress={toggleExpanded}
      />
      {expanded ? <DisclosureMatches matches={matches} /> : null}
    </View>
  );
}

function DisclosureHeader(header: DisclosureHeaderProps) {
  const { label, matchCount, expanded, onPress } = header;
  const countLabel = matchCountLabel(matchCount);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${countLabel}`}
      accessibilityState={{ expanded }}
      onPress={onPress}
      className="min-h-11 flex-row items-center gap-2 py-2"
    >
      <DisclosureTitle label={label} />
      <Text className="text-[13px] font-semibold text-muted">{matchCount}</Text>
      <DisclosureChevron expanded={expanded} />
    </Pressable>
  );
}

function DisclosureTitle({ label }: DisclosureTitleProps) {
  return (
    <Text
      className="min-w-0 flex-1 text-[13px] font-bold text-foreground"
      numberOfLines={1}
    >
      {label}
    </Text>
  );
}

function DisclosureMatches({ matches }: DisclosureMatchesProps) {
  const lastIndex = matches.length - 1;

  return (
    <View>
      {matches.map((match, index) => (
        <MatchRow key={match.id} match={match} isLast={index === lastIndex} />
      ))}
    </View>
  );
}

function matchCountLabel(matchCount: number): string {
  return matchCount === 1 ? '1 match' : `${matchCount} matches`;
}
