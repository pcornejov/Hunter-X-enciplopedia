import { describe, expect, it } from 'vitest';
import { computeNenQuizResult } from './nenQuiz';

describe('computeNenQuizResult', () => {
  it('returns the category with the most answers', () => {
    const answers = ['potenciador', 'transmutador', 'potenciador', 'potenciador', 'emisor'];
    expect(computeNenQuizResult(answers)).toBe('potenciador');
  });

  it('breaks ties by first occurrence order', () => {
    const answers = ['manipulador', 'conjurador', 'manipulador', 'conjurador'];
    expect(computeNenQuizResult(answers)).toBe('manipulador');
  });

  it('handles a single answer', () => {
    expect(computeNenQuizResult(['especializador'])).toBe('especializador');
  });
});
