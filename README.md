# 💔 Breakup Texter

> App 1 of 5 · Launch by May 7 · $3/message

---

## Setup (5 minutes, do once)

### Step 1 — Copy the env file
Open Terminal, drag the `breakup-texter` folder in, and run:
```
cp .env.local.example .env.local
```

### Step 2 — Add your Claude API key
1. Go to **console.anthropic.com** → create account → API keys → New key
2. Copy the key (starts with `sk-ant-...`)
3. Open `.env.local` in VS Code and paste it after `ANTHROPIC_API_KEY=`

### Step 3 — Set up your Gumroad payment link
1. Go to **gumroad.com** → create a free account
2. Products → New Product → Digital Product
3. Set price to **$3.00**, name it "Breakup Text Unlock"
4. In the "Content" box, type: `Your breakup text is unlocked — go back to the app and enter your order ID.`
5. Publish it → copy the product URL
6. In `.env.local`, paste it after `NEXT_PUBLIC_PAYMENT_LINK=`

### Step 4 — Run the app locally
```
npm install
npm run dev
```
App opens at **http://localhost:3000** ✅

---

## Deploy to the Internet (free, 2 minutes)

1. Go to **vercel.com** → sign up with GitHub
2. Push this folder to a GitHub repo (or use Vercel CLI: `npx vercel`)
3. When Vercel asks for environment variables, add:
   - `ANTHROPIC_API_KEY` = your key
   - `NEXT_PUBLIC_PAYMENT_LINK` = your Gumroad link
4. Deploy → you get a live URL instantly

---

## How the money works

| User action | What happens |
|---|---|
| Fills out form + clicks Generate | Claude writes their breakup text (costs you ~$0.002) |
| Sees blurred message | Teaser — they want it |
| Clicks "Pay $3" | Goes to your Gumroad page, pays $3 (you keep ~$2.70 after fees) |
| Gets Gumroad order ID | Enters it in the app → message unlocks |

**Your profit per message:** ~$2.70  
**Break-even:** 8 messages/day covers Vercel (free tier) + API costs  
**$150 goal:** 56 messages = 56 customers

---

## Launch checklist

- [ ] App running locally
- [ ] `.env.local` filled in
- [ ] Gumroad product live
- [ ] Deployed to Vercel
- [ ] Post first TikTok — screenshot a funny output and post it
- [ ] Post to r/BreakUps, r/dating, r/relationship_advice with a "made this" post
- [ ] DM 5 friends the link to test it

---

## Revenue tracking

Keep a note. Every Gumroad sale emails you with the order ID and $3.

---

*Built with Claude API · Next.js · Vercel*
