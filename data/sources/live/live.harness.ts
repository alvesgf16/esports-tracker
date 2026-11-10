export const LOL = {
  id: 'lol',
  name: 'League of Legends',
  shortName: 'LoL',
};

export const G2_VS_FNC = {
  id: 'g2-fnc',
  game: 'lol',
  name: 'G2 Esports vs Fnatic',
  tournament: 'LEC · Spring Playoffs',
  format: 'Bo5',
  startsAt: '2026-03-15T18:00:00.000Z',
  teams: [
    { name: 'G2 Esports', shortName: 'G2' },
    { name: 'Fnatic', shortName: 'FNC' },
  ],
};

export const OK_PAYLOAD = {
  status: 'ok' as const,
  games: [LOL],
  matches: [G2_VS_FNC],
};
