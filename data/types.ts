export type GameId = 'lol' | 'cs2' | 'valorant' | 'dota2' | 'r6' | 'mlbb';

export type Team = {
  name: string;
  shortName: string;
};

export type Match = {
  id: string;
  game: GameId;
  tournament: string;
  format: string;
  startsAt: string;
  teamA: Team;
  teamB: Team;
};
