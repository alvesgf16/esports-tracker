import { Text, View } from 'react-native';

import type { MatchSideModel, SideEmphasis } from '../contracts';
import RemoteLogo from './remote-logo';

type Props = {
  side: MatchSideModel;
};

type SideScoreProps = {
  score: string | null;
  tone: string;
};

type SideLogoProps = {
  uri: string | null;
  onError?: () => void;
};

export default function SideRow({ side }: Props) {
  const tone = sideTone(side.emphasis);

  return (
    <View className="flex-row items-center gap-2">
      {side.imageUrl !== undefined && (
        <SideLogo uri={side.imageUrl} onError={side.onLogoError} />
      )}
      <Text className={`min-w-0 flex-1 text-[15px] ${tone}`} numberOfLines={1}>
        {side.name}
      </Text>
      <SideScore score={side.score} tone={tone} />
    </View>
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

function SideLogo({ uri, onError }: SideLogoProps) {
  return (
    <View
      className="items-center justify-center"
      style={{ width: 32, height: 32 }}
    >
      {uri && onError && <RemoteLogo key={uri} uri={uri} onError={onError} />}
    </View>
  );
}

function SideScore({ score, tone }: SideScoreProps) {
  return (
    <Text className={`w-6 text-right text-[15px] ${tone}`}>{score ?? ''}</Text>
  );
}
