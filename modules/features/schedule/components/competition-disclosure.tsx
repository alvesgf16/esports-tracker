import { Pressable, Text, View } from 'react-native';

import type { CompetitionDisclosureModel, MatchRowModel } from '../contracts';
import DisclosureChevron from './disclosure-chevron';
import DisclosureLogo from './disclosure-logo';
import MatchRow from './match-row';

type Props = {
  disclosure: CompetitionDisclosureModel;
};

type DisclosureHeaderProps = {
  label: string;
  imageUrl?: string;
  onLogoError?: () => void;
  matchCount: number;
  expanded: boolean;
  onPress: () => void;
};

type DisclosureTitleProps = {
  label: string;
  imageUrl?: string;
  onLogoError?: () => void;
};

type DisclosureMatchesProps = {
  matches: MatchRowModel[];
};

export default function CompetitionDisclosure({ disclosure }: Props) {
  const { label, imageUrl, onLogoError, matches, expanded, onToggle } =
    disclosure;

  return (
    <View className="mt-2">
      <DisclosureHeader
        label={label}
        imageUrl={imageUrl}
        onLogoError={onLogoError}
        matchCount={matches.length}
        expanded={expanded}
        onPress={onToggle}
      />
      {expanded && <DisclosureMatches matches={matches} />}
    </View>
  );
}

function DisclosureHeader(header: DisclosureHeaderProps) {
  const { label, matchCount, expanded, onPress } = header;
  const countLabel = matchCount === 1 ? '1 match' : `${matchCount} matches`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${countLabel}`}
      accessibilityState={{ expanded }}
      onPress={onPress}
      className="min-h-11 flex-row items-center gap-2 py-2"
    >
      <DisclosureTitle {...header} />
      <Text className="text-[13px] font-semibold text-muted">{matchCount}</Text>
      <DisclosureChevron expanded={expanded} />
    </Pressable>
  );
}

function DisclosureTitle({
  label,
  imageUrl,
  onLogoError,
}: DisclosureTitleProps) {
  return (
    <View className="min-w-0 flex-1 flex-row items-center gap-1.5">
      <DisclosureLogo imageUrl={imageUrl} onLogoError={onLogoError} />
      <Text
        className="min-w-0 flex-1 text-[13px] font-bold text-foreground"
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
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
