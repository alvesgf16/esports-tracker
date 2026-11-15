import { aMatch, hoursFromNow } from '@/modules/shared/shared.harness';

import {
  stubMatchCatalog,
  stubScheduleClock,
  todayAndTomorrowMatches,
} from '../schedule.harness';
import { listMatchesFor } from './list-matches-for';

const dayBoard = [
  aMatch({
    id: 'live-lol',
    game: 'lol',
    startsAt: hoursFromNow(-0.5),
    status: 'running',
  }),
  aMatch({
    id: 'live-cs2',
    game: 'cs2',
    startsAt: hoursFromNow(-0.25),
    status: 'running',
  }),
  aMatch({ id: 'soon-lol', game: 'lol', startsAt: hoursFromNow(0.5) }),
  aMatch({ id: 'upcoming-lol', game: 'lol', startsAt: hoursFromNow(2) }),
  aMatch({ id: 'tomorrow-lol', game: 'lol', startsAt: hoursFromNow(26) }),
  aMatch({ id: 'finished-lol', game: 'lol', startsAt: hoursFromNow(-4) }),
];

describe('listMatchesFor', () => {
  it('keeps visible matches on the selected day for All', () => {
    const matches = stubMatchCatalog({
      list: () => [
        ...todayAndTomorrowMatches(),
        aMatch({ id: 'finished', startsAt: hoursFromNow(-4) }),
      ],
    });

    expect(
      listMatchesFor(null, '2026-03-15', {
        matches,
        clock: stubScheduleClock(),
      }).map((match) => match.id)
    ).toEqual(['today']);
  });

  it('keeps only live rows when status is Live', () => {
    const matches = stubMatchCatalog({ list: () => dayBoard });

    expect(
      listMatchesFor(null, '2026-03-15', {
        matches,
        clock: stubScheduleClock(),
        statusFilter: 'live',
      }).map((match) => match.id)
    ).toEqual(['live-lol', 'live-cs2']);
  });

  it('keeps soon and upcoming rows when status is Upcoming', () => {
    const matches = stubMatchCatalog({ list: () => dayBoard });

    expect(
      listMatchesFor(null, '2026-03-15', {
        matches,
        clock: stubScheduleClock(),
        statusFilter: 'upcoming',
      }).map((match) => match.id)
    ).toEqual(['soon-lol', 'upcoming-lol']);
  });

  it('returns the intersection of game and status filters', () => {
    const matches = stubMatchCatalog({ list: () => dayBoard });

    expect(
      listMatchesFor('lol', '2026-03-15', {
        matches,
        clock: stubScheduleClock(),
        statusFilter: 'live',
      }).map((match) => match.id)
    ).toEqual(['live-lol']);
  });
});
