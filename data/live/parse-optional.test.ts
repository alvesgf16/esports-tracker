import { asOrNull } from './as-or-null';
import { parseOptional } from './parse-optional';

describe('parseOptional', () => {
  it('keeps undefined as omitted', () => {
    expect(parseOptional(undefined, asOrNull.string)).toBeUndefined();
  });

  it('parses a present value', () => {
    expect(parseOptional('  LoL  ', asOrNull.string)).toBe('LoL');
  });

  it('returns null when the parser rejects', () => {
    expect(parseOptional('  ', asOrNull.string)).toBeNull();
    expect(parseOptional(null, asOrNull.string)).toBeNull();
  });
});
