import { describe, expect, it } from 'vitest';
import {
  translateStatus,
  translateRelation,
  translateDateRange,
  translateThemeString,
  filterKeyStaff,
} from './aboutWork';

describe('translateStatus', () => {
  it('translates known statuses', () => {
    expect(translateStatus('Finished Airing')).toBe('Finalizado');
    expect(translateStatus('Publishing')).toBe('En publicación');
  });

  it('falls back to the raw value for unknown statuses', () => {
    expect(translateStatus('Some Future Status')).toBe('Some Future Status');
  });
});

describe('translateRelation', () => {
  it('translates known relation labels', () => {
    expect(translateRelation('Side Story')).toBe('Historia paralela');
  });

  it('falls back to the raw value for unknown labels', () => {
    expect(translateRelation('Unknown')).toBe('Unknown');
  });
});

describe('translateDateRange', () => {
  it('translates a finished range', () => {
    expect(translateDateRange('Oct 2, 2011 to Sep 24, 2014')).toBe('Oct 2, 2011 a Sep 24, 2014');
  });

  it('translates an ongoing range ending in "?"', () => {
    expect(translateDateRange('Mar 3, 1998 to ?')).toBe('Mar 3, 1998 a la actualidad');
  });

  it('returns null for falsy input', () => {
    expect(translateDateRange(null)).toBeNull();
    expect(translateDateRange(undefined)).toBeNull();
  });
});

describe('translateThemeString', () => {
  it('swaps the English connector', () => {
    expect(translateThemeString('1: "Departure!" by Ono Masatoshi (eps 1-26)')).toBe(
      '1: "Departure!" — interpretada por Ono Masatoshi (eps 1-26)'
    );
  });
});

describe('filterKeyStaff', () => {
  it('keeps only creative-lead roles and drops entries with none', () => {
    const staff = [
      { person: { name: 'Koujina, Hiroshi' }, positions: ['Director', 'Storyboard'] },
      { person: { name: 'Random Person' }, positions: ['Episode Director', 'Key Animation'] },
      { person: { name: 'Togashi, Yoshihiro' }, positions: ['Original Creator'] },
    ];

    const result = filterKeyStaff(staff);

    expect(result).toHaveLength(2);
    expect(result[0].positions).toEqual(['Director']);
    expect(result.map((s) => s.person.name)).toEqual(['Koujina, Hiroshi', 'Togashi, Yoshihiro']);
  });

  it('returns an empty array for null/undefined input', () => {
    expect(filterKeyStaff(null)).toEqual([]);
    expect(filterKeyStaff(undefined)).toEqual([]);
  });
});
