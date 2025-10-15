import { AtlasCard, SynergySuggestion } from './types';

function jaccard(a: Set<string>, b: Set<string>): number {
  const inter = new Set([...a].filter(x => b.has(x))).size;
  const uni = new Set([...a, ...b]).size;
  return uni === 0 ? 0 : inter / uni;
}

export function suggestSynergies(cards: AtlasCard[], maxPairs = 5): SynergySuggestion[] {
  const suggestions: SynergySuggestion[] = [];
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      const a = cards[i];
      const b = cards[j];
      const setA = new Set([...(a.tags || []), ...tokenize(a.title)]);
      const setB = new Set([...(b.tags || []), ...tokenize(b.title)]);
      const score = jaccard(setA, setB);
      if (score <= 0) continue;
      const rationale = `Koppel '${a.title}' en '${b.title}' via overlappende thema's: ${[...new Set([...setA].filter(x => setB.has(x)))].slice(0,3).join(', ')}`;
      suggestions.push({ pair: [a, b], rationale, score });
    }
  }
  suggestions.sort((x, y) => y.score - x.score);
  return suggestions.slice(0, maxPairs);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\p{L}\s]/giu, ' ')
    .split(/\s+/)
    .filter(Boolean);
}
