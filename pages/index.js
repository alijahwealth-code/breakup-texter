import { useState } from 'react';
import Head from 'next/head';

// ── OPTIONS ────────────────────────────────────────────────────
const LENGTHS = [
  'Less than a month',
  '1–6 months',
  '6–12 months',
  '1–2 years',
  '2+ years',
];

const VIBES = [
  { id: 'casual',      emoji: '😎', label: 'Casual thing' },
  { id: 'serious',     emoji: '💍', label: 'Serious / official' },
  { id: 'complicated', emoji: '🌀', label: 'It\'s complicated' },
  { id: 'toxic',       emoji: '☠️', label: 'Toxic situation' },
];

const TONES = [
  { id: 'gentle', emoji: '💙', label: 'Gentle',    sub: 'Kind but clear' },
  { id: 'brutal', emoji: '🔪', label: 'Brutal',    sub: 'Zero sugarcoating' },
  { id: 'funny',  emoji: '😂', label: 'Funny',     sub: 'Shareable & light' },
  { id: 'ghost',  emoji: '👻', label: 'Ghost Mode', sub: 'Classy disappear' },
];

// ── STYLES ─────────────────────────────────────────────────────
const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d0010 0%, #1a0020 50%, #0d0010 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#fff',
    padding: '0 16px 80px',
  },
  header: {
    textAlign: 'center',
    padding: '56px 0 32px',
  },
  tagLine: {
    display: 'inline-block',
    background: 'rgba(255,30,100,0.15)',
    border: '1px solid rgba(255,30,100,0.3)',
    borderRadius: 100,
    padding: '4px 14px',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#ff3c6e',
    marginBottom: 20,
  },
  h1: {
    fontSize: 'clamp(32px, 8vw, 60px)',
    fontWeight: 900,
    lineHeight: 1.1,
    margin: '0 0 16px',
    background: 'linear-gradient(135deg, #fff 40%, #ff3c6e 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.55)',
    maxWidth: 460,
    margin: '0 auto',
    lineHeight: 1.5,
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: '28px 24px',
    maxWidth: 540,
    margin: '0 auto 16px',
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 12,
    display: 'block',
  },
  select: {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 15,
    cursor: 'pointer',
    outline: 'none',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  optionBtn: (active) => ({
    background: active ? 'rgba(255,30,100,0.2)' : 'rgba(255,255,255,0.05)',
    border: active ? '1px solid #ff3c6e' : '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: '10px 12px',
    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.15s',
    fontSize: 14,
  }),
  optionEmoji: { fontSize: 18, marginRight: 8 },
  optionSub: { display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 15,
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 15,
    outline: 'none',
    resize: 'vertical',
    minHeight: 80,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  generateBtn: (loading) => ({
    width: '100%',
    background: loading
      ? 'rgba(255,255,255,0.1)'
      : 'linear-gradient(135deg, #ff1a57 0%, #ff6b35 100%)',
    border: 'none',
    borderRadius: 14,
    padding: '16px',
    color: '#fff',
    fontSize: 17,
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    letterSpacing: 0.5,
    transition: 'opacity 0.2s',
    opacity: loading ? 0.6 : 1,
    maxWidth: 540,
    display: 'block',
    margin: '0 auto',
  }),
  error: {
    color: '#ff6b6b',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },
  // ── OUTPUT ──
  outputCard: {
    maxWidth: 540,
    margin: '0 auto 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  outputHeader: {
    padding: '16px 24px 0',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.35)',
  },
  bubble: {
    margin: '14px 24px',
    background: '#1c1c1e',
    borderRadius: '18px 18px 4px 18px',
    padding: '14px 18px',
    fontSize: 16,
    lineHeight: 1.55,
    color: '#fff',
    position: 'relative',
  },
  blurOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '60%',
    background: 'linear-gradient(transparent, rgba(28,28,30,0.98))',
    display: 'flex',
    alignItems: 'flex-end',
    borderRadius: '0 0 4px 18px',
  },
  payGate: {
    padding: '20px 24px 24px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    textAlign: 'center',
  },
  payTitle: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 6,
  },
  paySub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 20,
  },
  payBtn: {
    display: 'block',
    width: '100%',
    background: 'linear-gradient(135deg, #ff1a57 0%, #ff6b35 100%)',
    border: 'none',
    borderRadius: 12,
    padding: '14px',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    marginBottom: 14,
    textDecoration: 'none',
    textAlign: 'center',
  },
  unlockRow: {
    display: 'flex',
    gap: 8,
  },
  unlockInput: {
    flex: 1,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '10px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  },
  unlockBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: '10px 16px',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  fullBubble: {
    margin: '14px 24px 24px',
    background: '#1c1c1e',
    borderRadius: '18px 18px 4px 18px',
    padding: '14px 18px',
    fontSize: 16,
    lineHeight: 1.55,
    color: '#fff',
  },
  copyBtn: {
    display: 'block',
    margin: '0 24px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: '11px',
    color: '#fff',
    fontSize: 14,
    cursor: 'pointer',
    width: 'calc(100% - 48px)',
    textAlign: 'center',
  },
  newBtn: {
    display: 'block',
    margin: '0 24px 24px',
    background: 'rgba(255,30,100,0.12)',
    border: '1px solid rgba(255,30,100,0.3)',
    borderRadius: 10,
    padding: '11px',
    color: '#ff3c6e',
    fontSize: 14,
    cursor: 'pointer',
    width: 'calc(100% - 48px)',
    textAlign: 'center',
  },
  shareNote: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.25)',
    padding: '0 24px 24px',
  },
  footer: {
    textAlign: 'center',
    padding: '40px 0 0',
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    lineHeight: 1.8,
  },
};

