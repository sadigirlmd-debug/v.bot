const { cmd, commands } = require('../lib/command')
const config = require('../settings')



const activeReacts = {};

cmd({
  pattern: "testr",
  alias: ["test"],
  react: "📕",
  use: ".chr <channel_jid> <emoji> | .chr off",
  desc: "Auto react to all messages in a channel",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("*Usage:* .chr <channel_jid> <emoji> | .chr off");

    if (q.toLowerCase() === "off") {
      delete activeReacts[m.chat];
      return reply("❌ Auto-react stopped for this channel.");
    }

    const [channelJid, reaction] = q.split(" ").map(v => v.trim());
    if (!channelJid || !reaction) {
      return reply("⚠️ Please provide both <channel_jid> and <emoji>.");
    }

    if (!channelJid.endsWith("@newsletter")) {
      return reply("⚠️ Invalid JID. Example: `1203630xxxxx@newsletter`");
    }

    // Save auto-react for this channel
    activeReacts[channelJid] = reaction;

    reply(`✅ Auto-react enabled for *${channelJid}* with "${reaction}"`);

  } catch (e) {
    console.error(e);
    reply("❌ Error: " + e.message);
  }
});

// Listener for channel messages
function setupAutoReact(conn) {
  conn.ev.on("messages.upsert", async (msg) => {
    try {
      const m = msg.messages[0];
      if (!m?.key?.remoteJid) return;

      const jid = m.key.remoteJid;
      const reaction = activeReacts[jid];
      if (!reaction) return; // no auto-react

      if (jid.endsWith("@newsletter") && m.key.id) {
        await conn.newsletterReactMessage(jid, m.key.id, reaction);
        console.log(`Auto-reacted ${reaction} to msg ${m.key.id} in ${jid}`);
      }
    } catch (e) {
      console.error("Auto-react error:", e);
    }
  });
}

module.exports = { setupAutoRea