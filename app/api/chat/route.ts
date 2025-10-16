import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Ensure runtime edge compatibility if desired
export const runtime = 'nodejs';

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing OPENAI_API_KEY on server' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const { messages } = body as { messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: messages array required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: 'Je bent een behulpzame, beknopte Nederlandse assistent. Antwoord kort en duidelijk, met maximaal 3 bullets of 5 zinnen.' },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.4,
      max_tokens: 400,
    });

    const text = completion.choices?.[0]?.message?.content ?? 'Er is geen antwoord ontvangen.';
    return new Response(JSON.stringify({ content: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('API /api/chat error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
