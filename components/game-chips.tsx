import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/colors';
import { GAMES } from '@/data/games';
import type { GameFilter } from '@/data/types';

const palette = Colors.dark;

type Props = {
  selected: GameFilter;
  onSelect: (game: GameFilter) => void;
};

type Chip = {
  id: GameFilter;
  label: string;
};

type ChipProps = {
  chip: Chip;
  selected: GameFilter;
  onSelect: (game: GameFilter) => void;
};

const FILTERS: Chip[] = [
  { id: 'all', label: 'All' },
  ...GAMES.map((game) => ({ id: game.id, label: game.shortName })),
];

export default function GameChips({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.row}
    >
      {FILTERS.map((filter) => (
        <FilterChip
          key={filter.id}
          chip={filter}
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
