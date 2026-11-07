import { LOL } from './live.harness';
import { parseGame } from './parse-game';

describe('parseGame', () => {
  it('maps a complete game', () => {
    expect(parseGame(LOL)).toEqual(LOL);
  });

  it('rejects a non-object', () => {
    expect(parseGame(null)).toBeNull();
  });

  it('rejects a game missing a name field', () => {
    expect(parseGame({ id: 'lol', shortName: 'LoL' })).toBeNull();
  });

  it('rejects blank fields', () => {
    expect(parseGame({ ...LOL, name: '  ' })).toBeNull();
  });
});
