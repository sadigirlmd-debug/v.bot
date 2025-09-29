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
    react: "🔖",
    desc: "Contact to bot owner",
    category: "main",
    use: '.rsquest2',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{       
if (!q) return mek.reply(`Usage: 

.deploy 

1 ( your_session_id )

2 ( your_app_name)

> කරුනාවෙන් සලකන්න...

> Treat with kindness...

> تعامل بلطف



ඔබගේ නම ඉංග්‍රිසියෙන් එවන්න...

සහ හිස් තැන් නොතබන්න... 

සිම්පල් අකුරු බාවිත කර නම එවන්න 

උදාහරනය :- 

1 ( your_session_id )

2 ( suranga-chamith)



Send your name in English... 

And do not leave spaces...

Send your name using simple letters

 Example :- 

1 ( your_session_id ) 

2 ( suranga-chamith)


أرسل اسمك بالإنجليزية... ولا تترك فراغات... أرسل اسمك بأحرف بسيطة مثال: 1 (معرف الجلسة) 2 (سورانغا-شاميث)`)

var izumilod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️"
]
let { key } = await conn.sendMessage(from, {text: 'ꜱᴇɴᴅɪɴɢ...'})

for (let i = 0; i < izumilod.length; i++) {
await conn.sendMessage(from, {text: izumilod[i], edit: key })
}


    const messageId = mek.key.id

    if (reportedMessages[messageId]) {
        return mek.reply("This report has already been forwarded to the owner. Please wait for a response.")
    }

    reportedMessages[messageId] = true

    const textt = `*| zanta-xmd deploy |*`
    const teks1 = `\n\n*zanta-xmd new user*: @${m.sender.split("@")[0]}\n*ඔබගේ session id owner වෙත යවා ඇත...!!*

*කරුනාකර මදක් රැදී සිටින්න...*

*Your session id has been sent to the owner...!!*

 *Please wait a moment...*

*تم إرسال معرف جلستك إلى المالك...!!* *يرجى الانتظار قليلاً...*: 

session id ${q}`
    const teks2 = `\n\n*Hi ${pushname}, your session id has been forwarded to my Owners.*\n*Please wait...*`

    // Send the message to the first owner in the `owner` array
    conn.sendMessage(devlopernumber + "@s.whatsapp.net", {
        text: textt + teks1,
        mentions: [mek.sender],
    }, {
        quoted: mek,
    });

    // Send a reply to the user
    mek.reply("Tʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ Iᴛ ʜᴀs ʙᴇᴇɴ ꜰᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ ᴛʜᴇ ᴏᴡɴᴇʀ. Pʟᴇᴀsᴇ ᴡᴀɪᴛ ꜰᴏʀ ᴀ ʀᴇsᴘᴏɴsᴇ.")
  await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "main",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (args.length === 0) return reply("📢 Please provide a message to broadcast.");
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());
    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }
    reply("📢 Message broadcasted to all groups.");
});



cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `> *🎀 𝐙𝐀𝐍𝐓𝐀-𝐗𝐌𝐃 𝐔𝐋𝐓𝐑𝐀 𝐒𝐏𝐄𝐄𝐃: ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363412075023554@newsletter',
                    newsletterName: "🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});


cmd({
    pattern: "device",
    react: "🔖",
    desc: "To see device type",
    category: "main",
    use: '.device',
    filename: __filename
},    
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( !isMe ) return reply('ℹ️ *Sorry ! This is Owner only Command..*') 
if ( !m.quoted ) return reply('ℹ️ *Please reply a Message...*')
if (m.quoted.id.startsWith("3A")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Ios WhatsApp(i Phone)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("3EB")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("BAE")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(Wiskeysockets/Baileys-WA-Web-Api)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("QUEENAMDI")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(QueenAmdi-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
  } else if (m.quoted.id.startsWith("CYBER2")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(Cyber-X-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("ZEROTWO")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(ZeroTwo-Md-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Android WhatsApp ${ss}`, 
      mentions : [m.quoted.sender]
    });
}
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})


