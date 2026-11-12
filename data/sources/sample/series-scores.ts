import type { SeriesScore } from '@/modules/shared/entities';

export function seriesScores(
  left: [string, number],
  right: [string, number]
): SeriesScore[] {
  return [
    { teamId: left[0], score: left[1] },
    { teamId: right[0], score: right[1] },
  ];
}
