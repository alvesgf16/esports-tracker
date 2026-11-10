import type { Game, Match } from '@/modules/shared/entities';

import { gameFrom } from './mappers/game-from';
import { mapWithPool } from './map-with-pool';
import { matchFrom } from './mappers/match-from';
import type { ScheduleBoard } from './schedule-board';
import type { VendorMatch, VendorVideogame } from './vendor-types';

const API_BASE = 'https://api.pandascore.co';
const PAGE_SIZE = 20;
const MATCH_CONCURRENCY = 2;

export async function loadScheduleBoard(token: string): Promise<ScheduleBoard> {
  const videogames = await listVideogames(token);
  const games = mappedGames(videogames);
  const matches = await loadMatchesForGames(videogames, games, token);

  return { games, matches };
}

async function listVideogames(token: string): Promise<VendorVideogame[]> {
  return getJson<VendorVideogame[]>(`/videogames?per_page=50&sort=name`, token);
}

function mappedGames(videogames: VendorVideogame[]): Game[] {
  return videogames.flatMap((videogame) => {
    const game = gameFrom(videogame);

    return game ? [game] : [];
  });
}

async function loadMatchesForGames(
  videogames: VendorVideogame[],
  games: Game[],
  token: string
): Promise<Match[]> {
  const gameIds = new Set(games.map(toGameId));
  const hasMatchingGame = (videogame: VendorVideogame) =>
    gameIds.has(videogame.slug);
  const videogamesToLoad = videogames.filter(hasMatchingGame);
  const matchLists = await mapWithPool(videogamesToLoad, {
    poolSize: MATCH_CONCURRENCY,
    mapFunction: (videogame) => loadMatchesForVideogame(videogame.id, token),
  });

  return matchLists.flat();
}

function toGameId(game: Game) {
  return game.id;
}

async function loadMatchesForVideogame(
  videogameId: number,
  token: string
): Promise<Match[]> {
  const filter = `filter[videogame]=${videogameId}&per_page=${PAGE_SIZE}`;
  const running = await getJson<VendorMatch[]>(
    `/matches/running?${filter}`,
    token
  );
  const upcoming = await getJson<VendorMatch[]>(
    `/matches/upcoming?${filter}`,
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
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`PandaScore ${path} failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
