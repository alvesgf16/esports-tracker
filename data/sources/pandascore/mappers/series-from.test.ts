import type { Team } from '@/modules/shared/entities';

import { aVendorMatch } from '../pandascore.harness';
import type { VendorMatch } from '../vendor-types';

import { seriesFrom } from './series-from';

const ALPHA_BETA: Team[] = [
  { id: '11', name: 'Alpha', shortName: 'ALP' },
  { id: '22', name: 'Beta', shortName: 'BET' },
];

describe('seriesFrom', () => {
  it('joins results to opponent ids for each side', () => {
    const series = seriesOn({
      results: [
        { team_id: 22, score: 1 },
        { team_id: 11, score: 2 },
      ],
      winner_id: 11,
    });

    expect(series).toEqual({
      scores: [
        { teamId: '11', score: 2 },
        { teamId: '22', score: 1 },
      ],
      winnerId: '11',
    });
  });

  it('omits scores when results are empty', () => {
    const series = seriesOn({ results: [], winner_id: null });

    expect(series).toEqual({});
  });

  it('omits scores when results are missing', () => {
    const series = seriesOn({ results: undefined, winner_id: undefined });

    expect(series).toEqual({});
  });

  it('maps a present score and skips a missing one', () => {
    const series = seriesOn({
      results: [{ team_id: 11, score: 1 }],
      winner_id: null,
    });

    expect(series).toEqual({ scores: [{ teamId: '11', score: 1 }] });
  });

  it('skips a result whose score is missing', () => {
    const series = seriesOn({
      results: [
        { team_id: 11, score: 2 },
        { team_id: 22, score: null },
      ],
    });

    expect(series).toEqual({ scores: [{ teamId: '11', score: 2 }] });
  });

  it('keeps a zero score', () => {
    const series = seriesOn({
      results: [
        { team_id: 11, score: 1 },
        { team_id: 22, score: 0 },
      ],
    });

    expect(series.scores).toEqual([
      { teamId: '11', score: 1 },
      { teamId: '22', score: 0 },
    ]);
  });

  it('joins player results to opponent ids', () => {
    const teams: Team[] = [
      { id: '101', name: 'Serral', shortName: 'Serral' },
      { id: '202', name: 'Maru', shortName: 'Maru' },
    ];

    const series = seriesFrom(
      aVendorMatch({
        results: [
          { player_id: 101, score: 3 },
          { player_id: 202, score: 1 },
        ],
        winner_id: 101,
      }),
      teams
    );

    expect(series).toEqual({
      scores: [
        { teamId: '101', score: 3 },
        { teamId: '202', score: 1 },
      ],
      winnerId: '101',
    });
  });

  it('omits a winner that is not an opponent', () => {
    const series = seriesOn({ winner_id: 99 });

    expect(series.winnerId).toBeUndefined();
  });

  it('skips a zero result id', () => {
    const series = seriesOn({
      results: [
        { team_id: 0, score: 2 },
        { team_id: 11, score: 1 },
      ],
    });

    expect(series.scores).toEqual([{ teamId: '11', score: 1 }]);
  });

  it('skips a team without an id', () => {
    const teams: Team[] = [
      { name: 'Alpha', shortName: 'ALP' },
      { id: '22', name: 'Beta', shortName: 'BET' },
    ];

    const series = seriesFrom(
      aVendorMatch({
        results: [
          { team_id: 11, score: 2 },
          { team_id: 22, score: 1 },
        ],
      }),
      teams
    );

    expect(series.scores).toEqual([{ teamId: '22', score: 1 }]);
  });
});

function seriesOn(overrides: Partial<VendorMatch>) {
  return seriesFrom(aVendorMatch(overrides), ALPHA_BETA);
}
