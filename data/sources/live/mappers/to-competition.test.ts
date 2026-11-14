import { toCompetition } from './to-competition';

describe('toCompetition', () => {
  it('maps a title', () => {
    expect(toCompetition({ title: 'LEC · Spring' })).toEqual({
      title: 'LEC · Spring',
    });
  });

  it('includes an image url', () => {
    expect(
      toCompetition({
        title: 'LEC · Spring',
        imageUrl: 'https://cdn.example/lec.png',
      })
    ).toEqual({
      title: 'LEC · Spring',
      imageUrl: 'https://cdn.example/lec.png',
    });
  });

  it('rejects a blank title', () => {
    expect(toCompetition({ title: '  ' })).toBeNull();
  });

  it('rejects a blank image url', () => {
    expect(toCompetition({ title: 'LEC · Spring', imageUrl: '  ' })).toBeNull();
  });
});
