import type { LogoFilter } from '../contracts';

type CompetitionLogoModel = {
  imageUrl?: string;
  onLogoError?: () => void;
};

export function competitionLogo(
  imageUrl: string | undefined,
  logos: LogoFilter
): CompetitionLogoModel {
  if (!imageUrl || !logos.isClient || logos.failedUrls.has(imageUrl)) {
    return {};
  }

  return {
    imageUrl,
    onLogoError: () => logos.markAsFailed(imageUrl),
  };
}
