import type { Match } from '@/modules/shared/entities';

import { PUBG_LOBBY } from './pubg-lobby';
import { sampleKickoff } from './sample-kickoff';

/** Multi-team lobby — card shows match name and team count, not 16 rows. */
export const LOBBY_MATCHES: Match[] = [
  {
    id: 'pubg-lobby',
    game: 'pubg',
    name: 'Group A — Match 3',
    tournament: 'PGS · Global Series',
    format: 'Maps',
    startsAt: sampleKickoff(10),
    teams: PUBG_LOBBY,
  },
];
