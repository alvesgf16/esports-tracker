/** Vendor JSON uses snake_case field names from PandaScore. */

export type VendorVideogame = {
  id: number;
  name: string;
  slug: string;
};

export type VendorOpponent = {
  type: string;
  opponent: {
    name: string | null;
    acronym?: string | null;
  } | null;
};

export type VendorMatch = {
  id: number;
  name: string | null;
  status: string;
  match_type: string | null;
  number_of_games: number | null;
  begin_at: string | null;
  scheduled_at: string | null;
  opponents: VendorOpponent[];
  league: { name: string | null } | null;
  tournament: { name: string | null } | null;
  videogame: { name: string; slug: string } | null;
  videogame_title: { name: string | null } | null;
};
