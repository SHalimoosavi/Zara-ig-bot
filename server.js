// server.js — Zara Instagram DM Bot
// SAYANJALI NEXUS PRIVATE LIMITED
require("dotenv").config();

const express    = require("express");
const { getZaraReply } = require("./zara");
const { sendDM, markSeen, showTyping } = require("./instagram");

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ status: "running", bot: "Zara — SAYANJALI NEXUS PRIVATE LIMITED", version: "1.0.0" });
});

// Webhook Verification
app.get("/webhook", (req, res) => {
  const mode      = req.query["hub.mode"];
  const token     = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("[Webhook] Verified by Meta");
    return res.status(200).send(challenge);
  }
  console.warn("[Webhook] Verification failed");
  res.sendStatus(403);
});

// Webhook Events
app.post("/webhook", async (req, res) => {
  res.sendStatus(200);
  const body = req.body;
  if (body.object !== "instagram") return;

  for (const entry of body.entry || []) {
    for (const event of entry.messaging || []) {
      if (event.message?.is_echo) continue;
      const senderId = event.sender?.id;
      const text     = event.message?.text?.trim();
      if (!senderId || !text) continue;

      console.log(`[DM] From ${senderId}: "${text}"`);
      try {
        await markSeen(senderId);
        await showTyping(senderId);
        const reply = await getZaraReply(senderId, text);
        await sendDM(senderId, reply);
        console.log(`[Zara -> ${senderId}]: "${reply.substring(0, 60)}..."`);
      } catch (err) {
        console.error(`[Error] ${senderId}:`, err.message);
        try { await sendDM(senderId, "Sorry, I ran into a problem. Please try again! "); } catch (_) {}
      }
    }
  }
});

app.listen(PORT, () => {
  console.log("Zara Instagram Bot running on port " + PORT);
  const required = ["VERIFY_TOKEN", "PAGE_ACCESS_TOKEN", "INSTAGRAM_BUSINESS_ID", "ANTHROPIC_API_KEY"];
  const missing  = required.filter(k => !process.env[k] || process.env[k].includes("your_"));
  if (missing.length) console.warn("Missing env vars:", missing.join(", "));
});
