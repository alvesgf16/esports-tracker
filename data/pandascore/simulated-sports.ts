const SIMULATED_SPORT_SLUGS = new Set([
  'e-soccer',
  'e-basketball',
  'e-cricket',
  'e-hockey',
]);

export function isSimulatedSport(slug: string): boolean {
  return SIMULATED_SPORT_SLUGS.has(slug);
}
