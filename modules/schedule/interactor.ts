import { getGame, GAMES } from '@/data/games';
import type { Game, GameId } from '@/modules/games/entities';

import type { GameFilter, Match } from './entities';

import { groupByDay, type DayGroup } from './helpers/day-groups';
import { matchStatus, type MatchStatus } from './helpers/match-status';
import { gameName, parseFilter } from './helpers/parse-filter';
import { visibleMatches } from './helpers/visible-matches';

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
