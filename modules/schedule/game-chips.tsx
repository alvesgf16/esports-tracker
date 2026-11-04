import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/colors';

import type { ChipModel } from './contracts';

const palette = Colors.dark;

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

export default function GameChips({ chips, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.row}
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
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={chip.label}
      accessibilityState={{ selected: active }}
      onPress={() => onSelect(chip.id)}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>
        {chip.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroller: {
    flexGrow: 0,
  },
  row: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: palette.chip,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: palette.tint,
  },
  label: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '600',
  },
  labelActive: {
    color: '#111318',
  },
});
