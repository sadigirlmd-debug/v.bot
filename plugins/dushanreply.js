

const config = require('../settings');
const fs = require('fs');
const path = require('path');
const { cmd } = require('../lib/command');

// ================= AUTO VOICE =================
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  if (isOwner) return; // skip owner messages

  const filePath = path.join(__dirname, '../media/autovoice.json');
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const text in data) {
    if (body.toLowerCase() === text.toLowerCase()) {
      await conn.sendPresenceUpdate('recording', from);
      await conn.sendMessage(from, {
        audio: { url: data[text] },
        mimetype: 'audio/mpeg',
        ptt: true
      }, { quoted: mek });
      console.log(`🎵 Auto voice sent: ${text}`);
      return;
    }
  }
});

// ================= AUTO STICKER =================
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  if (isOwner) return;

  const filePath = path.join(__dirname, '../media/autosticker.json');
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const text in data) {
    if (body.toLowerCase() === text.toLowerCase()) {
      await conn.sendMessage(from, {
        sticker: { url: data[text] },
        package: 'YourBotName'
      }, { quoted: mek });
      console.log(`💠 Auto sticker sent: ${text}`);
      return;
    }
  }
});

// ================= AUTO REPLY =================
cmd({ on: "body" }, async (conn, mek, m, { from, body, isOwner }) => {
  if (isOwner) return;

  const filePath = path.join(__dirname, '../media/autoreply.json');
  if (!fs.existsSync(filePath)) return;

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const text in data) {
    if (body.toLowerCase() === text.toLowerCase()) {
      await m.reply(data[text]);
      console.log(`💬 Auto reply sent: ${text}`);
      return;
    }
  }
});