cmd({
    pattern: "system",
    react: "🖥️",
    alias: ["s_info"],
    desc: "To Check bot\'s System information",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const ccp = await si.cpu()
const cinfo = await si.version()
let timee = await si.time()
const plat = os.hostname()
let data = await fetchJson('https://gist.github.com/VajiraTech/c4f2ac834de5c45b3a8de8e2d165f973/raw')

const infomsg = `╭━━〔 *🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• _Runtime -: ${runtime(process.uptime())}_
┃◈┃• _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
┃◈┃• _Bot Version -: ${data.version} Stable_
┃◈┃• *👨‍💻 Owner*: Mr Suranga Mod-z
┃◈└───────────┈⊷
╰──────────────┈⊷


📌  *_Server System informations_*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┣⛊  _Platform : ${plat}_
┣⛊  _Running OS : ${os.platform()}_
┣⛊  _CPU Manufacture  -: ${ccp.manufacturer}_
┣⛊  _CPU Brand -: ${ccp.brand}_
┣⛊  _CPU Speed -: ${ccp.speed}_
┣⛊ _Engine Version -: ${cinfo}_
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

await conn.sendMessage(from , { text: infomsg  }, { quoted: mek } )
	
}catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "id",
    react: "🔖",
    desc: "To take Device id",
    category: "main",
    use: '.sv',
    filename: __filename
},    
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( !isMe ) return reply('ℹ️ *Sorry ! This is Owner only Command..*') 
if ( !m.quoted ) return reply('ℹ️ *Please reply a Message...*')
reply(m.quoted.id)
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})



cmd({
    pattern: "forward",
    desc: "forward msgs",
    alias: ["fo"],
    category: "main",
    use: '.forward < Jid address >',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

if (!isOwner) {
	return reply("*Owner Only ❌*")}
	
if ( !mek.quoted) {
reply("*give me message ❌*")
}

if(!q) return reply('please give me jids')

const data = q.split(",")



	
let p;
let message = {}

            message.key = mek.quoted?.fakeObj?.key;

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            
		let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype

const mimeType = require('mime-types');
let ext = mimeType.extension(mime);		    

                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (p ? p : mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName) + "." + ext;
            }

            message.message = mek.quoted;
	
for(let i=0; i<data.length;i++){
const mass =  await conn.forwardMessage(data[i], message, false)
}
return reply(`*Message forwarded to:*\n\n ${data}`)
            
})






cmd({
    pattern: "sv",
    react: "🔖",
    desc: "To take owner number",
    category: "main",
    use: '.sv',
    filename: __filename
},    
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      
        mek.reply_message && mek.reply_message.status
          ? mek.reply_message
          : false;
      
        mek.bot.forwardOrBroadCast(from, {
          quoted: { key: mek.key },
        });
       
reply("*reply to whatsapp status*");
    await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
}) /*
const regexSend = new RegExp(
  `\\b(?:${["send", "share", "snd", "give", "save", "sendme", "forward"].join(
    "|"
  )})\\b`,
  "i"
)*/






	
cmd({ on: "body" }, 
     async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
     if (config.AUTO_REACT === 'true') {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         conn.sendMessage(from, {
             react: {
                 text: emokis,
                 key: mek.key
             }
         })
     }
}) 




cmd({ on: "text" }, 
    async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    const randomXp = 8;
    let usrname = mek.pushName
    const hasLeveledUp = await Levels.appendXp(mek.sender, "RandomXP", randomXp);
    if (hasLeveledUp) {
        const sck1 = await Levels.fetch(mek.sender, "RandomXP");
        const lvpoints = sck1.level;
        var role = "GOD";
        if (lvpoints <= 2) {
            var role = "🏳Citizen";
        } else if (lvpoints <= 4) {
            var role = "👼Baby Wizard";
        } else if (lvpoints <= 6) {
            var role = "🧙‍♀️Wizard";
        } else if (lvpoints <= 8) {
            var role = "🧙‍♂️Wizard Lord";
        } else if (lvpoints <= 10) {
            var role = "🧚🏻Baby Mage";
        } else if (lvpoints <= 12) {
            var role = "🧜Mage";
        } else if (lvpoints <= 14) {
            var role = "🧜‍♂️Master of Mage";
        } else if (lvpoints <= 16) {
            var role = "🌬Child of Nobel";
        } else if (lvpoints <= 18) {
            var role = "❄Nobel";
        } else if (lvpoints <= 20) {
            var role = "⚡Speed of Elite";
        } else if (lvpoints <= 22) {
            var role = "🎭Elite";
        } else if (lvpoints <= 24) {
            var role = "🥇Ace I";
        } else if (lvpoints <= 26) {
            var role = "🥈Ace II";
        } else if (lvpoints <= 28) {
            var role = "🥉Ace Master";
        } else if (lvpoints <= 30) {
            var role = "🎖Ace Dominator";
        } else if (lvpoints <= 32) {
            var role = "🏅Ace Elite";
        } else if (lvpoints <= 34) {
            var role = "🏆Ace Supreme";
        } else if (lvpoints <= 36) {
            var role = "💍Supreme I";
        } else if (lvpoints <= 38) {
            var role = "💎Supreme Ii";
        } else if (lvpoints <= 40) {
            var role = "🔮Supreme Master";
        } else if (lvpoints <= 42) {
            var role = "🛡Legend III";
        } else if (lvpoints <= 44) {
            var role = "🏹Legend II";
        } else if (lvpoints <= 46) {
            var role = "⚔Legend";
        } else if (lvpoints <= 55) {
            var role = "🐉Immortal";
        } else {
            var role = "Kiddo";
        }
        if (config.LEVEL_UP_MESSAGE === 'false') {
            await conn.sendMessage(from, {
                image: {
                    url: `https://files.catbox.moe/r86oac.jpg`,
                },
                caption: `
━━━━━༺❃༻━━━━━◇
☱ *look at that! Someone just leveled up! ✨*
☱ *👤 Name*: ${mek.pushName}
☱ *🎚 Level*: ${sck1.level}
☱ *🛑 Exp*: ${sck1.xp} / ${Levels.xpFor(sck1.level + 1)}
☱ *📍 Role*: *${role}*
☱ *Enjoy! 😁*━━━━━༺❃༻━━━━
`,
            }, {
                quoted: mek,
            });
        }
    }

})	
	
