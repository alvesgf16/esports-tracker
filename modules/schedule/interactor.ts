import { getGame, GAMES, type Game } from '@/data/games';
import type { GameFilter, GameId, Match } from '@/data/types';

import { groupByDay, type DayGroup } from './day-groups';
import { matchStatus, type MatchStatus } from './match-status';
import { gameName, parseFilter } from './parse-filter';
import { visibleMatches } from './visible-matches';

export type ScheduleInteractor = {
  parseFilter: (value: string | string[] | undefined) => GameFilter | null;
  matchStatus: (startsAt: string, now?: number) => MatchStatus;
  visibleMatches: (game: GameFilter, now?: number) => Match[];
  groupByDay: (matches: Match[], now?: number) => DayGroup[];
  gameName: (id: GameId) => string;
  listGames: () => Game[];
  getGame: (id: GameId) => Game;
};

export const scheduleInteractor: ScheduleInteractor = {
  parseFilter,
  matchStatus,
  visibleMatches,
  groupByDay,
  gameName,
  listGames: () => GAMES,
  getGame,
};
