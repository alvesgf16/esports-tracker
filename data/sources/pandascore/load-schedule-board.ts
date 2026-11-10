import type { Game, Match } from '@/modules/shared/entities';

import { gameFrom } from './mappers/game-from';
import { matchFrom } from './mappers/match-from';
import type { ScheduleBoard } from './schedule-board';
import type { VendorMatch, VendorVideogame } from './vendor-types';

const API_BASE = 'https://api.pandascore.co';
const PAGE_SIZE = 100;

export async function loadScheduleBoard(token: string): Promise<ScheduleBoard> {
  const videogames = await listVideogames(token);
  const games = mappedGames(videogames);
  const matches = await loadMatches(token);

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
