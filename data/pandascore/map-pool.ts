type PoolState<Item, Result> = {
  items: Item[];
  worker: (item: Item) => Promise<Result>;
  results: Result[];
  nextIndex: number;
};

/** Run async work over items with a fixed concurrency cap. */
export async function mapPool<Item, Result>(
  items: Item[],
  concurrency: number,
  worker: (item: Item) => Promise<Result>
): Promise<Result[]> {
  const state: PoolState<Item, Result> = {
    items,
    worker,
    results: Array.from({ length: items.length }),
    nextIndex: 0,
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () =>
      drainPool(state)
    )
  );

  return state.results;
}

async function drainPool<Item, Result>(
  state: PoolState<Item, Result>
): Promise<void> {
  while (state.nextIndex < state.items.length) {
    const index = state.nextIndex;

    state.nextIndex += 1;
    state.results[index] = await state.worker(state.items[index]);
  }
}
