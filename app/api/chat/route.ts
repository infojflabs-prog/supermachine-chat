import { NextRequest } from 'next/server';
import { loadAtlasIndex } from '@/lib/atlas/loader';
import { retrieveRelevantCards } from '@/lib/atlas/retrieval';
import { suggestSynergies } from '@/lib/atlas/synergy';
import { generateWithOpenAI } from '@/lib/ai/provider';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid message' }), { status: 400 });
    }

    const index = loadAtlasIndex();
    const retrieval = retrieveRelevantCards(index, message, 8);
    const synergies = suggestSynergies(retrieval.matchedCards, 5);

    const aiSummary = await generateWithOpenAI(
      `Gebruikersvraag: "${message}"
Context: ${retrieval.matchedCards
        .map(c => `(${c.title})`)
        .slice(0, 8)
        .join(', ')}
Genereer een kort, behulpzaam antwoord in het Nederlands dat verwijst naar relevante kaarten en benoem 1-2 mogelijke synergieën.`
    );

    const response = {
      query: message,
      keywords: retrieval.keywords,
      matches: retrieval.matchedCards.map(c => ({ id: c.id, title: c.title, tags: c.tags || [] })),
      synergies: synergies.map(s => ({
        a: { id: s.pair[0].id, title: s.pair[0].title },
        b: { id: s.pair[1].id, title: s.pair[1].title },
        score: Number(s.score.toFixed(3)),
        rationale: s.rationale
      })),
      ai: aiSummary.text || undefined
    };

    return new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
