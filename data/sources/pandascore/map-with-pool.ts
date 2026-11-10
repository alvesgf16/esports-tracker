type MapperPool<Item, Result> = {
  poolSize: number;
  mapFunction: (item: Item) => Promise<Result>;
};

/** Run async work over items with a fixed concurrency cap. */
export async function mapWithPool<Item, Result>(
  items: Item[],
  mapperPool: MapperPool<Item, Result>
): Promise<Result[]> {
  const { poolSize, mapFunction } = mapperPool;

  return workerPool(items.length, poolSize, async (index) =>
    mapFunction(items[index])
  );
}

async function workerPool<Result>(
  jobCount: number,
  size: number,
  work: (index: number) => Promise<Result>
) {
  const results: Result[] = Array.from({ length: jobCount });
  let nextUnclaimed = 0;

  const startWorker = async () => {
    while (nextUnclaimed < jobCount) {
      const index = nextUnclaimed;

      nextUnclaimed += 1;
      results[index] = await work(index);
    }
  };

  const maxWorkers = Math.min(size, jobCount);
  const workers = Array.from({ length: maxWorkers }, startWorker);

  await Promise.all(workers);

  return results;
}
