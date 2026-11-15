import type { LogoFilter } from '../contracts';

type SideLogoModel = {
  imageUrl: string | null;
  onLogoError?: () => void;
};

export function sideLogo(
  imageUrl: string | undefined,
  logos: LogoFilter
): SideLogoModel {
  if (!imageUrl || !logos.isClient || logos.failedUrls.has(imageUrl)) {
    return { imageUrl: null };
  }

  return {
    imageUrl,
    onLogoError: () => logos.markAsFailed(imageUrl),
  };
}
