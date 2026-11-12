import { asOrNull } from './as-or-null';
import { parseSome } from './parse-some';

describe('parseSome', () => {
  it('maps every valid item', () => {
    expect(parseSome(['  a  ', 'b'], asOrNull.string)).toEqual(['a', 'b']);
  });

  it('skips items that fail', () => {
    expect(parseSome(['a', '  ', 'b'], asOrNull.string)).toEqual(['a', 'b']);
  });

  it('returns an empty list', () => {
    expect(parseSome([], asOrNull.string)).toEqual([]);
  });

  it('rejects a non-array', () => {
    expect(parseSome({ 0: 'a' }, asOrNull.string)).toBeNull();
  });
});
