import { View } from 'react-native';

import NoticeBanner from '@/modules/shared/components/notice-banner';

import DayPager from './components/day-pager';
import GameChips from './components/game-chips';
import MatchDayList from './components/match-day-list';
import type { SchedulePresenter } from './contracts';

type Props = {
  presenter: SchedulePresenter;
};

export default function ScheduleView({ presenter }: Props) {
  return (
    <View className="flex-1 bg-background">
      <GameChips chips={presenter.chips} selected={presenter.selectedChip} />
      <DayPager pager={presenter.dayPager} />
      {presenter.notice ? (
        <NoticeBanner text={presenter.notice} className="px-4 pb-1" />
      ) : null}
      <MatchDayList
        groups={presenter.groups}
        emptyMessage={presenter.emptyMessage}
      />
    </View>
  );
}
