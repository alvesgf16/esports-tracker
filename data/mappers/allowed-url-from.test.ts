import { allowedUrlFrom } from './allowed-url-from';

describe('allowedUrlFrom', () => {
  it('keeps a pandascore https url', () => {
    const url = 'https://cdn.pandascore.co/images/team/image/1/a.png';

    expect(allowedUrlFrom(url)).toBe(url);
  });

  it('keeps a sample wikia https url', () => {
    expect(
      allowedUrlFrom(
        'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/77/G2.png'
      )
    ).toBe(
      'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/77/G2.png'
    );
  });

  it('omits http and private hosts', () => {
    expect(allowedUrlFrom('http://cdn.pandascore.co/a.png')).toBeUndefined();
    expect(allowedUrlFrom('https://127.0.0.1/a.png')).toBeUndefined();
    expect(allowedUrlFrom('https://cdn.example/a.png')).toBeUndefined();
  });

  it('omits blank and malformed values', () => {
    expect(allowedUrlFrom(undefined)).toBeUndefined();
    expect(allowedUrlFrom('  ')).toBeUndefined();
    expect(allowedUrlFrom('not a url')).toBeUndefined();
  });
});
