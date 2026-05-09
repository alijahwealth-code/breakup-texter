// pages/api/verify.js
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { saleId, messageId } = req.body;
  if (!saleId || !messageId) return res.status(400).json({ error: 'Missing required fields' });

  try {
    // Check sale ID exists in Redis
    const saleValid = await redis.get(`sale:${saleId}`);
    if (!saleValid) {
      return res.status(403).json({ valid: false, error: 'Order ID not found. Check your Gumroad receipt.' });
    }

    // Retrieve the full message
    const message = await redis.get(`msg:${messageId}`);
    if (!message) {
      return res.status(404).json({ valid: false, error: 'Message expired. Please generate a new one.' });
    }

    // Delete message from Redis after retrieval
    await redis.del(`msg:${messageId}`);

    return res.status(200).json({ valid: true, message });

  } catch (err) {
    console.error('Verify error:', err);
    return res.status(500).json({ error: 'Server error. Try again.' });
  }
}
