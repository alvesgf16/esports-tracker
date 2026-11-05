import { formatLabel } from './format-label';
import { aVendorMatch } from './pandascore.harness';

describe('formatLabel', () => {
  it('formats best-of series as BoN', () => {
    expect(
      formatLabel(aVendorMatch({ match_type: 'best_of', number_of_games: 5 }))
    ).toBe('Bo5');
  });

  it('formats first-to series as FtN', () => {
    expect(
      formatLabel(aVendorMatch({ match_type: 'first_to', number_of_games: 3 }))
    ).toBe('Ft3');
  });

  it('formats all games played as Maps', () => {
    expect(
      formatLabel(
        aVendorMatch({ match_type: 'all_games_played', number_of_games: null })
      )
    ).toBe('Maps');
  });

  it('replaces underscores when the type is not a known format', () => {
    expect(
      formatLabel(
        aVendorMatch({ match_type: 'custom_cup', number_of_games: null })
      )
    ).toBe('custom cup');
  });

  it('falls back to Match when the type is missing', () => {
    expect(
      formatLabel(aVendorMatch({ match_type: null, number_of_games: null }))
    ).toBe('Match');
  });
});
