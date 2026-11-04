import { View } from 'react-native';

import type { ScheduleViewModel } from './contracts';
import DayList from './components/day-list';
import GameChips from './components/game-chips';

type Props = {
  model: ScheduleViewModel;
  onSelectGame: (game: ScheduleViewModel['selected']) => void;
};

export default function ScheduleView({ model, onSelectGame }: Props) {
  return (
    <View className="flex-1 bg-background">
      <GameChips
        chips={model.chips}
        selected={model.selected}
        onSelect={onSelectGame}
      />
      <DayList groups={model.groups} emptyMessage={model.emptyMessage} />
    </View>
  );
}
