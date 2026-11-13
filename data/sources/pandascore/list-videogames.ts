import { pandascoreRequest } from './pandascore-request';
import type { VendorVideogame } from './vendor-types';

type VideogamesPage = {
  items: VendorVideogame[];
  hasNext: boolean;
};

const PAGE_SIZE = 100;

export async function listVideogames(
  token: string
): Promise<VendorVideogame[]> {
  return videogamesFromPage(1, token);
}

async function videogamesFromPage(
  page: number,
  token: string
): Promise<VendorVideogame[]> {
  const { items, hasNext } = await getVideogamesPage(page, token);

  return hasNext
    ? [...items, ...(await videogamesFromPage(page + 1, token))]
    : items;
}

async function getVideogamesPage(
  page: number,
  token: string
): Promise<VideogamesPage> {
  const path = videogamesPath(page);
  const response = await pandascoreRequest.ok(path, token);

  return {
    items: await pandascoreRequest.json(path, response),
    hasNext: hasNextPage(response),
  };
}

function videogamesPath(page: number): string {
  return `/videogames?page=${page}&per_page=${PAGE_SIZE}&sort=name`;
}

function hasNextPage(response: Response): boolean {
  return Boolean(response.headers?.get('link')?.includes('rel="next"'));
}
