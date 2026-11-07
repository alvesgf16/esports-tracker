import { jsonValue } from './json-value';

export function parseList<Item>(
  value: unknown,
  parseItem: (item: unknown) => Item | null
): Item[] | null {
  const items = jsonValue.array(value);

  if (!items) {
    return null;
  }

  return parseItems(items, parseItem);
}

function parseItems<Item>(
  items: unknown[],
  parseItem: (item: unknown) => Item | null
): Item[] | null {
  const parsed: Item[] = [];

  for (const item of items) {
    const next = parseItem(item);

    if (!next) {
      return null;
    }

    parsed.push(next);
  }

  return parsed;
}
