import { AtlasCard, AtlasIndex, RetrievalResult } from './types';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\p{L}\s]/giu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function scoreCard(card: AtlasCard, queryTokens: string[]): number {
  const haystack = `${card.title} ${card.content} ${(card.tags || []).join(' ')}`.toLowerCase();
  let score = 0;
  for (const tok of queryTokens) {
    const occurrences = haystack.split(tok).length - 1;
    score += occurrences;
  }
  return score + (card.tags?.some(t => queryTokens.includes(t.toLowerCase())) ? 1 : 0);
}

export function retrieveRelevantCards(index: AtlasIndex, query: string, limit = 8): RetrievalResult {
  const tokens = tokenize(query);
  const scored: Array<{ card: AtlasCard; score: number }> = [];
  for (const card of Object.values(index.cards)) {
    const s = scoreCard(card, tokens);
    if (s > 0) scored.push({ card, score: s });
  }
  scored.sort((a, b) => b.score - a.score);
  const matchedCards = scored.slice(0, limit).map(s => s.card);
  return { matchedCards, keywords: tokens };
}
