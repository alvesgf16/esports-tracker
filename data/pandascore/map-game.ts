import type { Game } from '@/modules/games/entities';

import { shortNameForSlug } from './short-name';
import { isSimulatedSport } from './simulated-sports';
import type { VendorVideogame } from './vendor-types';

export function mapVideogame(vendor: VendorVideogame): Game | null {
  if (isSimulatedSport(vendor.slug)) {
    return null;
  }

  return {
    id: vendor.slug,
    name: vendor.name,
    shortName: shortNameForSlug(vendor.slug),
  };
}
