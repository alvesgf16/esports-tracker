import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

import Colors from '@/constants/Colors';
import { GAMES } from '@/data/games';
import type { GameId } from '@/data/types';

const palette = Colors.dark;

export type GameFilter = GameId | 'all';

type Props = {
  selected: GameFilter;
  onSelect: (game: GameFilter) => void;
};

const FILTERS: { id: GameFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  ...GAMES.map((game) => ({ id: game.id, label: game.shortName })),
];

export default function GameChips({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.row}>
      {FILTERS.map((filter) => {
        const active = filter.id === selected;
        return (
          <Pressable
            key={filter.id}
            accessibilityRole="button"
            accessibilityLabel={filter.label}
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(filter.id)}
            style={[styles.chip, active && styles.chipActive]}>
            <Text style={[styles.label, active && styles.labelActive]}>{filter.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
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
