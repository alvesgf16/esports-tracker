export type GameId = string;

export type Game = {
  id: GameId;
  name: string;
  shortName: string;
};

export type MatchStatus = 'not_started' | 'running' | 'finished';

export type Team = {
  name: string;
  shortName: string;
};

export type Match = {
  id: string;
  game: GameId;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
  teams: Team[];
  status?: MatchStatus;
};

export type MatchesSnapshot = {
  matches: Match[];
  referenceTime: number;
};
