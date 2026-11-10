import type { Game, Match } from '@/modules/shared/entities';
import type {
  GameCatalog,
  MatchCatalog,
  ScheduleLoadFailure,
} from '@/modules/shared/gateways';

export type LiveSchedulePayload =
  { status: 'ok'; games: Game[]; matches: Match[] } | ScheduleLoadFailure;

export type LiveScheduleResult =
  | { status: 'ok'; games: GameCatalog; matches: MatchCatalog }
  | ScheduleLoadFailure;
