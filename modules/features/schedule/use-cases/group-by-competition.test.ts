import { aMatch } from '@/modules/shared/shared.harness';

import { groupByCompetition } from './group-by-competition';

describe('groupByCompetition', () => {
  it('keeps mixed titles in separate sections', () => {
    const matches = [
      aMatch({ id: 'lec', tournament: 'LEC · Spring' }),
      aMatch({
        id: 'blast',
        game: 'cs2',
        tournament: 'BLAST · Open',
      }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups.map((group) => group.tournament)).toEqual([
      'LEC · Spring',
      'BLAST · Open',
    ]);
  });

  it('keeps matches that share a competition in one section', () => {
    const matches = [
      aMatch({ id: 'a' }),
      aMatch({ id: 'other', tournament: 'LCK · Cup' }),
      aMatch({ id: 'b' }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups).toHaveLength(2);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['a', 'b']);
  });

  it('treats the same tournament name on different games as distinct', () => {
    const matches = [
      aMatch({ id: 'lol', game: 'lol', tournament: 'ESL · Open' }),
      aMatch({ id: 'cs', game: 'cs2', tournament: 'ESL · Open' }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups.map((group) => group.game)).toEqual(['lol', 'cs2']);
  });
});
