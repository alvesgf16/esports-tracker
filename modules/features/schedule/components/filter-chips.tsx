import { Pressable, ScrollView, Text } from 'react-native';

import type { ChipModel } from '../contracts';

type Props = {
  gameChips: ChipModel[];
  selectedGameChip: ChipModel['id'];
  statusChips: ChipModel[];
  selectedStatusChip: ChipModel['id'];
};

type ChipStripProps = {
  chips: ChipModel[];
  selected: ChipModel['id'];
};

type ChipProps = {
  chip: ChipModel;
  selected: ChipModel['id'];
};

const chipStripStyle = { flexGrow: 0 };

export default function FilterChips({
  gameChips,
  selectedGameChip,
  statusChips,
  selectedStatusChip,
}: Props) {
  return (
    <>
      <ChipStrip chips={gameChips} selected={selectedGameChip} />
      <ChipStrip chips={statusChips} selected={selectedStatusChip} />
    </>
  );
}

function ChipStrip({ chips, selected }: ChipStripProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="shrink-0"
      style={chipStripStyle}
      contentContainerClassName="items-center gap-2 px-4 py-2.5"
    >
      {chips.map((chip) => (
        <Chip key={chip.id} chip={chip} selected={selected} />
      ))}
    </ScrollView>
  );
}

function Chip({ chip, selected }: ChipProps) {
  const active = chip.id === selected;
  const chipTone = active ? 'bg-tint' : 'bg-chip';
  const labelTone = active ? 'text-on-tint' : 'text-foreground';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={chip.label}
      accessibilityState={{ selected: active }}
      onPress={chip.onPress}
      className={`rounded-full px-3.5 py-2 ${chipTone}`}
    >
      <Text className={`text-[13px] font-semibold ${labelTone}`}>
        {chip.label}
      </Text>
    </Pressable>
  );
}
