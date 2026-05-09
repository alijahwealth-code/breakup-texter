import { useState } from 'react';

const GUMROAD_LINK = 'https://alijah.gumroad.com/l/plpvmb';

export default function Home() {
  const [selections, setSelections] = useState({ vibe: 'casual', tone: 'gentle' });
  const [length, setLength] = useState('1-6 months');
  const [theirName, setTheirName] = useState('');
  const [context, setContext] = useState('');
  const [preview, setPreview] = useState('');
  const [messageId, setMessageId] = useState('');
  const [fullMessage, setFullMessage] = useState('');
  const [screen, setScreen] = useState('form');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [orderId, setOrderId] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');
  const [copied, setCopied] = useState(false);

  const select = (group, val) => setSelections(s => ({ ...s, [group]: val }));

  const generate = async () => {
    setGenError('');
    setGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, theirName, context, vibe: selections.vibe, tone: selections.tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setPreview(data.preview);
      setMessageId(data.messageId);
      setScreen('locked');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setGenError(e.message || 'Something went wrong. Try again.');
    } finally {
      setGenerating(false);
    }
  };

  const unlock = async () => {
    setUnlockError('');
    if (!orderId.trim()) { setUnlockError('Paste your order ID first.'); return; }
    setUnlocking(true);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ saleId: orderId.trim(), messageId }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) throw new Error(data.error || 'Order ID not found. Check your Gumroad receipt.');
      setFullMessage(data.message);
      setScreen('unlocked');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setUnlockError(e.message || 'Could not verify. Check your order ID.');
    } finally {
      setUnlocking(false);
    }
  };

  const reset = () => {
    setPreview(''); setMessageId(''); setFullMessage('');
    setScreen('form'); setOrderId('');
    setGenError(''); setUnlockError(''); setCopied(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copy = () => {
    navigator.clipboard.writeText(fullMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const vibes = [
    { val: 'casual', emoji: '\u{1F60E}', label: 'Casual thing' },
    { val: 'serious', emoji: '\u{1F48D}', label: 'Serious / official' },
    { val: 'complicated', emoji: '\u{1F300}', label: "It's complicated" },
    { val: 'toxic', emoji: '\u{2620}\uFE0F', label: 'Toxic situation' },
  ];
  const tones = [
    { val: 'gentle', emoji: '\u{1F499}', label: 'Gentle', sub: 'Kind but clear' },
    { val: 'brutal', emoji: '\u{1F5E1}\uFE0F', label: 'Brutal', sub: 'Zero sugarcoating' },
    { val: 'funny', emoji: '\u{1F605}', label: 'Funny', sub: 'Awkward but real' },
    { val: 'ghost', emoji: '\u{1F47B}', label: 'Ghost Mode', sub: 'Classy disappear' },
  ];

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{min-height:100vh;background:linear-gradient(135deg,#0d0010 0%,#1a0020 50%,#0d0010 100%);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#fff;padding:0 16px 80px}
        .hero{text-align:center;padding:48px 0 32px}
        .badge{display:inline-block;background:rgba(255,100,130,.15);border:1px solid rgba(255,100,130,.3);color:#ff8fa3;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:20px;margin-bottom:20px}
        h1{font-size:clamp(36px,8vw,64px);font-weight:900;line-height:1.05;letter-spacing:-1px;background:linear-gradient(135deg,#fff 0%,#ffb3c1 60%,#ff6b8a 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:14px}
        .sub{color:rgba(255,255,255,.5);font-size:16px;line-height:1.5}
        .wrap{max-width:560px;margin:0 auto}
        .card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:20px;margin-bottom:12px}
        .lbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px;display:block}
        .opt{color:rgba(255,255,255,.3);font-weight:400;text-transform:none;letter-spacing:0}
        select,input[type=text],textarea{width:100%;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:11px 14px;color:#fff;font-size:15px;outline:none;font-family:inherit}
        select option{background:#1a0020}
        textarea{resize:vertical;min-height:80px}
        .opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .opt-btn{background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 14px;color:rgba(255,255,255,.7);font-size:14px;font-weight:600;cursor:pointer;text-align:left;transition:all .15s;display:flex;align-items:center;gap:8px;width:100%}
        .opt-btn:hover{border-color:rgba(255,100,130,.4);background:rgba(255,100,130,.06)}
        .opt-btn.sel{border-color:#ff6b8a;background:rgba(255,107,138,.15);color:#fff}
        .opt-emoji{font-size:18px}
        .opt-sub{display:block;font-size:11px;font-weight:400;color:rgba(255,255,255,.35);margin-top:2px}
        .gen-btn{width:100%;background:linear-gradient(135deg,#ff6b8a,#ff8c42);border:none;border-radius:14px;padding:18px;color:#fff;font-size:17px;font-weight:800;cursor:pointer;margin-top:8px;transition:opacity .15s,transform .1s;letter-spacing:.3px}
        .gen-btn:hover{opacity:.92;transform:translateY(-1px)}
        .gen-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
        .err{color:#ff6b8a;font-size:13px;margin-top:10px;text-align:center}
        .out-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;margin-top:24px}
        .out-hdr{padding:16px 22px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.4);border-bottom:1px solid rgba(255,255,255,.07)}
        .bubble{background:rgba(255,107,138,.12);border:1px solid rgba(255,107,138,.2);border-radius:12px;padding:16px 18px;font-size:15px;line-height:1.6;color:rgba(255,255,255,.9);margin:16px 20px;white-space:pre-wrap}
        .blur-wrap{position:relative}
        .blur-ov{position:absolute;inset:16px 20px;border-radius:12px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);background:rgba(13,0,16,.5)}
        .pay-gate{padding:20px 22px 24px;text-align:center;border-top:1px solid rgba(255,255,255,.07)}
        .pay-title{font-size:17px;font-weight:800;margin-bottom:4px}
        .pay-sub{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:16px}
        .pay-btn{background:linear-gradient(135deg,#ff6b8a,#ff8c42);border:none;border-radius:12px;padding:14px 28px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;width:100%;margin-bottom:16px}
        .already{font-size:12px;color:rgba(255,255,255,.35);margin-bottom:10px}
        .unlock-row{display:flex;gap:8px}
        .unlock-input{flex:1;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.15);border-radius:10px;padding:10px 14px;color:#fff;font-size:14px;outline:none}
        .unlock-btn{background:rgba(255,107,138,.2);border:1px solid rgba(255,107,138,.4);border-radius:10px;padding:10px 18px;color:#ff8fa3;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}
        .unlock-btn:disabled{opacity:.5;cursor:not-allowed}
        .action-btn{width:calc(100% - 44px);margin:0 22px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:13px;color:rgba(255,255,255,.8);font-size:14px;font-weight:600;cursor:pointer;display:block}
        .share{font-size:12px;color:rgba(255,255,255,.25);text-align:center;padding:0 22px 20px}
        .footer{text-align:center;margin-top:48px;font-size:12px;color:rgba(255,255,255,.2);line-height:1.8}
      `}</style>

      <div className="hero">
        <div className="badge">AI-Powered · 30 Seconds</div>
        <h1>The Breakup Text<br/>You Can&apos;t Write</h1>
        <p className="sub">Tell us about the situation. We write the message.<br/>Gentle, brutal, funny, or a clean ghost — your call.</p>
      </div>

      {screen === 'form' && (
        <div className="wrap">
          <div className="card">
            <label className="lbl">How long were you together?</label>
            <select value={length} onChange={e => setLength(e.target.value)}>
              <option>Less than a month</option>
              <option>1-6 months</option>
              <option>6-12 months</option>
              <option>1-2 years</option>
              <option>2+ years</option>
            </select>
          </div>
          <div className="card">
            <label className="lbl">What was the vibe?</label>
            <div className="opts">
              {vibes.map(v => (
                <button key={v.val} className={`opt-btn${selections.vibe===v.val?' sel':''}`} onClick={() => select('vibe', v.val)}>
                  <span className="opt-emoji">{v.emoji}</span><span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="card">
            <label className="lbl">Pick a tone</label>
            <div className="opts">
              {tones.map(t => (
                <button key={t.val} className={`opt-btn${selections.tone===t.val?' sel':''}`} onClick={() => select('tone', t.val)}>
                  <span className="opt-emoji">{t.emoji}</span>
                  <div><span>{t.label}</span><span className="opt-sub">{t.sub}</span></div>
                </button>
              ))}
            </div>
          </div>
          <div className="card">
            <label className="lbl">Their name <span className="opt">(optional)</span></label>
            <input type="text" placeholder="e.g. Jordan" value={theirName} onChange={e => setTheirName(e.target.value)} />
          </div>
          <div className="card">
            <label className="lbl">Anything specific to include? <span className="opt">(optional)</span></label>
            <textarea placeholder="e.g. They kept canceling plans..." value={context} onChange={e => setContext(e.target.value)} />
          </div>
          <button className="gen-btn" onClick={generate} disabled={generating}>
            {generating ? '✍️  Writing your text...' : '✨  Generate My Breakup Text'}
          </button>
          {genError && <p className="err">{genError}</p>}
        </div>
      )}

      {screen === 'locked' && (
        <div className="wrap">
          <div className="out-card">
            <div className="out-hdr">Your Breakup Text 💔</div>
            <div className="blur-wrap">
              <div className="bubble">{preview}</div>
              <div className="blur-ov"></div>
            </div>
            <div className="pay-gate">
              <div className="pay-title">Unlock your message 🔓</div>
              <div className="pay-sub">One-time payment · Instant reveal · Keep forever</div>
              <button className="pay-btn" onClick={() => window.open(GUMROAD_LINK, '_blank')}>
                💳&nbsp; Get on Gumroad to Unlock
              </button>
              <div className="already">Already paid? Enter your order ID below</div>
              <div className="unlock-row">
                <input className="unlock-input" placeholder="Order ID from Gumroad..." value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                  onKeyDown={e => e.key==='Enter' && unlock()} />
                <button className="unlock-btn" onClick={unlock} disabled={unlocking}>
                  {unlocking ? 'Checking...' : 'Unlock'}
                </button>
              </div>
              {unlockError && <p className="err" style={{marginTop:'8px'}}>{unlockError}</p>}
            </div>
          </div>
        </div>
      )}

      {screen === 'unlocked' && (
        <div className="wrap">
          <div className="out-card">
            <div className="out-hdr">Your Breakup Text 💔</div>
            <div className="bubble" style={{margin:'16px 20px 20px'}}>{fullMessage}</div>
            <button className="action-btn" onClick={copy}>{copied ? '✅  Copied!' : '📋  Copy to clipboard'}</button>
            <button className="action-btn" onClick={reset}>↩&nbsp; Generate another</button>
            <div className="share">Screenshot &amp; post it — tag us and we might feature yours 👀</div>
          </div>
        </div>
      )}

      <div className="footer">
        <div>Made with Claude AI · Breakup Texter</div>
        <div>Not responsible for any texts actually sent 💀</div>
      </div>
    </>
  );
}
