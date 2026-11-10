export function parseOptional<T>(
  value: unknown,
  parser: (value: unknown) => T | null
): T | undefined | null {
  return value === undefined ? undefined : parser(value);
}
