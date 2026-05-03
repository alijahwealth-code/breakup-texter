// ── STATE
let token      = '';
let fullMsg    = '';
let selections = { vibe: 'casual', tone: 'gentle' };

const PAYMENT_LINK = 'https://wealthyquest67.gumroad.com/l/plpvmb';

// ── OPTION BUTTONS
document.querySelectorAll('.opt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    document.querySelectorAll(`.opt-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selections[group] = btn.dataset.val;
  });
});

// ── GENERATE
document.getElementById('generate-btn').addEventListener('click', async () => {
  const length  = document.getElementById('sel-length').value;
  const name    = document.getElementById('inp-name').value.trim();
  const context = document.getElementById('inp-context').value.trim();
  const { vibe, tone } = selections;

  const btn = document.getElementById('generate-btn');
  btn.disabled    = true;
  btn.textContent = '✍️  Writing your text…';
  hideError('error-msg');

  try {
    const resp = await fetch('/api/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ length, vibe, tone, name, context }),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Generation failed.');

    token = data.token;
    showOutput(data.preview);

  } catch (e) {
    showError('error-msg', e.message || 'Something went wrong. Try again.');
    btn.disabled    = false;
    btn.textContent = '✨  Generate My Breakup Text';
  }
});

// ── PAY BUTTON
document.getElementById('pay-btn').addEventListener('click', () => {
  window.open(PAYMENT_LINK, '_blank');
});

// ── UNLOCK
document.getElementById('unlock-btn').addEventListener('click', unlock);
document.getElementById('order-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') unlock();
});

async function unlock() {
  const orderId = document.getElementById('order-input').value.trim();
  if (!orderId) { alert('Paste your order ID from the Gumroad confirmation email.'); return; }

  const unlockBtn = document.getElementById('unlock-btn');
  unlockBtn.textContent = 'Checking…';
  unlockBtn.disabled    = true;
  hideError('unlock-error');

  try {
    const resp = await fetch('/api/verify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ orderId, token }),
    });

    const data = await resp.json();
    if (!resp.ok || !data.message) throw new Error(data.error || 'Verification failed.');

    fullMsg = data.message;
    showUnlocked(data.message);

  } catch (e) {
    showError('unlock-error', e.message || 'Could not verify. Check your key and try again.');
    unlockBtn.textContent = 'Unlock';
    unlockBtn.disabled    = false;
  }
}

// ── COPY & RESET
document.getElementById('copy-btn').addEventListener('click', () => {
  navigator.clipboard.writeText(fullMsg).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = '✅  Copied!';
    setTimeout(() => { btn.textContent = '📋  Copy to clipboard'; }, 2000);
  });
});

document.getElementById('new-btn').addEventListener('click', () => {
  token = ''; fullMsg = '';
  document.getElementById('output-section').style.display   = 'none';
  document.getElementById('unlocked-section').style.display = 'none';
  document.getElementById('form-section').style.display     = 'block';
  const btn = document.getElementById('generate-btn');
  btn.disabled    = false;
  btn.textContent = '✨  Generate My Breakup Text';
  document.getElementById('order-input').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── UI HELPERS
function showOutput(preview) {
  document.getElementById('locked-bubble').textContent   = preview;
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('output-section').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showUnlocked(msg) {
  document.getElementById('full-bubble').textContent        = msg;
  document.getElementById('output-section').style.display   = 'none';
  document.getElementById('unlocked-section').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent   = msg;
  el.style.display = 'block';
}

function hideError(id) {
  document.getElementById(id).style.display = 'none';
}
