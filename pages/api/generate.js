// pages/api/generate.js
import { Redis } from '@upstash/redis';
import { randomUUID } from 'crypto';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { length, vibe, tone, theirName, context } = req.body;
  if (!length || !vibe || !tone) return res.status(400).json({ error: 'Missing required fields' });

  const nameStr    = theirName ? `Their name is ${theirName}.` : 'No name provided — write without using a name.';
  const contextStr = context   ? `Extra context: ${context}`   : '';

  const toneGuide = {
    gentle: 'Warm and empathetic. Leave them feeling respected. Close the door kindly but unmistakably.',
    brutal: 'Blunt, direct, no softening. Short. Not mean — just completely done.',
    funny:  'Self-aware and a little absurd. Light, not cruel. The kind of breakup text people screenshot and post.',
    ghost:  'Sophisticated fade. Dignified, minimal, final. No drama. Just... done.',
  };

  const prompt = `You are a breakup text ghostwriter. Write ONE breakup text message.

Relationship details:
- How long: ${length}
- Vibe: ${vibe}
- ${nameStr}
- ${contextStr}

Tone: ${tone.toUpperCase()} — ${toneGuide[tone] || toneGuide.gentle}

RULES:
- Write ONLY the message itself. No intro, no label, no quotes around it.
- Sound like a real person texting — not formal, not a letter
- Max 3-4 sentences for gentle/funny/ghost; 1-2 sentences for brutal
- Make it feel real and specific, never generic
- No cliches like "I wish you well" or "you deserve better"
- Write something people would actually screenshot`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://breakup-texter.vercel.app',
        'X-Title': 'Breakup Texter',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4-5',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter error:', err);
      return res.status(500).json({ error: 'AI generation failed. Try again.' });
    }

    const data = await response.json();
    const fullMessage = data.choices?.[0]?.message?.content?.trim();
    if (!fullMessage) return res.status(500).json({ error: 'Empty response from AI.' });

    // Store full message in Redis — expires in 2 hours
    const messageId = randomUUID();
    await redis.set(`msg:${messageId}`, fullMessage, { ex: 7200 });

    // Send only a short preview to the browser
    const words = fullMessage.split(' ');
    const preview = words.slice(0, 8).join(' ') + (words.length > 8 ? '...' : '');

    return res.status(200).json({ preview, messageId });

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: 'Server error. Try again.' });
  }
}
