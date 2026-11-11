import { asOrNull } from './as-or-null';

describe('asOrNull.record', () => {
  it('returns a plain object', () => {
    const value = { id: 'lol' };

    const record = asOrNull.record(value);

    expect(record).toBe(value);
  });

  it('rejects null, arrays, and primitives', () => {
    expect(asOrNull.record(null)).toBeNull();
    expect(asOrNull.record([])).toBeNull();
    expect(asOrNull.record('lol')).toBeNull();
  });
});

describe('asOrNull.string', () => {
  it('returns a non-empty string', () => {
    expect(asOrNull.string('  LoL  ')).toBe('LoL');
  });

  it('rejects blank strings and non-strings', () => {
    expect(asOrNull.string('  ')).toBeNull();
    expect(asOrNull.string(1)).toBeNull();
  });
});

describe('asOrNull.number', () => {
  it('returns a non-negative integer', () => {
    expect(asOrNull.number(0)).toBe(0);
    expect(asOrNull.number(2)).toBe(2);
  });

  it('rejects fractions, negatives, and non-numbers', () => {
    expect(asOrNull.number(1.5)).toBeNull();
    expect(asOrNull.number(-1)).toBeNull();
    expect(asOrNull.number('2')).toBeNull();
  });
});

describe('asOrNull.array', () => {
  it('returns an array', () => {
    const value = ['lol'];

    const items = asOrNull.array(value);

    expect(items).toBe(value);
  });

  it('rejects non-arrays', () => {
    expect(asOrNull.array({ length: 1 })).toBeNull();
  });
});
