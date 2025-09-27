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
  pattern: "alive",
  react: "💃",
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{


if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
const cap = `❖──👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻──❖

╭───═❮ *ᴍᴇɴᴜ ʟɪsᴛ* ❯═───❖
│ *🚀𝙑𝙀𝙍𝙎𝙄𝙊𝙉:* ${require("../package.json").version}
│ *⌛𝙈𝙀𝙈𝙊𝙍𝙔:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│ *🕒𝙍𝙐𝙉𝙏𝙄𝙈𝙀:* ${runtime(process.uptime())}
│ *📍𝙋𝙇𝘼𝙏𝙁𝙊𝙍𝙈:* ${hostname}
╰━━━━━━━━━━━━━━━┈⊷`
var vajiralod = [
"LOADING ●●○○○○",
"LOADING ●●●●○○",
"LOADING ●●●●●●",
"`🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️`"	
]
let { key } = await conn.sendMessage(from, {text: ''})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}	


const category = q.trim().toUpperCase();
let menuc = `${monspace}😚 කොහොමද ${pushname} I'm alive now${monspace}

*🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️*

*🚀Version:* ${require("../package.json").version}

*⌛Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

*🕒Runtime:* ${runtime(process.uptime())}

*📍Platform:* ${hostname}

*🤖sᴛᴀᴛᴜs*: ᴢᴀɴᴛᴀ-xᴍᴅ ᴀʟɪᴠᴇ ᴀɴᴅ ʀᴇᴀᴅʏ


🖇️ *CHANEL :- https://whatsapp.com/channel/0029Vb4F314CMY0OBErLlV2M*

👤 *OWNER :- MR SURANGA MOD-Z*\n\n> 🧙‍♂️ 𝚉𝙰𝙽𝚃𝙰-𝚇𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 🧙‍♂️\n\n`;
        let wm = '*ᴘᴏᴡᴇʀᴇᴅ ʙʏᴇ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ *'	

  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download😇'){
  if(!commands[i].dontAddCommandList){

menuc += `• *${commands[i].pattern}*\n`
}}};

let menuc1 = `*◈╾──────${category} SEARCH COMMAND LIST──────╼◈*\n\n> 🧙‍♂️ 𝚉𝙰𝙽𝚃𝙰-𝚇𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 🧙‍♂️\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){

menuc1 += `• *${commands[i].pattern}*\n`
}}};
  menuc1  += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`



let menuc2 = `*◈╾──────${category} CONVERT COMMAND LIST──────╼◈*\n\n> 🧙‍♂️ 𝚉𝙰𝙽𝚃𝙰-𝚇𝙼𝙳 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝙱𝙾𝚃 🧙‍♂️\n\n`;
        
  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){

menuc2 += `• *${commands[i].pattern}*\n`
}}};
  menuc2 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`



menuc8 += `• *${commands[i].pattern}*\n`
}}};
  menuc8 += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`
	
let msg = generateWAMessageFromContent(
      m.chat,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: `` },
              carouselMessage: {
                cards: [
                  {
                    
                    header: proto.Message.InteractiveMessage.Header.create({
          ...(await prepareWAMessageMedia({ image: { url: 'https://files.catbox.moe/xm8163.jpg' } }, { upload: conn.waUploadToServer })),
          title: menuc,
          gifPlayback: true,
          subtitle: "DEWMINI-MD",
          hasMediaAttachment: false
        }),
                    body: { text: '' },
                    nativeFlowMessage: {
                      
                    },
                  },
                  {                   

                            messageVersion: 1,
                        },
                         contextInfo: {
                         mentionedJid: [m.sender],
                         forwardingScore: 999,
                         isForwarded: true,
                         forwardedNewsletterMessageInfo: {
                         newsletterJid: '120363412075023554@newsletter',
                         newsletterName: `🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️`,
                         serverMessageId: 143
                            }
                        }
                    }
                }
            },
        },
        { quoted: m })
        
            await conn.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
    });

	
} catch (e) {
reply()
l(e)
}
})   


