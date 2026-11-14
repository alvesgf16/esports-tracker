import { Text, View } from 'react-native';

import type { MatchRowModel } from '../contracts';
import SideRow from './side-row';

type Props = {
  match: MatchRowModel;
  isLast: boolean;
};

type MatchRowContentProps = {
  match: MatchRowModel;
};

export default function MatchRow({ match, isLast }: Props) {
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
      <SideRow side={match.left} />
      <SideRow side={match.right} />
      <Text className="mt-0.5 text-xs text-muted" numberOfLines={1}>
        {match.format}
      </Text>
    </View>
  );
}
