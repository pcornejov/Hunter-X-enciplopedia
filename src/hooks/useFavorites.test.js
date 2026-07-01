import { describe, expect, it } from 'vitest';
import { toggleFavoriteSlug } from './useFavorites';

describe('toggleFavoriteSlug', () => {
  it('adds a slug that is not yet a favorite', () => {
    expect(toggleFavoriteSlug(['gon-freecss'], 'killua-zoldyck')).toEqual([
      'gon-freecss',
      'killua-zoldyck',
    ]);
  });

  it('removes a slug that is already a favorite', () => {
    expect(toggleFavoriteSlug(['gon-freecss', 'killua-zoldyck'], 'gon-freecss')).toEqual([
      'killua-zoldyck',
    ]);
  });

  it('does not mutate the original array', () => {
    const original = ['gon-freecss'];
    toggleFavoriteSlug(original, 'killua-zoldyck');
    expect(original).toEqual(['gon-freecss']);
  });

  it('handles an empty starting list', () => {
    expect(toggleFavoriteSlug([], 'gon-freecss')).toEqual(['gon-freecss']);
  });
});
