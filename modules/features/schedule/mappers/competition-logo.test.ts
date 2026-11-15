import { competitionLogo } from './competition-logo';

const URL = 'https://cdn.pandascore.co/images/league/image/1/lec.png';

describe('competitionLogo', () => {
  it('omits a logo before the client is ready', () => {
    expect(
      competitionLogo(URL, {
        isClient: false,
        failedUrls: new Set(),
        markAsFailed: jest.fn(),
      })
    ).toEqual({});
  });

  it('includes a ready logo and reports failures', () => {
    const markAsFailed = jest.fn();
    const logo = competitionLogo(URL, {
      isClient: true,
      failedUrls: new Set(),
      markAsFailed,
    });

    expect(logo.imageUrl).toBe(URL);
    logo.onLogoError?.();
    expect(markAsFailed).toHaveBeenCalledWith(URL);
  });
});
