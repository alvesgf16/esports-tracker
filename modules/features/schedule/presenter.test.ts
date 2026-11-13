import { act, renderHook } from '@testing-library/react-native';

import type {
  GameCatalog,
  MatchCatalog,
  ScheduleBoardState,
  ScheduleLoadState,
} from '@/modules/shared/gateways';
import { aMatch } from '@/modules/shared/shared.harness';

import type { ScheduleClock } from './contracts';
import { useSchedulePresenter } from './presenter';
import { useScheduleRouter } from './router';
import {
  stubGameCatalog,
  stubMatchCatalog,
  stubScheduleClock,
  todayAndTomorrowMatches,
} from './schedule.harness';

jest.mock('./router', () => ({
  useScheduleRouter: jest.fn(),
}));

const NEXT_NOON = Date.UTC(2026, 2, 16, 12, 0, 0, 0);

type BoardOverrides = {
  games?: GameCatalog;
  matches?: MatchCatalog;
  loadState?: ScheduleLoadState;
};

type PresentOverrides = BoardOverrides & {
  gameFilter?: string;
  clock?: ScheduleClock;
};

function stubBoard(overrides: BoardOverrides = {}): ScheduleBoardState {
  return {
    games: overrides.games ?? stubGameCatalog(),
    matches: overrides.matches ?? stubMatchCatalog(),
    loadState: overrides.loadState ?? { status: 'ok' },
  };
}

type HookProps = {
  board: ScheduleBoardState;
  clock: ScheduleClock;
};

async function presentHook(overrides: PresentOverrides = {}) {
  jest.mocked(useScheduleRouter).mockReturnValue({
    gameFilter: overrides.gameFilter,
    setGameFilter: jest.fn(),
  });

  return renderHook(
    ({ board, clock }: HookProps) => useSchedulePresenter(board, clock),
    {
      initialProps: {
        board: stubBoard(overrides),
        clock: overrides.clock ?? stubScheduleClock(),
      },
    }
  );
}

async function present(overrides: PresentOverrides = {}) {
  const { result } = await presentHook(overrides);

  return result.current;
}

describe('useSchedulePresenter', () => {
  it('defaults an invalid game filter to all', async () => {
    const presenter = await present({ gameFilter: 'chess' });

    expect(presenter.selectedChip).toBe('all');
  });

  it('maps a loading board into notice copy', async () => {
    const presenter = await present({ loadState: { status: 'loading' } });

    expect(presenter.notice).toBe('Loading schedule…');
  });

  it('uses injected clock labels for upcoming matches', async () => {
    const match = aMatch({ id: 'soon-1' });
    const presenter = await present({
      matches: stubMatchCatalog({
        list: () => [match],
      }),
    });

    expect(presenter.groups[0].matches[0]).toMatchObject({
      kickoffLabel: `kickoff:${match.startsAt}`,
      countdownLabel: `countdown:${match.startsAt}`,
    });
  });

  it('defaults the pager to Today', async () => {
    const presenter = await present();

    expect(presenter.dayPager.label).toBe('Today');
  });

  it('hides matches from other days', async () => {
    const presenter = await present({
      matches: stubMatchCatalog({
        list: todayAndTomorrowMatches,
      }),
    });

    expect(presenter.groups[0].matches.map((match) => match.id)).toEqual([
      'today',
    ]);
  });

  it('pages to the next calendar day', async () => {
    const { result } = await presentHook({
      matches: stubMatchCatalog({
        list: todayAndTomorrowMatches,
      }),
    });

    await act(() => {
      result.current.dayPager.onNext();
    });

    expect(result.current.dayPager.label).toBe('Tomorrow');
    expect(result.current.groups[0].matches.map((match) => match.id)).toEqual([
      'tomorrow',
    ]);
  });

  it('uses the empty message when the selected day has no matches', async () => {
    const { result } = await presentHook();

    await act(() => {
      result.current.dayPager.onPrev();
    });

    expect(result.current.groups).toEqual([]);
    expect(result.current.emptyMessage).toBe('No upcoming matches.');
  });

  it('follows today across midnight until the user pages away', async () => {
    const matches = stubMatchCatalog({
      list: todayAndTomorrowMatches,
    });
    const { result, rerender } = await presentHook({ matches });

    await act(() => {
      rerender({
        board: stubBoard({ matches }),
        clock: stubScheduleClock({ now: NEXT_NOON }),
      });
    });

    expect(result.current.dayPager.label).toBe('Today');
    expect(result.current.groups[0].matches.map((match) => match.id)).toEqual([
      'tomorrow',
    ]);
  });

  it('keeps a paged day when midnight passes', async () => {
    const { result, rerender } = await presentHook();

    await act(() => {
      result.current.dayPager.onPrev();
    });

    await act(() => {
      rerender({
        board: stubBoard(),
        clock: stubScheduleClock({ now: NEXT_NOON }),
      });
    });

    expect(result.current.dayPager.label).toBe(
      stubScheduleClock().calendar.heading('2026-03-14')
    );
  });
});
