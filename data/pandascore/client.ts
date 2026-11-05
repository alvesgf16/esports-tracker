import type { Game, Match } from '@/modules/shared/entities';

import { mapVideogame } from './map-game';
import { mapMatch } from './map-match';
import { mapPool } from './map-pool';
import type { VendorMatch, VendorVideogame } from './vendor-types';

const API_BASE = 'https://api.pandascore.co';
const PAGE_SIZE = 20;
const MATCH_CONCURRENCY = 2;

export type ScheduleBoard = {
  games: Game[];
  matches: Match[];
};

export async function fetchScheduleBoard(
  token: string
): Promise<ScheduleBoard> {
  const videogames = await listVideogames(token);
  const games = mappedGames(videogames);
  const matches = await loadMatchesForGames(token, videogames, games);

  return { games, matches };
}

function mappedGames(videogames: VendorVideogame[]): Game[] {
  return videogames.flatMap((item) => {
    const game = mapVideogame(item);

    return game ? [game] : [];
  });
}

async function listVideogames(token: string): Promise<VendorVideogame[]> {
  return getJson<VendorVideogame[]>(token, `/videogames?per_page=50&sort=name`);
}

async function loadMatchesForGames(
  token: string,
  vendors: VendorVideogame[],
  games: Game[]
): Promise<Match[]> {
  const allowed = new Set(games.map((game) => game.id));
  const targets = vendors.filter((item) => allowed.has(item.slug));
  const pages = await mapPool(targets, MATCH_CONCURRENCY, (item) =>
    loadMatchesForVideogame(token, item.id)
  );

  return pages.flat().sort(byKickoff);
}

async function loadMatchesForVideogame(
  token: string,
  videogameId: number
): Promise<Match[]> {
  const filter = `filter[videogame]=${videogameId}&per_page=${PAGE_SIZE}`;
  const running = await getJson<VendorMatch[]>(
    token,
    `/matches/running?${filter}`
  );
  const upcoming = await getJson<VendorMatch[]>(
    token,
    `/matches/upcoming?${filter}`
  );

  return mapVendorMatches([...running, ...upcoming]);
}

function mapVendorMatches(items: VendorMatch[]): Match[] {
  return items.flatMap((item) => {
    const match = mapMatch(item);

    return match ? [match] : [];
  });
}

async function getJson<T>(token: string, path: string): Promise<T> {
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

function byKickoff(left: Match, right: Match): number {
  return new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime();
}
