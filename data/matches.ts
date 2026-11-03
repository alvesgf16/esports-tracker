import type { Match } from './types';

function at(hoursFromNow: number, extraMinutes = 0): string {
  const date = new Date();
  date.setMinutes(0, 0, 0);
  date.setHours(date.getHours() + hoursFromNow);
  date.setMinutes(extraMinutes);
  return date.toISOString();
}

/** Sample upcoming matches. Swap this for a live schedule API later. */
export const MATCHES: Match[] = [
  {
    id: '1',
    game: 'lol',
    tournament: 'LEC Spring',
    format: 'Bo5',
    startsAt: at(2, 15),
    teamA: { name: 'G2 Esports', shortName: 'G2' },
    teamB: { name: 'Fnatic', shortName: 'FNC' },
  },
  {
    id: '2',
    game: 'cs2',
    tournament: 'BLAST Open',
    format: 'Bo3',
    startsAt: at(3, 30),
    teamA: { name: 'Natus Vincere', shortName: 'NAVI' },
    teamB: { name: 'Vitality', shortName: 'VIT' },
  },
  {
    id: '3',
    game: 'valorant',
    tournament: 'VCT Americas',
    format: 'Bo3',
    startsAt: at(5),
    teamA: { name: 'Sentinels', shortName: 'SEN' },
    teamB: { name: 'Cloud9', shortName: 'C9' },
  },
  {
    id: '4',
    game: 'dota2',
    tournament: 'ESL One',
    format: 'Bo3',
    startsAt: at(7, 45),
    teamA: { name: 'Team Spirit', shortName: 'TSpirit' },
    teamB: { name: 'Team Liquid', shortName: 'Liquid' },
  },
  {
    id: '5',
    game: 'lol',
    tournament: 'LCK Cup',
    format: 'Bo3',
    startsAt: at(10),
    teamA: { name: 'T1', shortName: 'T1' },
    teamB: { name: 'Gen.G', shortName: 'GEN' },
  },
  {
    id: '6',
    game: 'cs2',
    tournament: 'IEM Katowice',
    format: 'Bo3',
    startsAt: at(22),
    teamA: { name: 'FaZe Clan', shortName: 'FaZe' },
    teamB: { name: 'MOUZ', shortName: 'MOUZ' },
  },
  {
    id: '7',
    game: 'valorant',
    tournament: 'VCT EMEA',
    format: 'Bo3',
    startsAt: at(26, 30),
    teamA: { name: 'Fnatic', shortName: 'FNC' },
    teamB: { name: 'Team Heretics', shortName: 'TH' },
  },
  {
    id: '8',
    game: 'r6',
    tournament: 'Six Invitational',
    format: 'Bo3',
    startsAt: at(28),
    teamA: { name: 'w7m esports', shortName: 'w7m' },
    teamB: { name: 'FaZe Clan', shortName: 'FaZe' },
  },
  {
    id: '9',
    game: 'mlbb',
    tournament: 'M5 World Championship',
    format: 'Bo5',
    startsAt: at(30, 20),
    teamA: { name: 'ONIC Esports', shortName: 'ONIC' },
    teamB: { name: 'Falcons AP.Bren', shortName: 'AP.Bren' },
  },
  {
    id: '10',
    game: 'dota2',
    tournament: 'The International',
    format: 'Bo3',
    startsAt: at(46),
    teamA: { name: 'Xtreme Gaming', shortName: 'XG' },
    teamB: { name: 'PARIVISION', shortName: 'PARI' },
  },
  {
    id: '11',
    game: 'lol',
    tournament: 'LCS',
    format: 'Bo3',
    startsAt: at(50, 15),
    teamA: { name: 'Cloud9', shortName: 'C9' },
    teamB: { name: 'FlyQuest', shortName: 'FLY' },
  },
  {
    id: '12',
    game: 'cs2',
    tournament: 'ESL Pro League',
    format: 'Bo3',
    startsAt: at(54),
    teamA: { name: 'Spirit', shortName: 'Spirit' },
    teamB: { name: 'The MongolZ', shortName: 'MNGZ' },
  },
];