// ── COMPONENT ──────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({
    length: '1–6 months',
    vibe: 'casual',
    tone: 'gentle',
    theirName: '',
    context: '',
  });
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('idle'); // idle | generating | locked | unlocked
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    setStep('generating');
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.message) {
        setMessage(data.message);
        setStep('locked');
      } else {
        setError(data.error || 'Something went wrong. Try again.');
        setStep('idle');
      }
    } catch {
      setError('Connection error. Try again.');
      setStep('idle');
    }
  };

  const unlock = () => {
    if (orderId.trim().length > 0) setStep('unlocked');
  };

  const copy = () => {
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setMessage(''); setStep('idle'); setOrderId(''); setError('');
  };

  const paymentLink = process.env.NEXT_PUBLIC_PAYMENT_LINK || '#';

  return (
    <>
      <Head>
        <title>Breakup Texter — The AI Breakup Text Generator</title>
        <meta name="description" content="Can't find the words? Let AI write the perfect breakup text. Gentle, brutal, funny, or ghosting-adjacent." />
        <meta property="og:title" content="Breakup Texter 💔" />
        <meta property="og:description" content="AI writes the breakup text you can't." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💔</text></svg>" />
      </Head>

      <div style={S.page}>
        {/* HEADER */}
        <div style={S.header}>
          <div style={S.tagLine}>AI-Powered · Takes 30 Seconds</div>
          <h1 style={S.h1}>The Breakup Text<br />You Can't Write</h1>
          <p style={S.subtitle}>
            Tell us about the situation. We write the message.
            Gentle, brutal, funny, or a clean ghost — your call.
          </p>
        </div>

        {/* FORM (only show when not in output state) */}
        {(step === 'idle' || step === 'generating') && (
          <>
            {/* How long */}
            <div style={S.card}>
              <label style={S.label}>How long were you together?</label>
              <select
                style={S.select}
                value={form.length}
                onChange={e => set('length', e.target.value)}
              >
                {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {/* Vibe */}
            <div style={S.card}>
              <label style={S.label}>What was the vibe?</label>
              <div style={S.grid2}>
                {VIBES.map(v => (
                  <button
                    key={v.id}
                    style={S.optionBtn(form.vibe === v.id)}
                    onClick={() => set('vibe', v.id)}
                  >
                    <span style={S.optionEmoji}>{v.emoji}</span>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div style={S.card}>
              <label style={S.label}>Pick a tone</label>
              <div style={S.grid2}>
                {TONES.map(t => (
                  <button
                    key={t.id}
                    style={S.optionBtn(form.tone === t.id)}
                    onClick={() => set('tone', t.id)}
                  >
                    <span style={S.optionEmoji}>{t.emoji}</span>
                    {t.label}
                    <span style={S.optionSub}>{t.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional extras */}
            <div style={S.card}>
              <label style={S.label}>Their name <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
              <input
                style={S.input}
                type="text"
                placeholder="e.g. Jordan"
                value={form.theirName}
                onChange={e => set('theirName', e.target.value)}
              />
            </div>

            <div style={S.card}>
              <label style={S.label}>Anything specific to include? <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>(optional)</span></label>
              <textarea
                style={S.textarea}
                placeholder="e.g. They kept canceling plans, or we met on an app and never really dated properly..."
                value={form.context}
                onChange={e => set('context', e.target.value)}
              />
            </div>

            <button
              style={S.generateBtn(step === 'generating')}
              onClick={generate}
              disabled={step === 'generating'}
            >
              {step === 'generating' ? '✍️  Writing your text...' : '✨  Generate My Breakup Text'}
            </button>

            {error && <p style={S.error}>{error}</p>}
          </>
        )}

        {/* LOCKED OUTPUT */}
        {step === 'locked' && (
          <div style={S.outputCard}>
            <div style={S.outputHeader}>Your Breakup Text 💔</div>

            {/* Text bubble with blur on bottom half */}
            <div style={{ position: 'relative' }}>
              <div style={S.bubble}>
                {message}
              </div>
              <div style={S.blurOverlay} />
            </div>

            {/* Pay gate */}
            <div style={S.payGate}>
              <div style={S.payTitle}>Unlock your message 🔓</div>
              <div style={S.paySub}>One-time $3 · Instant reveal · Keep forever</div>

              <a
                href={paymentLink}
                target="_blank"
                rel="noopener noreferrer"
                style={S.payBtn}
                onClick={e => paymentLink === '#' && e.preventDefault()}
              >
                💳 &nbsp;Pay $3 to Reveal
              </a>

              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
                Already paid? Enter your order ID below
              </div>
              <div style={S.unlockRow}>
                <input
                  style={S.unlockInput}
                  placeholder="Order ID from Gumroad..."
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && unlock()}
                />
                <button style={S.unlockBtn} onClick={unlock}>Unlock</button>
              </div>
            </div>
          </div>
        )}

        {/* UNLOCKED OUTPUT */}
        {step === 'unlocked' && (
          <div style={S.outputCard}>
            <div style={S.outputHeader}>Your Breakup Text 💔</div>
            <div style={S.fullBubble}>{message}</div>
            <button style={S.copyBtn} onClick={copy}>
              {copied ? '✅ Copied!' : '📋 Copy to clipboard'}
            </button>
            <button style={S.newBtn} onClick={reset}>
              ↩ Generate another
            </button>
            <div style={S.shareNote}>
              Screenshot this and post it — tag us and we might feature yours 👀
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={S.footer}>
          <div>Made with Claude AI · Breakup Texter</div>
          <div>Not responsible for any texts actually sent 💀</div>
        </div>
      </div>
    </>
  );
}
