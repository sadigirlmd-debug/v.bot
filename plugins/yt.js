const yts = require("yt-search");
const ddownr = require("denethdev-ytmp3");
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
const devlopernumber = "94711453361"
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
  pattern: "song",
  react: "🎵",
  desc: "Download a YouTube song as normal audio",
  category: "download",
  use: ".song Faded Alan Walker",
  filename: __filename,
},
async (
  conn,
  mek,
  m,
  { from, l, q, reply }
) => {
  try {
    if (!q) return reply("❌ *Please provide a YouTube title or link!*\n\nExample: *.song Faded Alan Walker*");

    // Search YouTube
    const search = await yts(q);
    const data = search.videos[0];
    if (!data) return reply("❌ No matching result found.");

    // Download MP3
    const result = await ddownr.download(data.url, "mp3");
    const downloadLink = result.downloadUrl;

    // Caption
    const caption =
      `🎧 *VAJIRA SONG DOWNLOADER*\n\n` +
      `🎼 Title: *${data.title}*\n` +
      `📅 Uploaded: ${data.ago}\n` +
      `⏱ Duration: ${data.timestamp}\n` +
      `👁 Views: ${data.views}\n` +
      `🔗 URL: ${data.url}\n\n` +
      `● *VAJIRA MINI BOT* ●`;

    // Send as normal audio
    await conn.sendMessage(from, {
      audio: { url: downloadLink },
      mimetype: "audio/mpeg",
      ptt: false, // normal audio
      caption
    }, { quoted: mek });

  } catch (e) {
    reply(`⚠️ *Error occurred:* ${e.message || "Unknown error"}`);
    l(e);
  }
});