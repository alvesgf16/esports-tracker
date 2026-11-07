import { presentNotice } from './present-notice';

describe('presentNotice', () => {
  it('hides a ready board', () => {
    expect(presentNotice({ status: 'ok' })).toBeNull();
  });

  it('explains a loading board', () => {
    expect(presentNotice({ status: 'loading' })).toBe('Loading schedule…');
  });

  it('explains an unconfigured board', () => {
    expect(presentNotice({ status: 'unconfigured' })).toBe(
      'Schedule API is not configured.'
    );
  });

  it('uses the adapter message on error', () => {
    expect(presentNotice({ status: 'error', message: 'PandaScore 502' })).toBe(
      'PandaScore 502'
    );
  });

  it('falls back when an error has no message', () => {
    expect(presentNotice({ status: 'error' })).toBe("Couldn't load schedule.");
  });
});
