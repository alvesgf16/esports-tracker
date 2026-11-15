import { allowedUrlFrom } from '@/data/mappers/allowed-url-from';
import { competitionWithOptionalImage } from '@/data/mappers/competition-with-optional-image';
import type { Competition } from '@/modules/shared/entities';

export function competition(title: string, imageUrl?: string): Competition {
  return competitionWithOptionalImage({
    title,
    imageUrl: allowedUrlFrom(imageUrl),
  });
}
