import { aVendorMatch } from '../pandascore.harness';

import { competitionFrom } from './competition-from';

describe('competitionFrom', () => {
  it('joins league and stage', () => {
    expect(competitionFrom(aVendorMatch())).toEqual({ title: 'LEC · Spring' });
  });

  it('returns the league when it already includes the stage', () => {
    const competition = competitionFrom(
      aVendorMatch({
        league: { name: 'LEC Spring' },
        tournament: { name: 'Spring' },
      })
    );

    expect(competition).toEqual({ title: 'LEC Spring' });
  });

  it('returns the stage when the league is missing', () => {
    const competition = competitionFrom(
      aVendorMatch({ league: null, tournament: { name: 'Playoffs' } })
    );

    expect(competition).toEqual({ title: 'Playoffs' });
  });

  it('returns Competition when league and stage are missing', () => {
    expect(
      competitionFrom(aVendorMatch({ league: null, tournament: null }))
    ).toEqual({ title: 'Competition' });
  });

  it('strips surrounding space from league and stage', () => {
    const competition = competitionFrom(
      aVendorMatch({
        league: { name: '  LEC  ' },
        tournament: { name: '  Spring  ' },
      })
    );

    expect(competition).toEqual({ title: 'LEC · Spring' });
  });

  it('maps a league image url', () => {
    const competition = competitionFrom(
      aVendorMatch({
        league: { name: 'LEC', image_url: 'https://cdn.example/lec.png' },
      })
    );

    expect(competition).toEqual({
      title: 'LEC · Spring',
      imageUrl: 'https://cdn.example/lec.png',
    });
  });

  it('omits a blank league image url', () => {
    expect(
      competitionFrom(aVendorMatch({ league: { name: 'LEC', image_url: '' } }))
    ).toEqual({ title: 'LEC · Spring' });
  });
});
