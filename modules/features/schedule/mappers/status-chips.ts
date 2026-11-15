import type { ChipModel, StatusFilter } from '../contracts';

export function statusChips(
  liveCount: number,
  setStatusFilter: (status: StatusFilter) => void
): ChipModel[] {
  return [
    { id: 'all', label: 'All', onPress: () => setStatusFilter('all') },
    {
      id: 'live',
      label: `Live (${liveCount})`,
      onPress: () => setStatusFilter('live'),
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      onPress: () => setStatusFilter('upcoming'),
    },
  ];
}
