import { View } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

import DayList from './components/day-list';
import GameChips from './components/game-chips';
import type { SchedulePresenter } from './contracts';

type Props = {
  presenter: SchedulePresenter;
};

export default function ScheduleView({ presenter }: Props) {
  return (
    <View className="flex-1 bg-background">
      <GameChips
        chips={presenter.chips}
        selected={presenter.selected}
        onSelect={presenter.setGameFilter}
      />
      {presenter.notice ? (
        <NoticeBanner text={presenter.notice} className="px-4 pb-1" />
      ) : null}
      <DayList
        groups={presenter.groups}
        emptyMessage={presenter.emptyMessage}
      />
    </View>
  );
}
