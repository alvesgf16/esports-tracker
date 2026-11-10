import { LOL } from '../live.harness';
import { toGame } from './to-game';

describe('toGame', () => {
  it('maps a complete game', () => {
    expect(toGame(LOL)).toEqual(LOL);
  });

  it('rejects a non-object', () => {
    expect(toGame(null)).toBeNull();
  });

  it('rejects a game missing a name field', () => {
    expect(toGame({ id: 'lol', shortName: 'LoL' })).toBeNull();
  });

  it('rejects blank fields', () => {
    expect(toGame({ ...LOL, name: '  ' })).toBeNull();
  });
});
