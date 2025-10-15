export interface AIProviderConfig {
  model?: string;
}

export interface AIProviderResponse {
  text: string;
}

export async function generateWithOpenAI(
  prompt: string,
  config: AIProviderConfig = {}
): Promise<AIProviderResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { text: '' };
  }

  try {
    // Lazy import to avoid dependency if not installed
    const { default: OpenAI } = await import('openai');
    const client = new OpenAI({ apiKey });

    const params = {
      model: config.model || process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Je bent een assistent die Atlas kaarten gebruikt voor context.'
        },
        { role: 'user', content: prompt }
      ],
      temperature: 0.3
    } as any;

    const result = await client.chat.completions.create(params);
    const text = (result as any)?.choices?.[0]?.message?.content || '';
    return { text };
  } catch {
    // If OpenAI SDK is not installed or another error occurs, return empty string
    return { text: '' };
  }
}
