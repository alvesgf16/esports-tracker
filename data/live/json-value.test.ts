import { jsonValue } from './json-value';

describe('jsonValue.record', () => {
  it('returns a plain object', () => {
    const value = { id: 'lol' };

    expect(jsonValue.record(value)).toBe(value);
  });

  it('rejects null, arrays, and primitives', () => {
    expect(jsonValue.record(null)).toBeNull();
    expect(jsonValue.record([])).toBeNull();
    expect(jsonValue.record('lol')).toBeNull();
  });
});

describe('jsonValue.string', () => {
  it('returns a non-empty string', () => {
    expect(jsonValue.string('  LoL  ')).toBe('LoL');
  });

  it('rejects blank strings and non-strings', () => {
    expect(jsonValue.string('  ')).toBeNull();
    expect(jsonValue.string(1)).toBeNull();
  });
});

describe('jsonValue.array', () => {
  it('returns an array', () => {
    const value = ['lol'];

    expect(jsonValue.array(value)).toBe(value);
  });

  it('rejects non-arrays', () => {
    expect(jsonValue.array({ length: 1 })).toBeNull();
  });
});
