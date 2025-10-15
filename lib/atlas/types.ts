export interface AtlasCard {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  links?: string[]; // other card ids
  metadata?: Record<string, unknown>;
}

export interface AtlasIndex {
  cards: Record<string, AtlasCard>;
  tagToCardIds: Record<string, string[]>;
}

export interface RetrievalResult {
  matchedCards: AtlasCard[];
  keywords: string[];
}

export interface SynergySuggestion {
  pair: [AtlasCard, AtlasCard];
  rationale: string;
  score: number; // 0..1
}
