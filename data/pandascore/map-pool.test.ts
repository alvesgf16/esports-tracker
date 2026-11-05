import { mapPool } from './map-pool';

describe('mapPool', () => {
  it('returns results in input order', async () => {
    const values = await mapPool([1, 2, 3], 2, (item) =>
      Promise.resolve(item * 10)
    );

    expect(values).toEqual([10, 20, 30]);
  });

  it('returns an empty list when there is nothing to map', async () => {
    expect(await mapPool([], 2, (item) => Promise.resolve(item))).toEqual([]);
  });

  it('keeps at most the given number of workers in flight', async () => {
    let inFlight = 0;
    let maxInFlight = 0;

    await mapPool([1, 2, 3, 4], 2, async (item) => {
      inFlight += 1;
      maxInFlight = Math.max(maxInFlight, inFlight);
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 20);
      });
      inFlight -= 1;

      return item;
    });

    expect(maxInFlight).toBe(2);
  });
});
