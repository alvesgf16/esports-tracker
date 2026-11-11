export type Game = {
  id: string;
  name: string;
  shortName: string;
};

export type MatchStatus = 'not_started' | 'running' | 'finished';

export type Team = {
  id?: string;
  name: string;
  shortName: string;
};

export type SeriesScore = {
  teamId: string;
  score: number;
};

export type Match = {
  id: string;
  game: string;
  name: string;
  tournament: string;
  format: string;
  startsAt: string;
  teams: Team[];
  status?: MatchStatus;
  scores?: SeriesScore[];
  winnerId?: string;
};

export type MatchesSnapshot = {
  matches: Match[];
  referenceTime: number;
};
