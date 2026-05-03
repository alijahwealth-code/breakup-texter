import Head from 'next/head';
import Script from 'next/script';
 
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh;
    background: linear-gradient(135deg, #0d0010 0%, #1a0020 50%, #0d0010 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #fff;
    padding: 0 16px 80px;
  }
  .header { text-align: center; padding: 52px 0 32px; }
  .tag {
    display: inline-block;
    background: rgba(255,30,100,0.15);
    border: 1px solid rgba(255,30,100,0.3);
    border-radius: 100px;
    padding: 4px 14px;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #ff3c6e;
    margin-bottom: 20px;
  }
  h1 {
    font-size: clamp(30px, 8vw, 58px);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 14px;
    background: linear-gradient(135deg, #fff 40%, #ff3c6e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subtitle { font-size: 16px; color: rgba(255,255,255,0.5); max-width: 440px; margin: 0 auto; line-height: 1.55; }
  .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 24px 20px; max-width: 540px; margin: 0 auto 14px; }
  .card-label { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: 12px; display: block; }
  .optional { color: rgba(255,255,255,0.22); font-weight: 400; }
  select, input[type="text"], textarea { width: 100%; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 11px 14px; color: #fff; font-size: 15px; outline: none; font-family: inherit; }
  select option { background: #1a0020; }
  textarea { resize: vertical; min-height: 76px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .opt-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 11px 12px; color: rgba(255,255,255,0.55); cursor: pointer; text-align: left; transition: all 0.15s; font-size: 14px; line-height: 1.3; }
  .opt-btn.active { background: rgba(255,30,100,0.18); border-color: #ff3c6e; color: #fff; }
  .opt-emoji { font-size: 17px; margin-right: 7px; }
  .opt-sub { display: block; font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 3px; }
  .opt-btn.active .opt-sub { color: rgba(255,255,255,0.55); }
  #generate-btn { display: block; width: 100%; max-width: 540px; margin: 0 auto; background: linear-gradient(135deg, #ff1a57 0%, #ff6b35 100%); border: none; border-radius: 14px; padding: 16px; color: #fff; font-size: 17px; font-weight: 700; cursor: pointer; letter-spacing: 0.3px; transition: opacity 0.2s; }
  #generate-btn:disabled { background: rgba(255,255,255,0.1); cursor: not-allowed; opacity: 0.6; }
  .error-msg { color: #ff6b6b; font-size: 14px; text-align: center; margin-top: 12px; max-width: 540px; margin-left: auto; margin-right: auto; }
  #output-section { display: none; }
  .output-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; max-width: 540px; margin: 0 auto 14px; }
  .output-header { padding: 16px 22px 0; font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); }
  .bubble { margin: 14px 22px; background: #1c1c1e; border-radius: 18px 18px 4px 18px; padding: 14px 17px; font-size: 16px; line-height: 1.58; color: #fff; position: relative; }
  .bubble-blur-wrap { position: relative; margin: 14px 22px; }
  .bubble-blur-wrap .bubble { margin: 0; }
  .blur-overlay { position: absolute; bottom: 0; left: 0; right: 0; height: 62%; background: linear-gradient(transparent, rgba(18,0,24,0.97)); border-radius: 0 0 4px 18px; pointer-events: none; }
  .pay-gate { padding: 18px 22px 22px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; }
  .pay-title { font-size: 18px; font-weight: 700; margin-bottom: 5px; }
  .pay-sub { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 18px; }
  .pay-btn { display: block; width: 100%; background: linear-gradient(135deg, #ff1a57 0%, #ff6b35 100%); border: none; border-radius: 12px; padding: 14px; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; margin-bottom: 16px; text-decoration: none; text-align: center; font-family: inherit; }
  .already-paid { font-size: 11px; color: rgba(255,255,255,0.28); margin-bottom: 10px; }
  .unlock-row { display: flex; gap: 8px; }
  .unlock-input { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 10px 13px; color: #fff; font-size: 14px; outline: none; font-family: monospace; }
  .unlock-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; padding: 10px 16px; color: #fff; font-size: 14px; cursor: pointer; white-space: nowrap; font-family: inherit; }
  .unlock-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  #unlocked-section { display: none; }
  .action-btn { display: block; margin: 0 22px 12px; border-radius: 10px; padding: 11px; font-size: 14px; cursor: pointer; font-family: inherit; text-align: center; width: calc(100% - 44px); }
  .copy-btn { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); color: #fff; }
  .new-btn { background: rgba(255,30,100,0.12); border: 1px solid rgba(255,30,100,0.3); color: #ff3c6e; margin-bottom: 20px; }
  .share-note { text-align: center; font-size: 11px; color: rgba(255,255,255,0.22); padding: 0 22px 20px; }
  .footer { text-align: center; padding: 44px 0 0; font-size: 12px; color: rgba(255,255,255,0.18); line-height: 1.9; }
`;
 
const bodyHTML = `
<div class="header">
  <div class="tag">AI-Powered · 30 Seconds</div>
  <h1>The Breakup Text<br>You Can't Write</h1>
  <p class="subtitle">Tell us about the situation. We write the message.<br>Gentle, brutal, funny, or a clean ghost — your call.</p>
</div>
 
<div id="form-section">
  <div class="card">
    <label class="card-label">How long were you together?</label>
    <select id="sel-length">
      <option>Less than a month</option>
      <option selected>1–6 months</option>
      <option>6–12 months</option>
      <option>1–2 years</option>
      <option>2+ years</option>
    </select>
  </div>
  <div class="card">
    <label class="card-label">What was the vibe?</label>
    <div class="grid2">
      <button class="opt-btn active" data-group="vibe" data-val="casual"><span class="opt-emoji">😎</span>Casual thing</button>
      <button class="opt-btn" data-group="vibe" data-val="serious"><span class="opt-emoji">💍</span>Serious / official</button>
      <button class="opt-btn" data-group="vibe" data-val="complicated"><span class="opt-emoji">🌀</span>It's complicated</button>
      <button class="opt-btn" data-group="vibe" data-val="toxic"><span class="opt-emoji">☠️</span>Toxic situation</button>
    </div>
  </div>
  <div class="card">
    <label class="card-label">Pick a tone</label>
    <div class="grid2">
      <button class="opt-btn active" data-group="tone" data-val="gentle"><span class="opt-emoji">💙</span>Gentle<span class="opt-sub">Kind but clear</span></button>
      <button class="opt-btn" data-group="tone" data-val="brutal"><span class="opt-emoji">🔪</span>Brutal<span class="opt-sub">Zero sugarcoating</span></button>
      <button class="opt-btn" data-group="tone" data-val="funny"><span class="opt-emoji">😂</span>Funny<span class="opt-sub">Shareable &amp; light</span></button>
      <button class="opt-btn" data-group="tone" data-val="ghost"><span class="opt-emoji">👻</span>Ghost Mode<span class="opt-sub">Classy disappear</span></button>
    </div>
  </div>
  <div class="card">
    <label class="card-label">Their name <span class="optional">(optional)</span></label>
    <input type="text" id="inp-name" placeholder="e.g. Jordan" />
  </div>
  <div class="card">
    <label class="card-label">Anything specific to include? <span class="optional">(optional)</span></label>
    <textarea id="inp-context" placeholder="e.g. They kept canceling plans, or we met on an app and never really dated properly..."></textarea>
  </div>
  <button id="generate-btn">✨&nbsp; Generate My Breakup Text</button>
  <p class="error-msg" id="error-msg" style="display:none"></p>
</div>
 
<div id="output-section">
  <div class="output-card">
    <div class="output-header">Your Breakup Text 💔</div>
    <div class="bubble-blur-wrap">
      <div class="bubble" id="locked-bubble"></div>
      <div class="blur-overlay"></div>
    </div>
    <div class="pay-gate">
      <div class="pay-title">Unlock your message 🔓</div>
      <div class="pay-sub">One-time $3 · Instant reveal · Keep forever</div>
      <button class="pay-btn" id="pay-btn">💳&nbsp; Pay $3 to Reveal</button>
      <div class="already-paid">Already paid? Enter your order ID from your Gumroad confirmation email</div>
      <div class="unlock-row">
        <input class="unlock-input" id="order-input" placeholder="Your Gumroad order ID…" />
        <button class="unlock-btn" id="unlock-btn">Unlock</button>
      </div>
      <p class="error-msg" id="unlock-error" style="display:none;margin-top:10px;"></p>
    </div>
  </div>
</div>
 
<div id="unlocked-section">
  <div class="output-card">
    <div class="output-header">Your Breakup Text 💔</div>
    <div class="bubble" id="full-bubble" style="margin:14px 22px 22px"></div>
    <button class="action-btn copy-btn" id="copy-btn">📋&nbsp; Copy to clipboard</button>
    <button class="action-btn new-btn" id="new-btn">↩&nbsp; Generate another</button>
    <div class="share-note">Screenshot this and post it — tag us and we might feature yours 👀</div>
  </div>
</div>
 
<div class="footer">
  <div>Made with Claude AI · Breakup Texter</div>
  <div>Not responsible for any texts actually sent 💀</div>
</div>
`;
 
export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>💔 Breakup Texter</title>
      </Head>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHTML }} />
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