cmd({
    pattern: "owner",
    react: "🔖",
    desc: "To take owner number",
    category: "owner",
    use: '.ban',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
const config = require('../settings')
        const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + 'zanta' + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: 'Vajira', contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: '🧙‍♂️ 𝐂𝐄𝐑𝐑𝐘 𝐙𝐀𝐍𝐓𝐀 𝐁𝐁𝐇 🧙‍♂️',
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: `https://files.catbox.moe/n5w10w.jpg`,
                    mediaType: 2,
                    mediaUrl: '',
                    sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + mek.pushName,
                },
            },
        }
  return await conn.sendMessage(from, buttonMessaged, {quoted: mek,
							    })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
}) 







cmd({
    pattern: "getsession",
    react: "🔖",
    desc: "To get bot session",
    category: "main",
    use: '.getsession',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isMe) return await reply(BOTOW)
                                  
         	reply('Wait a moment, currently retrieving your session file')
                let sesi = fs.readFileSync('./session/creds.json')
                conn.sendMessage(mek.chat, {
                    document: sesi,
                    mimetype: 'application/json',
                    fileName: 'creds.json'
                }, {
                    quoted: mek
                })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*🛑 This is an owner command...*')
l(e)
}
}) 		    	

cmd({
    pattern: "delsession",
    react: "🔖",
    desc: "To delete bot session",
    category: "main",
    use: '.delsession',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isMe) return await reply(BOTOW)
                                  
         	                fs.readdir("./session", async function(err, files) {
                    if (err) {
                        console.log('Unable to scan directory: ' + err);
                        return reply('Unable to scan directory: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Detected ${filteredArray.length} junk files\n\n`
                    if (filteredArray.length == 0) return reply()
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    reply()
                    await sleep(2000)
                    reply("Deleting junk files...")
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
                    reply("Successfully deleted all the trash in the session folder")
                });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*🛑 This is an owner command...*')
l(e)
}
}) 

cmd({
    pattern: "block",
    react: "🔖",
    desc: "To block a member",
    category: "main",
    use: '.block',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isMe) return await reply(BOTOW)
                                  
         	let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await conn.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
l(e)
}
}) 		    	



cmd({
    pattern: "unblock",
    react: "🔖",
    desc: "To unblock a member",
    category: "main",
    use: '.unblock',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
if (!isMe) return await reply(BOTOW)
                                  
         	let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await conn.updateBlockStatus(users, 'unblock').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*🛑 This is an owner command...*')
l(e)
}
}) 		    	




cmd({
    pattern: "shutdown",
    react: "⚙️",
    desc: "To shutdown the bot",
    category: "",
    use: '.shutdown',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
   
  if (!isMe) return await reply(BOTOW)
                reply(`Bot shutdown few 10 seconds...`)
                await sleep(10000)
                process.exit()
		
  await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*🛑 This is an owner command...*')
l(e)
}
}) 			


