import type { Competition } from '@/modules/shared/entities';

export function competitionWithOptionalImage({
  title,
  imageUrl,
}: Competition): Competition {
  return {
    title,
    ...(imageUrl ? { imageUrl } : {}),
  };
}
