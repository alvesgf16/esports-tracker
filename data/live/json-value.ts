export const jsonValue = {
  record(value: unknown): Record<string, unknown> | null {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return null;
    }

    return value as Record<string, unknown>;
  },
  string(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }

    return value.trim() || null;
  },
  array(value: unknown): unknown[] | null {
    return Array.isArray(value) ? value : null;
  },
};
