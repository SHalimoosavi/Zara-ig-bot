// instagram.js — Meta Graph API helpers
const axios = require("axios");

const GRAPH_URL = "https://graph.instagram.com/v21.0";

/**
 * Send a text reply to an Instagram DM thread.
 */
async function sendDM(recipientId, text) {
  const token = process.env.PAGE_ACCESS_TOKEN;
  const igId  = process.env.INSTAGRAM_BUSINESS_ID;

  try {
    const res = await axios.post(
      `${GRAPH_URL}/${igId}/messages`,
      {
        recipient: { id: recipientId },
        message:   { text },
      },
      {
        params: { access_token: token },
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(`[Instagram] Sent to ${recipientId} | message_id: ${res.data.message_id}`);
    return res.data;
  } catch (err) {
    const details = err.response?.data?.error || err.message;
    console.error("[Instagram] sendDM error:", JSON.stringify(details, null, 2));
    throw err;
  }
}

/**
 * Mark a message as seen (optional — shows "Seen" tick).
 */
async function markSeen(senderId) {
  const token = process.env.PAGE_ACCESS_TOKEN;
  const igId  = process.env.INSTAGRAM_BUSINESS_ID;
  try {
    await axios.post(
      `${GRAPH_URL}/${igId}/messages`,
      {
        recipient:      { id: senderId },
        sender_action:  "mark_seen",
      },
      { params: { access_token: token } }
    );
  } catch (_) { /* non-critical */ }
}

/**
 * Show typing indicator (optional — shows "…" bubble).
 */
async function showTyping(senderId) {
  const token = process.env.PAGE_ACCESS_TOKEN;
  const igId  = process.env.INSTAGRAM_BUSINESS_ID;
  try {
    await axios.post(
      `${GRAPH_URL}/${igId}/messages`,
      {
        recipient:     { id: senderId },
        sender_action: "typing_on",
      },
      { params: { access_token: token } }
    );
  } catch (_) { /* non-critical */ }
}

module.exports = { sendDM, markSeen, showTyping };
