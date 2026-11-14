import { matchesForKnownGames } from '@/data/mappers/matches-for-known-games';
import type { Game, Match } from '@/modules/shared/entities';

import { listVideogames } from './list-videogames';
import { gameFrom } from './mappers/game-from';
import { matchFrom } from './mappers/match-from';
import { pandascoreRequest } from './pandascore-request';
import type { ScheduleBoard } from './schedule-board';
import type { VendorMatch, VendorVideogame } from './vendor-types';

const PAGE_SIZE = 100;

export async function loadScheduleBoard(token: string): Promise<ScheduleBoard> {
  const videogames = await listVideogames(token);
  const games = mappedGames(videogames);
  const matches = matchesForKnownGames(games, await loadMatches(token));

  return { games, matches };
}

function mappedGames(videogames: VendorVideogame[]): Game[] {
  return videogames.flatMap((videogame) => {
    const game = gameFrom(videogame);

    return game ? [game] : [];
  });
}

async function loadMatches(token: string): Promise<Match[]> {
  const running = await getJson<VendorMatch[]>(
    `/matches/running?per_page=${PAGE_SIZE}`,
    token
  );
  const upcoming = await getJson<VendorMatch[]>(
    `/matches/upcoming?per_page=${PAGE_SIZE}`,
    token
  );

  return mappedMatches([...running, ...upcoming]);
}

function mappedMatches(vendorMatches: VendorMatch[]): Match[] {
  return vendorMatches.flatMap((vendorMatch) => {
    const match = matchFrom(vendorMatch);

    return match ? [match] : [];
  });
}

async function getJson<T>(path: string, token: string): Promise<T> {
  return pandascoreRequest.json(path, await pandascoreRequest.ok(path, token));
}
