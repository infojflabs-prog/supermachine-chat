import fs from 'node:fs';
import path from 'node:path';
import { AtlasCard, AtlasIndex } from './types';

const ATLAS_DIR = process.env.ATLAS_DIR || path.join(process.cwd(), 'atlas');

export function loadAtlasIndex(): AtlasIndex {
  const index: AtlasIndex = { cards: {}, tagToCardIds: {} };

  if (!fs.existsSync(ATLAS_DIR)) {
    return index;
  }

  const entries = fs.readdirSync(ATLAS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.json')) continue;

    const fullPath = path.join(ATLAS_DIR, entry.name);
    try {
      const raw = fs.readFileSync(fullPath, 'utf8');
      const data = JSON.parse(raw) as AtlasCard | AtlasCard[];
      const cards = Array.isArray(data) ? data : [data];
      for (const card of cards) {
        if (!card.id) continue;
        index.cards[card.id] = card;
        for (const tag of card.tags || []) {
          if (!index.tagToCardIds[tag]) index.tagToCardIds[tag] = [];
          index.tagToCardIds[tag].push(card.id);
        }
      }
    } catch (err) {
      // ignore malformed files
      continue;
    }
  }

  return index;
}
