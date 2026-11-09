import { notice } from './notice';

describe('notice', () => {
  it('hides a ready board', () => {
    expect(notice({ status: 'ok' })).toBeNull();
  });

  it('explains a loading board', () => {
    expect(notice({ status: 'loading' })).toBe('Loading schedule…');
  });

  it('explains an unconfigured board', () => {
    expect(notice({ status: 'unconfigured' })).toBe(
      'Schedule API is not configured.'
    );
  });

  it('uses the adapter message on error', () => {
    expect(notice({ status: 'error', message: 'PandaScore 502' })).toBe(
      'PandaScore 502'
    );
  });

  it('falls back when an error has no message', () => {
    expect(notice({ status: 'error' })).toBe("Couldn't load schedule.");
  });
});