cmd({
    pattern: "request2",
    react: "⚙️",
    desc: "Contact to bot owner",
    category: "",
    use: '.request',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{      
   let teks =  `Enter The Bug Example\n\n${command} < YOUR REPORT MASSAGE > `
	          
var xeonlod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝚁𝙴𝙿𝙾𝚁𝚃 𝚂𝙴𝙽𝙳 𝚃𝙾 𝚃𝙷𝙴 𝙾𝚆𝙽𝙴𝚁 🖥️..."
]
let { key } = await conn.sendMessage(from, {text: 'ꜱᴇɴᴅɪɴɢ...'})

for (let i = 0; i < xeonlod.length; i++) {
await conn.sendMessage(from, {text: xeonlod[i], edit: key })
}

                  await conn.sendMessage(`94760264995@s.whatsapp.net`, {text: `*Bug Report From:* wa.me/${mek.sender.split("@")[0]}\n\n*Bug Report*\n${q ? q : 'blank'}` })
                  const repo = await conn.sendMessage(`*『 𝙱𝚄𝙶 𝚁𝙴𝙿𝙾𝚁𝚃 』*`)
                  await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('🛑 This is an owner command...')
l(e)
}
})

cmd({
    pattern: "setbotbio",
    react: "⚙️",
    desc: "To change bot number bio",
    category: "",
    use: '.setbotbio',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{                   
   
  if (!isMe) return await reply(BOTOW)
                if (!q) return reply(`Where is the text?\nExample: ${prefix + command} zanta-xmd Bot`)
    await conn.updateProfileStatus(q)
    reply(`Success in changing the bio of bot's number`)
            await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*🛑 This is an owner command...*')
l(e)
}
})


cmd({
    pattern: "alive",
    react: "👨‍💻",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	var msg = mek
		
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
const cap = `${monspace}😚 කොහොමද ${pushname} I'm alive now${monspace}

*🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️*

*🚀Version:* ${require("../package.json").version}

*⌛Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

*🕒Runtime:* ${runtime(process.uptime())}

*📍Platform:* ${hostname}

*🤖sᴛᴀᴛᴜs*: ᴢᴀɴᴛᴀ-xᴍᴅ ᴀʟɪᴠᴇ ᴀɴᴅ ʀᴇᴀᴅʏ


🖇️ *CHANEL :- https://whatsapp.com/channel/0029Vb4F314CMY0OBErLlV2M*

👤 *OWNER :- MR SURANGA MOD-Z*`

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



if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'menu' , description: 'COMMANDS MENU'},
	    {title: "2", rowId: prefix + 'ping' , description: 'ZANTA-XMD SPEED'} ,

	]
    } 
]
const listMessage = {
caption: cap,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


                  
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: cap,
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}menu`,
                    buttonText: {
                        displayText: 'MENU'
                    },
                },
		{
                    buttonId: `${prefix}ping`,
                    buttonText: {
                        displayText: 'PING'
                    },
                },	
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
        

}


	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


 
//============================================================================

cmd({
    pattern: "sc",
    react: "👨‍💻",
    alias: ["script","repo"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	var msg = mek
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
var vajiralod = [
"LOADING ●●○○○○",
"LOADING ●●●●○○",
"LOADING ●●●●●●",
"`COMPLETED ✅`"	
]
let { key } = await conn.sendMessage(from, {text: ''})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}	

const cap = `🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️

> Follow WhatsApp Channel :- ⤵️
 
🖇️ https://whatsapp.com/channel/0029Vb4F314CMY0OBErLlV2M

> Joine Whatsapp Group :- ⤵️

🖇️ https://chat.whatsapp.com/DXQOFlfOnOt5AQsWSaGZqT?mode=ems_copy_c

> Follow Tiktok Page :- ⤵️

🖇️ tiktok.com/@_zanta_vibe_

> owner :- ⤵️

🖇️ https://wa.me/+94760264995?text=hi-zanta-xmd-owner-save-me-🐼🪄💖 
`
	
if (config.MODE === 'nonbutton') {


	
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'menu' , description: 'COMMANDS MENU'},
	    {title: "2", rowId: prefix + 'ping' , description: 'ZANTA-XMD SPEED'} ,

	]
    } 
]
const listMessage = {
caption: cap,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


                  
        conn.sendMessage(from, {
            image: { url: config.LOGO },
    caption: cap,
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}menu`,
                    buttonText: {
                        displayText: 'MENU'
                    },
                },
		{
                    buttonId: `${prefix}ping`,
                    buttonText: {
                        displayText: 'PING'
                    },
                },	
            ],
            headerType: 1,
            viewOnce: true
        }, {
            quoted: m
        });
        

}

	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})