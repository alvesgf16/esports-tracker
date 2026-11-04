import { Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/colors';

import type { GameRowModel } from '../contracts';

const palette = Colors.dark;

type Props = {
  row: GameRowModel;
  onPress: (gameId: GameRowModel['id']) => void;
};

export default function GameRow({ row, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={row.accessibilityLabel}
      onPress={() => onPress(row.id)}
      style={styles.row}
    >
      <View>
        <Text style={styles.name}>{row.name}</Text>
        <Text style={styles.meta}>{row.upcomingLabel}</Text>
      </View>
      <Text style={styles.short}>{row.shortName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: palette.card,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: palette.text,
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: palette.muted,
    marginTop: 4,
    fontSize: 13,
  },
  short: {
    color: palette.tint,
    fontSize: 13,
    fontWeight: '700',
  },
});
