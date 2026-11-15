import { allowedUrlFrom } from '@/data/mappers/allowed-url-from';
import { asOrNull } from '@/data/mappers/as-or-null';
import { competitionWithOptionalImage } from '@/data/mappers/competition-with-optional-image';
import type { Competition } from '@/modules/shared/entities';

import type { VendorMatch } from '../vendor-types';

export function competitionFrom(match: VendorMatch): Competition {
  return competitionWithOptionalImage({
    title: competitionTitleFrom(match),
    imageUrl: allowedUrlFrom(
      asOrNull.string(match.league?.image_url) ?? undefined
    ),
  });
}

// eslint-disable-next-line complexity -- league/stage cases stay flat
function competitionTitleFrom(match: VendorMatch): string {
  const league = match.league?.name?.trim() ?? '';
  const stage = match.tournament?.name?.trim() ?? '';

  if (!league) {
    return stage || 'Competition';
  }

  if (!stage || league.includes(stage)) {
    return league;
  }

  return `${league} · ${stage}`;
}
