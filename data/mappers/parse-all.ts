import { asOrNull } from './as-or-null';

export function parseAll<Item>(
  value: unknown,
  parser: (item: unknown) => Item | null
): Item[] | null {
  const rawItems = asOrNull.array(value);

  const parsedItems = rawItems && rawItems.map(parser);

  return parsedItems?.every(isNotNull) ? parsedItems : null;
}

function isNotNull<Item>(item: Item | null): item is Item {
  return item !== null;
}
