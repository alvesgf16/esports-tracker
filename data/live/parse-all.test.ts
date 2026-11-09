import { asOrNull } from './as-or-null';
import { parseAll } from './parse-all';

describe('parseAll', () => {
  it('maps every item', () => {
    expect(parseAll(['  a  ', 'b'], asOrNull.string)).toEqual(['a', 'b']);
  });

  it('returns an empty list', () => {
    expect(parseAll([], asOrNull.string)).toEqual([]);
  });

  it('rejects a non-array', () => {
    expect(parseAll({ 0: 'a' }, asOrNull.string)).toBeNull();
  });

  it('rejects the list when any item fails', () => {
    expect(parseAll(['a', '  '], asOrNull.string)).toBeNull();
  });
});
