import { aCompetition, aMatch } from '@/modules/shared/shared.harness';

import { groupByCompetition } from './group-by-competition';

describe('groupByCompetition', () => {
  it('keeps mixed titles in separate sections', () => {
    const matches = [
      aMatch({ id: 'lec', competition: aCompetition('LEC · Spring') }),
      aMatch({
        id: 'blast',
        game: 'cs2',
        competition: aCompetition('BLAST · Open'),
      }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups.map((group) => group.competition.title)).toEqual([
      'LEC · Spring',
      'BLAST · Open',
    ]);
  });

  it('lifts a competition image from any match in the group', () => {
    const groups = groupByCompetition([
      aMatch({ id: 'a' }),
      aMatch({
        id: 'b',
        competition: aCompetition(
          'LEC · Spring',
          'https://cdn.example/lec.png'
        ),
      }),
    ]);

    expect(groups[0].competition).toEqual({
      title: 'LEC · Spring',
      imageUrl: 'https://cdn.example/lec.png',
    });
  });

  it('keeps matches that share a competition in one section', () => {
    const matches = [
      aMatch({ id: 'a' }),
      aMatch({ id: 'other', competition: aCompetition('LCK · Cup') }),
      aMatch({ id: 'b' }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups).toHaveLength(2);
    expect(groups[0].matches.map((match) => match.id)).toEqual(['a', 'b']);
  });

  it('treats the same competition title on different games as distinct', () => {
    const matches = [
      aMatch({
        id: 'lol',
        game: 'lol',
        competition: aCompetition('ESL · Open'),
      }),
      aMatch({
        id: 'cs',
        game: 'cs2',
        competition: aCompetition('ESL · Open'),
      }),
    ];

    const groups = groupByCompetition(matches);

    expect(groups.map((group) => group.game)).toEqual(['lol', 'cs2']);
  });

  it('keeps competitions distinct when titles share a colon', () => {
    const matches = [
      aMatch({
        id: 'a',
        game: 'lol',
        competition: aCompetition('LEC:Spring'),
      }),
      aMatch({
        id: 'b',
        game: 'lol:LEC',
        competition: aCompetition('Spring'),
      }),
    ];

    const groups = groupByCompetition(matches);

    expect(
      groups.map((group) => group.matches.map((match) => match.id))
    ).toEqual([['a'], ['b']]);
  });
});
