import { aVendorMatch } from './pandascore.harness';
import { tournamentLabel } from './tournament-label';

describe('tournamentLabel', () => {
  it('joins league and stage with a dot', () => {
    expect(tournamentLabel(aVendorMatch())).toBe('LEC · Spring');
  });

  it('returns the league when it already includes the stage', () => {
    expect(
      tournamentLabel(
        aVendorMatch({
          league: { name: 'LEC Spring' },
          tournament: { name: 'Spring' },
        })
      )
    ).toBe('LEC Spring');
  });

  it('returns the stage when the league is missing', () => {
    expect(
      tournamentLabel(
        aVendorMatch({ league: null, tournament: { name: 'Playoffs' } })
      )
    ).toBe('Playoffs');
  });

  it('returns Tournament when league and stage are missing', () => {
    expect(
      tournamentLabel(aVendorMatch({ league: null, tournament: null }))
    ).toBe('Tournament');
  });
});
