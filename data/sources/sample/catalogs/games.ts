import { gameCatalog } from '@/data/catalogs/game-catalog';
import type { Game } from '@/modules/shared/entities';

const GAMES: Game[] = [
  { id: 'lol', name: 'League of Legends', shortName: 'LoL' },
  { id: 'cs2', name: 'Counter-Strike 2', shortName: 'CS2' },
  { id: 'valorant', name: 'Valorant', shortName: 'VLR' },
  { id: 'dota2', name: 'Dota 2', shortName: 'Dota' },
  { id: 'r6', name: 'Rainbow Six Siege', shortName: 'R6' },
  { id: 'mlbb', name: 'Mobile Legends', shortName: 'MLBB' },
  { id: 'ow', name: 'Overwatch', shortName: 'OW' },
  { id: 'rl', name: 'Rocket League', shortName: 'RL' },
  { id: 'pubg', name: 'PUBG', shortName: 'PUBG' },
  { id: 'cod', name: 'Call of Duty', shortName: 'COD' },
  { id: 'fifa', name: 'EA Sports FC', shortName: 'FC' },
  { id: 'kog', name: 'King of Glory', shortName: 'KoG' },
  { id: 'wildrift', name: 'Wild Rift', shortName: 'WR' },
  { id: 'sc2', name: 'StarCraft 2', shortName: 'SC2' },
  { id: 'broodwar', name: 'StarCraft Brood War', shortName: 'BW' },
];

export const sampleGameCatalog = gameCatalog(GAMES);
