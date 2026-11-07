import { jsonValue } from './json-value';
import { parseList } from './parse-list';

describe('parseList', () => {
  it('maps every item', () => {
    expect(parseList(['  a  ', 'b'], jsonValue.string)).toEqual(['a', 'b']);
  });

  it('returns an empty list', () => {
    expect(parseList([], jsonValue.string)).toEqual([]);
  });

  it('rejects a non-array', () => {
    expect(parseList({ 0: 'a' }, jsonValue.string)).toBeNull();
  });

  it('rejects the list when any item fails', () => {
    expect(parseList(['a', '  '], jsonValue.string)).toBeNull();
  });
});
