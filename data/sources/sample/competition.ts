import type { Competition } from '@/modules/shared/entities';

export function competition(title: string, imageUrl?: string): Competition {
  return imageUrl ? { title, imageUrl } : { title };
}
