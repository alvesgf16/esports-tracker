import { sideLogo } from './side-logo';

const URL = 'https://cdn.pandascore.co/images/team/image/1/a.png';

describe('sideLogo', () => {
  it('keeps an empty crest slot when the logo is not ready', () => {
    expect(
      sideLogo(URL, {
        isClient: false,
        failedUrls: new Set(),
        markAsFailed: jest.fn(),
      })
    ).toEqual({ imageUrl: null });
  });

  it('includes a ready logo', () => {
    expect(
      sideLogo(URL, {
        isClient: true,
        failedUrls: new Set(),
        markAsFailed: jest.fn(),
      })
    ).toMatchObject({ imageUrl: URL });
  });
});
