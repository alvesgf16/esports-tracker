export const asOrNull = {
  record(value: unknown): Record<string, unknown> | null {
    return isRecord(value) ? value : null;
  },
  string(value: unknown): string | null {
    return trimmedString(value) || null;
  },
  array(value: unknown): unknown[] | null {
    return Array.isArray(value) ? value : null;
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function trimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}
