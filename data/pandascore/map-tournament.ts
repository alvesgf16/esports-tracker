import type { VendorMatch } from './vendor-types';

export function tournamentLabel(vendor: VendorMatch): string {
  return combineTournament(leagueName(vendor), stageName(vendor));
}

function leagueName(vendor: VendorMatch): string {
  return vendor.league?.name?.trim() ?? '';
}

function stageName(vendor: VendorMatch): string {
  return vendor.tournament?.name?.trim() ?? '';
}

function combineTournament(league: string, stage: string): string {
  if (!league) {
    return stage || 'Tournament';
  }

  if (!stage || league.includes(stage)) {
    return league;
  }

  return `${league} · ${stage}`;
}
