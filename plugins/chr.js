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