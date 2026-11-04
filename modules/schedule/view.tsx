import { Text, View } from 'react-native';

import type { ScheduleViewModel } from './contracts';
import DayList from './components/day-list';
import GameChips from './components/game-chips';

type Props = {
  model: ScheduleViewModel;
  notice?: string | null;
  onSelectGame: (game: ScheduleViewModel['selected']) => void;
};

export default function ScheduleView({ model, notice, onSelectGame }: Props) {
  return (
    <View className="flex-1 bg-background">
      <GameChips
        chips={model.chips}
        selected={model.selected}
        onSelect={onSelectGame}
      />
      {notice ? <NoticeBanner text={notice} /> : null}
      <DayList groups={model.groups} emptyMessage={model.emptyMessage} />
    </View>
  );
}

function NoticeBanner({ text }: { text: string }) {
  return (
    <Text className="px-4 pb-1 text-center text-[13px] text-muted">{text}</Text>
  );
}
