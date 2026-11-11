import type {
  VendorMatch,
  VendorOpponent,
  VendorVideogame,
} from './vendor-types';

export function aVendorVideogame(
  overrides: Partial<VendorVideogame> = {}
): VendorVideogame {
  return {
    id: 1,
    name: 'LoL',
    slug: 'league-of-legends',
    ...overrides,
  };
}

export function aVendorOpponent(
  name: string | null,
  acronym?: string | null,
  id?: number | null
): VendorOpponent {
  return {
    type: 'Team',
    opponent: { id, name, acronym },
  };
}

export function aVendorMatch(
  overrides: Partial<VendorMatch> = {}
): VendorMatch {
  return {
    id: 1,
    name: 'Alpha vs Beta',
    status: 'not_started',
    match_type: 'best_of',
    number_of_games: 3,
    begin_at: '2026-11-04T12:00:00Z',
    scheduled_at: '2026-11-04T12:00:00Z',
    opponents: [
      aVendorOpponent('Alpha', 'ALP', 11),
      aVendorOpponent('Beta', 'BET', 22),
    ],
    results: [],
    winner_id: null,
    league: { name: 'LEC' },
    tournament: { name: 'Spring' },
    videogame: { name: 'LoL', slug: 'league-of-legends' },
    videogame_title: { name: null },
    ...overrides,
  };
}
