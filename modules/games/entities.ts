export type GameId = 'lol' | 'cs2' | 'valorant' | 'dota2' | 'r6' | 'mlbb';

export type Game = {
  id: GameId;
  name: string;
  shortName: string;
};
