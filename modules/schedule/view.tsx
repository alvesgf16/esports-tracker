import { StyleSheet, View } from 'react-native';

import Colors from '@/constants/colors';

import type { ScheduleViewModel } from './contracts';
import DayList from './components/day-list';
import GameChips from './components/game-chips';

const palette = Colors.dark;

type Props = {
  model: ScheduleViewModel;
  onSelectGame: (game: ScheduleViewModel['selected']) => void;
};

export default function ScheduleView({ model, onSelectGame }: Props) {
  return (
    <View style={styles.screen}>
      <GameChips
        chips={model.chips}
        selected={model.selected}
        onSelect={onSelectGame}
      />
      <DayList groups={model.groups} emptyMessage={model.emptyMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
