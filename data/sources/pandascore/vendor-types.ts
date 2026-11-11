/** Vendor JSON uses snake_case field names from PandaScore. */

export type VendorVideogame = {
  id: number;
  name: string;
  slug: string;
};

export type VendorOpponentBody = {
  id?: number | null;
  name: string | null;
  acronym?: string | null;
};

export type VendorOpponent = {
  type: string;
  opponent: VendorOpponentBody | null;
};

export type VendorResult = {
  team_id?: number | null;
  player_id?: number | null;
  score?: number | null;
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
  results?: VendorResult[] | null;
  winner_id?: number | null;
  league: { name: string | null } | null;
  tournament: { name: string | null } | null;
  videogame: { name: string; slug: string } | null;
  videogame_title: { name: string | null } | null;
};
