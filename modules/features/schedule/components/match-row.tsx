import { Text, View } from 'react-native';

import type { MatchRowModel, MatchSideModel, SideEmphasis } from '../contracts';

type Props = {
  match: MatchRowModel;
  isLast: boolean;
};

type MatchRowContentProps = {
  match: MatchRowModel;
};

type SideRowProps = {
  side: MatchSideModel;
};

type SideScoreProps = {
  score: string | null;
  tone: string;
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

function SideRow({ side }: SideRowProps) {
  const tone = sideTone(side.emphasis);

  return (
    <View className="flex-row items-center gap-2">
      <Text className={`min-w-0 flex-1 text-[15px] ${tone}`} numberOfLines={1}>
        {side.name}
      </Text>
      <SideScore score={side.score} tone={tone} />
    </View>
  );
}

function SideScore({ score, tone }: SideScoreProps) {
  return (
    <Text className={`w-6 text-right text-[15px] ${tone}`}>{score ?? ''}</Text>
  );
}

function sideTone(emphasis: SideEmphasis): string {
  if (emphasis === 'winner') {
    return 'font-bold text-foreground';
  }

  if (emphasis === 'loser') {
    return 'font-semibold text-muted';
  }

  return 'font-semibold text-foreground';
}
