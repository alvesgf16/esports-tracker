import { Pressable, ScrollView, Text, View } from 'react-native';

import type { ChipModel } from '../contracts';

type Props = {
  chips: ChipModel[];
  selected: ChipModel['id'];
  onSelect: (game: ChipModel['id']) => void;
};

type ChipProps = {
  chip: ChipModel;
  selected: ChipModel['id'];
  onSelect: (game: ChipModel['id']) => void;
};

const chipStripStyle = { flexGrow: 0 };

export default function GameChips({ chips, selected, onSelect }: Props) {
  return (
    <View className="shrink-0">
      <ChipStrip chips={chips} selected={selected} onSelect={onSelect} />
    </View>
  );
}

function ChipStrip({ chips, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={chipStripStyle}
      contentContainerClassName="items-center gap-2 px-4 py-2.5"
    >
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          chip={chip}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  );
}

function FilterChip({ chip, selected, onSelect }: ChipProps) {
  const active = chip.id === selected;
  const chipTone = active ? 'bg-tint' : 'bg-chip';
  const labelTone = active ? 'text-on-tint' : 'text-foreground';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={chip.label}
      accessibilityState={{ selected: active }}
      onPress={() => onSelect(chip.id)}
      className={`rounded-full px-3.5 py-2 ${chipTone}`}
    >
      <Text className={`text-[13px] font-semibold ${labelTone}`}>
        {chip.label}
      </Text>
    </Pressable>
  );
}
