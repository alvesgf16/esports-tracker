import type { Game } from '@/modules/shared/entities';

import { isSimulatedSport } from './is-simulated-sport';
import { shortNameForSlug } from './short-name-for-slug';
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
