import type { Match } from '@/modules/shared/entities';

import { sampleKickoff } from '../../sample-kickoff';
import { team } from '../../team';

const PUBG_LOBBY = [
  team(['Twisted Minds', 'TWIS', 'twis']),
  team(['Falcons', 'FLC', 'flc']),
  team(['Natus Vincere', 'NAVI', 'navi']),
  team(['Soniqs', 'SON', 'son']),
  team(['GEN.G', 'GEN', 'gen']),
  team(['TSM', 'TSM', 'tsm']),
  team(['FaZe Clan', 'FaZe', 'faze']),
  team(['Liquid', 'TL', 'tl']),
  team(['Fnatic', 'FNC', 'fnc']),
  team(['Virtus.pro', 'VP', 'vp']),
  team(['Team Spirit', 'TS', 'ts']),
  team(['Gaimin Gladiators', 'GG', 'gg']),
  team(['Eternal Fire', 'EF', 'ef']),
  team(['The MongolZ', 'MNGZ', 'mngz']),
  team(['MOUZ', 'MOUZ', 'mouz']),
  team(['Vitality', 'VIT', 'vit']),
];

/** Multi-team lobby — card shows match name and team count, not 16 rows. */
export const LOBBY_MATCHES: Match[] = [
  {
    id: 'pubg-lobby',
    game: 'pubg',
    name: 'Group A — Match 3',
    tournament: 'PGS · Global Series',
    format: 'Maps',
    startsAt: sampleKickoff.onTheHour(10),
    teams: PUBG_LOBBY,
  },
];
