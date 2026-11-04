import { boardFromPayload } from './schedule-board';

describe('boardFromPayload', () => {
  it('maps a live ok payload without sample matches', () => {
    const board = boardFromPayload({
      status: 'ok',
      games: [{ id: 'cs-go', name: 'Counter-Strike', shortName: 'CS2' }],
      matches: [
        {
          id: '1',
          game: 'cs-go',
          name: 'Match',
          teams: [
            { name: 'A', shortName: 'A' },
            { name: 'B', shortName: 'B' },
          ],
          startsAt: '2026-03-15T12:00:00.000Z',
          tournament: 'BLAST · Final',
          format: 'Bo3',
        },
      ],
    });

    expect(board.ready).toBe(true);
    expect(board.notice).toBeNull();
    expect(board.games.list()).toHaveLength(1);
    expect(board.matches.list()).toHaveLength(1);
  });

  it('keeps the board empty when the API is unconfigured', () => {
    const board = boardFromPayload({ status: 'unconfigured' });

    expect(board.ready).toBe(true);
    expect(board.matches.list()).toEqual([]);
    expect(board.games.list()).toEqual([]);
    expect(board.notice).toBe('Schedule API is not configured.');
  });

  it('keeps the board empty on live errors', () => {
    const board = boardFromPayload({
      status: 'error',
      message: 'PandaScore failed: 429',
    });

    expect(board.matches.list()).toEqual([]);
    expect(board.notice).toBe('PandaScore failed: 429');
  });
});
