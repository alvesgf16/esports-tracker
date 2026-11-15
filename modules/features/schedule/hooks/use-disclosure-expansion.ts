import { useState } from 'react';

type DisclosureExpansion = {
  isExpanded: (id: string) => boolean;
  toggle: (id: string) => void;
};

export function useDisclosureExpansion(): DisclosureExpansion {
  const [collapsedIds, setCollapsedIds] = useState(() => new Set<string>());

  const isExpanded = (id: string) => !collapsedIds.has(id);

  const toggle = (id: string) => {
    setCollapsedIds((previousCollapsedIds) =>
      toggleInSet(previousCollapsedIds, id)
    );
  };

  return { isExpanded, toggle };
}

function toggleInSet(set: Set<string>, value: string): Set<string> {
  const updated = new Set(set);

  if (!updated.delete(value)) {
    updated.add(value);
  }

  return updated;
}
