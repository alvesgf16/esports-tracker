import type { VendorMatch } from './vendor-types';

export function formatLabel(vendor: VendorMatch): string {
  const games = vendor.number_of_games;
  const type = vendor.match_type;

  if (type === 'best_of' && games) {
    return `Bo${games}`;
  }

  if (type === 'first_to' && games) {
    return `Ft${games}`;
  }

  return otherFormat(type);
}

function otherFormat(type: string | null): string {
  if (type === 'all_games_played') {
    return 'Maps';
  }

  return type?.replaceAll('_', ' ') || 'Match';
}
