import { competitionWithOptionalImage } from './competition-with-optional-image';

describe('competitionWithOptionalImage', () => {
  it('includes imageUrl when present', () => {
    expect(
      competitionWithOptionalImage({
        title: 'LEC · Spring',
        imageUrl: 'https://cdn.example/lec.png',
      })
    ).toEqual({
      title: 'LEC · Spring',
      imageUrl: 'https://cdn.example/lec.png',
    });
  });

  it('omits imageUrl when missing', () => {
    expect(competitionWithOptionalImage({ title: 'LEC · Spring' })).toEqual({
      title: 'LEC · Spring',
    });
  });
});
