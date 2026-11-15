import { useSyncExternalStore } from 'react';

export function useIsClient() {
  return useSyncExternalStore(
    subscribeToNothing,
    isClientSnapshot,
    isServerSnapshot
  );
}

function subscribeToNothing() {
  return () => {};
}

function isClientSnapshot() {
  return true;
}

function isServerSnapshot() {
  return false;
}
