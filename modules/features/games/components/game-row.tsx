import { Pressable, Text, View } from 'react-native';

import type { GameRowModel } from '../contracts';

type Props = {
  row: GameRowModel;
};

export default function GameRow({ row }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={row.accessibilityLabel}
      onPress={row.onPress}
      className="flex-row items-center justify-between rounded-card bg-card p-4"
    >
      <View>
        <Text className="text-base font-bold text-foreground">{row.name}</Text>
        <Text className="mt-1 text-[13px] text-muted">{row.upcomingLabel}</Text>
      </View>
      <Text className="text-[13px] font-bold text-tint">{row.shortName}</Text>
    </Pressable>
  );
}
