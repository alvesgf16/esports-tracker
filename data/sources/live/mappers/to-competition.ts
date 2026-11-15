import { allowedUrlFrom } from '@/data/mappers/allowed-url-from';
import { asOrNull } from '@/data/mappers/as-or-null';
import { competitionWithOptionalImage } from '@/data/mappers/competition-with-optional-image';
import { parseOptional } from '@/data/mappers/parse-optional';
import type { Competition } from '@/modules/shared/entities';

export function toCompetition(value: unknown): Competition | null {
  const record = asOrNull.record(value);
  const title = record && asOrNull.string(record.title);

  return record && title
    ? competitionWithOptionalImage({
        title,
        imageUrl: logoUrlFrom(record.imageUrl),
      })
    : null;
}

function logoUrlFrom(value: unknown): string | undefined {
  return allowedUrlFrom(parseOptional(value, asOrNull.string) ?? undefined);
}
