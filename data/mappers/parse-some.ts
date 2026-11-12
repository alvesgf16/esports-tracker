import { asOrNull } from './as-or-null';

export function parseSome<Item>(
  value: unknown,
  parser: (item: unknown) => Item | null
): Item[] | null {
  const rawItems = asOrNull.array(value);
  const parsedItems = rawItems?.map(parser);

  return parsedItems?.filter(isNotNull) ?? null;
}

function isNotNull<Item>(item: Item | null): item is Item {
  return item !== null;
}
