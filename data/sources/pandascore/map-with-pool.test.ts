import { mapWithPool } from './map-with-pool';

describe('mapWithPool', () => {
  it('returns results in input order', async () => {
    const values = await mapWithPool([1, 2, 3], {
      poolSize: 2,
      mapFunction: (item) => Promise.resolve(item * 10),
    });

    expect(values).toEqual([10, 20, 30]);
  });

  it('returns an empty list when there is nothing to map', async () => {
    const values = await mapWithPool([], {
      poolSize: 2,
      mapFunction: (item) => Promise.resolve(item),
    });

    expect(values).toEqual([]);
  });

  it('keeps at most the given number of mappers in flight', async () => {
    let inFlight = 0;
    let maxInFlight = 0;

    await mapWithPool([1, 2, 3, 4], {
      poolSize: 2,
      mapFunction: async (item) => {
        inFlight += 1;
        maxInFlight = Math.max(maxInFlight, inFlight);
        await new Promise<void>((resolve) => {
          setTimeout(resolve, 20);
        });
        inFlight -= 1;

        return item;
      },
    });

    expect(maxInFlight).toBe(2);
  });
});
