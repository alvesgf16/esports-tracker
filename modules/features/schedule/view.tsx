import { View } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

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
      {notice ? <NoticeBanner text={notice} className="px-4 pb-1" /> : null}
      <DayList groups={model.groups} emptyMessage={model.emptyMessage} />
    </View>
  );
}
