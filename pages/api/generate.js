// pages/api/generate.js
// Claude API route — API key stays server-side, never exposed to browser

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { length, vibe, tone, theirName, context } = req.body;

  if (!length || !vibe || !tone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const nameStr = theirName ? `Their name is ${theirName}.` : 'No name provided — write without using a name.';
  const contextStr = context ? `Extra context: ${context}` : '';

  const toneGuide = {
    gentle:  'Warm and empathetic. Leave them feeling respected. Close the door kindly but unmistakably.',
    brutal:  'Blunt, direct, no softening. Short. Not mean — just completely done.',
    funny:   'Self-aware and a little absurd. Light, not cruel. The kind of breakup text people screenshot and post.',
    ghost:   'Sophisticated fade. Dignified, minimal, final. No drama. Just... done.',
  };

  const prompt = `You are a breakup text ghostwriter. Write ONE breakup text message.

Relationship details:
- How long: ${length}
- Vibe: ${vibe}
- ${nameStr}
- ${contextStr}

Tone to use: ${tone.toUpperCase()} — ${toneGuide[tone] || toneGuide.gentle}

RULES:
- Write ONLY the text message itself. No intro, no label, no quotes. Just the message.
- Sound exactly like a real person texting — not a letter, not formal
- Max 3–4 sentences for gentle/funny/ghost; 1–2 sentences for brutal
- Make it feel real and specific, not generic
- No clichés like "I wish you well" or "you deserve someone better"
- It should feel like something people would screenshot and share`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: 'AI generation failed. Check your API key.' });
    }

    const data = await response.json();
    const message = data.content?.[0]?.text?.trim();

    if (!message) {
      return res.status(500).json({ error: 'Empty response from AI.' });
    }

    return res.status(200).json({ message });

  } catch (err) {
    console.error('Generate error:', err);
    return res.status(500).json({ error: 'Server error. Try again.' });
  }
}
