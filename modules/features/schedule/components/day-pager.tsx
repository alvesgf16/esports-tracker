import { Pressable, Text, View } from 'react-native';

import type { DayPagerModel } from '../contracts';

type Props = {
  pager: DayPagerModel;
};

type PagerButtonProps = {
  label: string;
  chevron: string;
  onPress: () => void;
};

export default function DayPager({ pager }: Props) {
  return (
    <View className="flex-row items-center px-2">
      <PagerButton label="Previous day" chevron="‹" onPress={pager.onPrev} />
      <Text className="flex-1 text-center text-[15px] font-bold text-foreground">
        {pager.label}
      </Text>
      <PagerButton label="Next day" chevron="›" onPress={pager.onNext} />
    </View>
  );
}

function PagerButton({ label, chevron, onPress }: PagerButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="h-11 w-11 items-center justify-center"
    >
      <Text className="text-2xl leading-none text-foreground">{chevron}</Text>
    </Pressable>
  );
}
