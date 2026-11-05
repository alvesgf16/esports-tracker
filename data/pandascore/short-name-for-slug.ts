const KNOWN_SHORT_NAMES: Record<string, string> = {
  'league-of-legends': 'LoL',
  'cs-go': 'CS2',
  valorant: 'VLR',
  'dota-2': 'Dota',
  'r6-siege': 'R6',
  mlbb: 'MLBB',
  ow: 'OW',
  rl: 'RL',
  pubg: 'PUBG',
  'cod-mw': 'COD',
  fifa: 'FC',
  kog: 'KoG',
  'lol-wild-rift': 'WR',
  'starcraft-2': 'SC2',
  'starcraft-brood-war': 'BW',
};

export function shortNameForSlug(slug: string): string {
  return KNOWN_SHORT_NAMES[slug] ?? initialsFromSlug(slug);
}

function initialsFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
