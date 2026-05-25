# 🤖 Zara — Instagram DM Bot
### SAYANJALI NEXUS PRIVATE LIMITED

Zara automatically replies to every Instagram DM using Claude AI — qualifying leads, booking appointments, and handling support 24/7.

---

## 📁 File Structure

```
zara-instagram-bot/
├── server.js        ← Express webhook server (entry point)
├── zara.js          ← Claude AI brain + conversation memory
├── instagram.js     ← Meta Graph API (send/receive DMs)
├── .env             ← Your secret keys (never commit this!)
├── .env.example     ← Template for .env
└── package.json
```

---

## 🚀 FULL SETUP GUIDE

### STEP 1 — Create a Meta Developer App

1. Go to **https://developers.facebook.com**
2. Click **My Apps → Create App**
3. Select **Business** type
4. Give it a name e.g. `Zara-SAYANJALI`
5. Add product: **Instagram Graph API** (click Set Up)

---

### STEP 2 — Connect Your Instagram Business Account

1. In your Meta App dashboard → **Instagram → API setup**
2. Connect your **Instagram Business or Creator account**
3. Copy your **Instagram Business Account ID** (a number like `17841400000000000`)

---

### STEP 3 — Get Your Page Access Token

1. In App dashboard → **Instagram → API setup with Instagram login**
2. Under *Generate access tokens*, click **Generate**
3. Copy the **long-lived Page Access Token** (starts with `EAABsb...`)

> ⚠️ For production, generate a **permanent token** via System User in Business Manager.

---

### STEP 4 — Deploy the Bot Server (Free on Railway)

1. Go to **https://railway.app** — sign up free
2. Click **New Project → Deploy from GitHub**
3. Upload/push this folder to a GitHub repo
4. Railway auto-detects Node.js and deploys
5. Your live URL will be: `https://your-app.railway.app`

> Alternatively use **Render.com** or **Fly.io** (both free tier available)

---

### STEP 5 — Set Environment Variables

In Railway dashboard → your project → **Variables**, add:

| Variable | Value |
|---|---|
| `VERIFY_TOKEN` | `zara_sayanjali_secret_2025` (any string you choose) |
| `PAGE_ACCESS_TOKEN` | Your Meta token from Step 3 |
| `INSTAGRAM_BUSINESS_ID` | Your IG Business ID from Step 2 |
| `ANTHROPIC_API_KEY` | Your key from console.anthropic.com |
| `PORT` | `3000` |

---

### STEP 6 — Configure Webhook in Meta Dashboard

1. Meta App dashboard → **Instagram → Webhooks**
2. Click **Configure Webhooks**
3. **Callback URL**: `https://your-app.railway.app/webhook`
4. **Verify Token**: `zara_sayanjali_secret_2025` (same as your env)
5. Click **Verify and Save**
6. Subscribe to the **messages** event

---

### STEP 7 — Test It!

1. Open Instagram
2. DM your business account from any account
3. Zara should reply within 2–3 seconds ✅

---

## 🧪 Local Testing with ngrok

```bash
# Install ngrok: https://ngrok.com
npm install
cp .env.example .env
# Fill in your .env values

node server.js        # Start bot locally on port 3000
ngrok http 3000       # Expose to internet

# Use ngrok URL as webhook: https://xxxx.ngrok.io/webhook
```

---

## 💡 How It Works

```
User sends DM
     ↓
Meta sends POST to /webhook
     ↓
server.js receives message
     ↓
zara.js sends to Claude API (with full conversation history)
     ↓
Claude returns Zara's reply
     ↓
instagram.js sends reply back via Graph API
     ↓
User sees Zara's message in DMs ✅
```

---

## 🔒 Security Notes

- Never commit your `.env` file to GitHub
- Add `.env` to your `.gitignore`
- Rotate your API keys regularly
- Use a **System User token** in production (never expires)

---

## 📊 What Zara Does in DMs

| Scenario | Zara's Action |
|---|---|
| New DM: "Hi" | Greets warmly, asks how to help |
| Asks about services | Explains relevant service, qualifies lead |
| Wants pricing | Asks about requirements first |
| Wants to book | Collects name, email, phone, date |
| Says "too expensive" | Asks about budget range |
| Wants human | Asks for contact info, escalates |
| "I'll think about it" | Offers follow-up scheduling |

---

## 🛠 Customization

**Change Zara's personality** → Edit `SYSTEM_PROMPT` in `zara.js`

**Change conversation memory duration** → Edit `CONV_TIMEOUT_MS` in `zara.js`

**Add quick reply buttons** → Extend `instagram.js` with `quick_replies` in the message payload

---

Built for **SAYANJALI NEXUS PRIVATE LIMITED** 🚀
