import { G2_VS_FNC, LOL, OK_PAYLOAD } from '../live.harness';
import { parseLiveSchedulePayload } from './parse-live-schedule-payload';

describe('parseLiveSchedulePayload', () => {
  it('accepts an ok payload', () => {
    expect(parseLiveSchedulePayload(OK_PAYLOAD)).toEqual(OK_PAYLOAD);
  });

  it('accepts unconfigured', () => {
    expect(parseLiveSchedulePayload({ status: 'unconfigured' })).toEqual({
      status: 'unconfigured',
    });
  });

  it('accepts an error with a message', () => {
    expect(
      parseLiveSchedulePayload({ status: 'error', message: 'PandaScore 502' })
    ).toEqual({ status: 'error', message: 'PandaScore 502' });
  });

  it('accepts an error without a message', () => {
    expect(parseLiveSchedulePayload({ status: 'error' })).toEqual({
      status: 'error',
    });
  });

  it('accepts a match with status', () => {
    const payload = {
      status: 'ok',
      games: [LOL],
      matches: [{ ...G2_VS_FNC, status: 'running' }],
    };

    expect(parseLiveSchedulePayload(payload)).toEqual(payload);
  });

  it('accepts a match with series scores', () => {
    const payload = {
      status: 'ok' as const,
      games: [LOL],
      matches: [
        {
          ...G2_VS_FNC,
          scores: [
            { teamId: 'g2', score: 2 },
            { teamId: 'fnc', score: 1 },
          ],
          winnerId: 'g2',
        },
      ],
    };

    expect(parseLiveSchedulePayload(payload)).toEqual(payload);
  });

  it('rejects a non-object', () => {
    expect(parseLiveSchedulePayload(null)).toBeNull();
    expect(parseLiveSchedulePayload([])).toBeNull();
  });

  it('rejects an unknown status', () => {
    expect(parseLiveSchedulePayload({ status: 'loading' })).toBeNull();
  });

  it('rejects an ok payload with a bad game', () => {
    expect(
      parseLiveSchedulePayload({
        status: 'ok',
        games: [{ id: 'lol' }],
        matches: [],
      })
    ).toBeNull();
  });

  it('skips a match whose game is not in the catalog', () => {
    expect(
      parseLiveSchedulePayload({
        status: 'ok',
        games: [LOL],
        matches: [G2_VS_FNC, { ...G2_VS_FNC, id: 'orphan', game: 'cs2' }],
      })
    ).toEqual({
      status: 'ok',
      games: [LOL],
      matches: [G2_VS_FNC],
    });
  });

  it('skips a bad match and keeps the payload', () => {
    const payload = {
      status: 'ok' as const,
      games: [LOL],
      matches: [G2_VS_FNC, { ...G2_VS_FNC, teams: [{ name: 'G2' }] }],
    };

    expect(parseLiveSchedulePayload(payload)).toEqual({
      status: 'ok',
      games: [LOL],
      matches: [G2_VS_FNC],
    });
  });

  it('skips a match with unknown status', () => {
    expect(
      parseLiveSchedulePayload({
        status: 'ok',
        games: [LOL],
        matches: [{ ...G2_VS_FNC, status: 'canceled' }],
      })
    ).toEqual({ status: 'ok', games: [LOL], matches: [] });
  });

  it('skips a match with a malformed score', () => {
    const payload = {
      status: 'ok' as const,
      games: [LOL],
      matches: [
        G2_VS_FNC,
        { ...G2_VS_FNC, scores: [{ teamId: 'g2', score: 1.5 }] },
      ],
    };

    expect(parseLiveSchedulePayload(payload)).toEqual({
      status: 'ok',
      games: [LOL],
      matches: [G2_VS_FNC],
    });
  });

  it('rejects an error whose message is not a string', () => {
    expect(
      parseLiveSchedulePayload({ status: 'error', message: 502 })
    ).toBeNull();
  });
});
