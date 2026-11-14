import { asOrNull } from '@/data/mappers/as-or-null';
import { competitionWithOptionalImage } from '@/data/mappers/competition-with-optional-image';
import { parseOptional } from '@/data/mappers/parse-optional';
import type { Competition } from '@/modules/shared/entities';

export function toCompetition(value: unknown): Competition | null {
  const record = asOrNull.record(value);
  const title = record && asOrNull.string(record.title);
  const imageUrl = record && parseOptional(record.imageUrl, asOrNull.string);

  return title && imageUrl !== null
    ? competitionWithOptionalImage({ title, imageUrl })
    : null;
}
