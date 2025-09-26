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


const axios = require("axios");
const { cmd } = require("../command");

const config = {
  HEROKU_API_KEY: "HRKU-AA8YIJdaMlw7Y-WsGYZs4aFxcuWA7TRHqjXQ8u1F963w_____wB2AhbKFY1H",
  HEROKU_TEAM: "", // Team එකක් use නොකලොත් blank
  HEROKU_APP_NAME: "zanta-xmd-auto" // Fixed app name
};

cmd({
  pattern: "deploy",
  desc: "Auto deploy/update ZANTA-XMD bot on Heroku using SESSION_ID",
  category: "deploy",
  use: ".deploy your_session_id",
  filename: __filename
},
async (conn, mek, m, { q = "", reply }) => {
  const sessionid = q.trim();
  if (!sessionid) return reply("⚠️ Usage: .deploy your_session_id");

  const headers = {
    Authorization: `Bearer ${config.HEROKU_API_KEY}`,
    Accept: "application/vnd.heroku+json; version=3",
    "Content-Type": "application/json"
  };

  try {
    // 1. Try to get existing app by name
    let app;
    try {
      const { data } = await axios.get(`https://api.heroku.com/apps/${config.HEROKU_APP_NAME}`, { headers });
      app = data;
    } catch {
      // If app doesn't exist, create it
      const { data } = await axios.post("https://api.heroku.com/apps", {
        name: config.HEROKU_APP_NAME,
        region: "us",
        organization: config.HEROKU_TEAM || undefined
      }, { headers });
      app = data;
    }

    // 2. Update SESSION_ID
    await axios.patch(`https://api.heroku.com/apps/${app.id}/config-vars`, {
      SESSION_ID: sessionid
    }, { headers });

    // 3. Ensure Node.js buildpack is set
    await axios.put(`https://api.heroku.com/apps/${app.id}/buildpack-installations`, {
      updates: [
        { buildpack: "https://github.com/heroku/heroku-buildpack-nodejs" }
      ]
    }, { headers });

    // 4. Trigger new build from GitHub repo
    await axios.post(`https://api.heroku.com/apps/${app.id}/builds`, {
      source_blob: {
        url: "https://github.com/sadigirlmd-debug/v.bot/archive/refs/heads/main.zip",
        version: "update-deploy"
      }
    }, { headers });

    // 5. Reply success
    await reply(`✅ ZANTA-XMD Bot updated successfully!\n\n🔗 https://${app.name}.herokuapp.com\n📦 App: *${app.name}*`);
  } catch (err) {
    console.error(err?.response?.data || err);
    reply("❌ Heroku auto deploy failed. Check API key, app name, or SESSION_ID.");
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

