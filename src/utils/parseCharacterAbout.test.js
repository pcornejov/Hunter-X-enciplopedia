import { describe, expect, it } from 'vitest';
import { parseCharacterAbout } from './parseCharacterAbout';

describe('parseCharacterAbout', () => {
  it('extracts known fields from a well-formed about block', () => {
    const about =
      'Age: 12 (beginning), 14-15 (current)\n' +
      'Birthday: May 5\n' +
      'Height: 154 cm\n' +
      'Weight: 49 kg\n' +
      'Eye Color: Brown\n' +
      'Blood type: B\n' +
      'Occupation: Hunter\n' +
      'Nen type: Enhancement\n' +
      'Abilities: \n\n' +
      'Gon Freecss is a Rookie Hunter and the son of Ging Freecss.';

    expect(parseCharacterAbout(about)).toEqual({
      age: '12 (beginning), 14-15 (current)',
      birthday: 'May 5',
      height: '154 cm',
      weight: '49 kg',
      eyeColor: 'Brown',
      bloodType: 'B',
      occupation: 'Hunter',
      nenType: 'Enhancement',
    });
  });

  it('returns an empty object when the about text has no structured header', () => {
    const about = 'Menthuthuyoupi, nicknamed Yupi, is the third of the chimera ant king\'s Royal Guard.';
    expect(parseCharacterAbout(about)).toEqual({});
  });

  it('returns an empty object for null/undefined/empty input', () => {
    expect(parseCharacterAbout(null)).toEqual({});
    expect(parseCharacterAbout(undefined)).toEqual({});
    expect(parseCharacterAbout('')).toEqual({});
  });

  it('ignores unknown labels and blank values', () => {
    const about = 'Favorite Color: Green\nAge: \nOccupation: Hunter';
    expect(parseCharacterAbout(about)).toEqual({ occupation: 'Hunter' });
  });
});
