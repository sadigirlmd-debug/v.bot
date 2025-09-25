const config = require('../settings')
const os = require('os')
const fs = require('fs')
const si = require('systeminformation')
const prefix = config.PREFIX
const simpleGit = require('simple-git')
const Levels = require("discord-xp")
const git = simpleGit()
const Heroku = require('heroku-client')
const appname = process.env.APP_NAME || ''
const herokuapi = process.env.HEROKU_API
const pingSt = new Date();
const { cmd, commands } = require('../lib/command')
const DB = require('../lib/scraper')
const owner = JSON.parse(fs.readFileSync('./lib/owner.json'))
const devlopernumber = "94760264995"
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson,clockString, jsonformat} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/database")
const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')


 function genMsgId() {
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }

  return randomText;
} 

const reportedMessages = {}
//const isBan = banUser.includes(mek.sender)
	    
	
var BOTOW = ''
if(config.LANG === 'SI') BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"
//============================================================================


cmd({
  pattern: "deploy",
  desc: "Auto deploy VAJIRA-MD bot to Heroku using SESSION_ID",
  category: "deploy",
  use: ".deploy your_session_id",
  filename: __filename
},
async (conn, mek, m, { q = "", reply }) => {
  const sessionid = q.trim();
  if (!sessionid) return reply("Usage: .deploy your_session_id");

  const headers = {
    Authorization: `Bearer ${HEROKU_API_KEY}`,
    Accept: "application/vnd.heroku+json; version=3",
    "Content-Type": "application/json",
    "Heroku-Team": HEROKU_TEAM // Fix: Move team into header
  };

  try {
    // Step 1: Create a new app in the team
    const { data: app } = await axios.post("https://api.heroku.com/apps", {
      region: "us"
    }, { headers });

    // Step 2: Set SESSION_ID as config var
    await axios.patch(`https://api.heroku.com/apps/${app.id}/config-vars`, {
      SESSION_ID: sessionid
    }, { headers });

    // Step 3: Set Node.js buildpack
    await axios.patch(`https://api.heroku.com/apps/${app.id}/buildpack-installations`, {
      updates: [
        { buildpack: "https://github.com/heroku/heroku-buildpack-nodejs" }
      ]
    }, { headers });

    // Step 4: Deploy GitHub template from ZIP
    await axios.post(`https://api.heroku.com/apps/${app.id}/builds`, {
      source_blob: {
        url: "https://github.com/webscrape2003/VAJIRA-MD/archive/refs/heads/master.zip"
      }
    }, { headers });

    // Success response
    await reply(`✅ App deployed successfully!\n\n🔗 https://${app.name}.herokuapp.com\nApp Name: *${app.name}*`);
  } catch (err) {
    console.error(err?.response?.data || err);
    reply("❌ Heroku deployment failed. Check your API key, team name, or SESSION_ID.");
  }
});

cmd({
  pattern: "channelreact",
  alias: ["chr"],
  react: "📕",
  use: ".channelreact <link>,<reaction>",
  desc: "React to a channel message",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, { q, reply }) => {
  try {
    // Language variables
    let usageMsg, invalidInput, invalidFormat, successMsg, errorMsg;
    
    if (config.LANG === 'si') {
      usageMsg = "*භාවිතය:* .channelreact <link>,<reaction>";
      invalidInput = "*අවලංගු ආදානයක්.* කරුණාකර සබැඳිය හා විකාශය දෙකම ලබාදෙන්න.";
      invalidFormat = "*අවලංගු නාලිකා සබැඳි ආකෘතියක්.*";
      successMsg = (reaction) => `✅ "${reaction}" ලෙස ප්‍රතික්‍රියාවක් යවා ඇත.`;
      errorMsg = (msg) => `❌ දෝෂයක්: ${msg}`;
    } else {
      usageMsg = "*Usage:* .channelreact <channel link>,<emoji>";
      invalidInput = "*Invalid input.* Please provide both the link and the emoji.";
      invalidFormat = "*Invalid channel link format.*";
      successMsg = (reaction) => `✅ Reacted with "${reaction}" to the message.`;
      errorMsg = (msg) => `❌ Error: ${msg}`;
    }

    if (!q || !q.includes(',')) return reply(usageMsg);
    const [link, reaction] = q.split(',').map(v => v.trim());
    if (!link || !reaction) return reply(invalidInput);

    const parts = link.split('/');
    const channelId = parts[4];
    const messageId = parts[5];

    if (!channelId || !messageId) return reply(invalidFormat);

    const res = await conn.newsletterMetadata("invite", channelId);
    await conn.newsletterReactMessage(res.id, messageId, reaction);

    reply(successMsg(reaction));
  } catch (e) {
    console.error(e);
    reply(errorMsg(e.message));
  }
});


const { cmd } = require('../command');

const { cmd, commands } = require('../lib/command')
const config = require('../settings')
cmd({
    pattern: "channeljid",
    react: "📡",
    desc: "Get JID from WhatsApp channel link",
    category: "tools",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ කරුණාකර channel link එක දාන්න.\n\nඋදා: *.channeljid https://whatsapp.com/channel/0029VaJRCY0Hj8XkZqv1u1a*");

        // extract channel code
        const match = q.match(/whatsapp\.com\/channel\/([0-9A-Za-z]+)/);
        if (!match) return reply("❌ වැරදි channel link එකක්.");

        const code = match[1];
        const jid = `invite.${code}@newsletter`;

        await reply(`✅ Channel JID:\n\n\`\`\`${jid}\`\`\``);

    } catch (e) {
        console.error("channeljid error:", e);
        reply(`⚠️ Error: ${e.message || e}`);
    }
});