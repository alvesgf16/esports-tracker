import { useState } from 'react';

type FailedUrls = {
  failedUrls: ReadonlySet<string>;
  markAsFailed: (url: string) => void;
};

export function useFailedUrls(): FailedUrls {
  const [failedUrls, setFailedUrls] = useState(() => new Set<string>());

  const markAsFailed = (url: string) => {
    setFailedUrls((previousFailedUrls) => addToSet(previousFailedUrls, url));
  };

  return { failedUrls, markAsFailed };
}

function addToSet(set: Set<string>, value: string): Set<string> {
  if (set.has(value)) {
    return set;
  }

  return new Set(set).add(value);
}
