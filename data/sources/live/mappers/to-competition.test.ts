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
        imageUrl: 'https://cdn.pandascore.co/images/league/image/1/lec.png',
      })
    ).toEqual({
      title: 'LEC · Spring',
      imageUrl: 'https://cdn.pandascore.co/images/league/image/1/lec.png',
    });
  });

  it('rejects a blank title', () => {
    expect(toCompetition({ title: '  ' })).toBeNull();
  });

  it('omits a blank image url', () => {
    expect(toCompetition({ title: 'LEC · Spring', imageUrl: '  ' })).toEqual({
      title: 'LEC · Spring',
    });
  });

  it('omits an image url that is not on an allowed host', () => {
    expect(
      toCompetition({
        title: 'LEC · Spring',
        imageUrl: 'https://127.0.0.1/lec.png',
      })
    ).toEqual({ title: 'LEC · Spring' });
  });
});
