import { useState } from 'react';

import type { StatusFilter, StatusFilterState } from '../contracts';

export function useStatusFilter(): StatusFilterState {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  return { statusFilter, setStatusFilter };
}
