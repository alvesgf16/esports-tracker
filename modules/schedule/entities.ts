import type { GameId } from '@/modules/games/entities';

export type GameFilter = GameId | 'all';

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
