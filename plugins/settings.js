const { cmd, commands } = require('../lib/command')
const config = require('../settings')
var { get_set , input_set } = require('../lib/set_db') 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
var prefixRegex = config.PREFIX === "false" || config.PREFIX === "null" ? "^" : new RegExp('^[' + config.PREFIX + ']');
const fs = require('fs')
const path = require('path')

var BOTOW = ''
if(config.LANG === 'SI') BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"

var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"

var alredy = ''
if(config.LANG === 'SI') alredy = "*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*"
else alredy = "*This setting alredy updated !*"
//---------------------------------------------------------------------------


cmd({
  on: "body",
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

  try {
    const { type, body } = m;

    // Define patterns for detecting bug/crash messages
    const dangerousPatterns = [
      /(\u{DC00}|\u{D800})/gu,     // corrupted surrogate pairs
      /([\u2066-\u2069])/g,        // invisible LTR/RTL markers
      /(\uFFF9|\uFFFA|\uFFFB)/g,   // interlinear annotation controls
      /(\u{FEFF})/gu,              // zero-width no-break space
      /.{6000,}/,                  // very long message
    ];

    let payload = '';

    // Extract message content for different message types
    if (type === 'conversation' || type === 'extendedTextMessage') {
      payload = body || m.message?.conversation || m.message?.extendedTextMessage?.text || '';
    } else if (
      type === 'imageMessage' || type === 'videoMessage' ||
      type === 'documentMessage' || type === 'audioMessage'
    ) {
      payload = m.message?.[type]?.caption || '';
    }

    // Check if the message contains any of the dangerous patterns
    const isBug = dangerousPatterns.some(pattern => pattern.test(payload));

    if (isBug) {
      const remoteJid = m.key.remoteJid;
      const sender = m.key.participant || remoteJid;

      // Forward the detected bug message back to the sender
      await conn.forwardMessage(sender, m, false);

      // Send a long message from you to the sender to move the crash message up in the chat
      const longMessage = '- Please disregard the previous message. Everything is fine. Here is a long message to clear up the chat: \n\n'.repeat(50);
      await conn.sendMessage(remoteJid, {
        text: longMessage
      });
      await conn.sendMessage(remoteJid, {
        text: longMessage
      });
      await conn.sendMessage(remoteJid, {
        text: longMessage
      });
      await conn.sendMessage(remoteJid, {
        text: longMessage
      });    
	await conn.sendMessage(from, { 'text': "```🚫BUG DETECTED 😈```\n\n ⚠️ AUTOMATICALLY BUG DELETED BY ZANTA-XMD ⚠️ 🚫" })    
	reply('lol😂👋 your bugs not crash in ZANTA-XMD users👋')    
      console.log('AntiBug: Detected a crash message, forwarded it to the sender, and sent a long message to bury it.');
 
}

  } catch (e) {
    console.error('AntiBug Error:', e.message);
  }
});



cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

if (config.OWNER_REACT === 'true') {

if (mek.sender == '94760264995@s.whatsapp.net') {
    //  await conn.sendMessage(from, { react: { text: `♥️`, key: mek.key }})
      //await conn.sendMessage(from, { react: { text: `🙂️`, key: mek.key }})
     // await conn.sendMessage(from, { react: { text: `️🥀`, key: mek.key }})
      await conn.sendMessage(from, { react: { text: `💟️`, key: mem.key }})
      
      }
      if (mek.sender == '94719199757@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94772108460@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94772801923@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94759874797@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94754487261@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94756310995@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      if (mek.sender == '94751150234@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }      
      if (mek.sender == '94778500326@s.whatsapp.net') {
      await conn.sendMessage(from, { react: { text: `👨‍💻`, key: mek.key }})
      }
      }
} 
   );



	

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

let icmd = body ? prefixRegex.test(body[0]) : "false";
		 if (config.READ_CMD_ONLY === "true" && icmd) {
                    await conn.readMessages([mek.key])
		 }
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       
if (config.AUTO_READ === 'true') {
        conn.readMessages([mek.key])
        }
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       
if (config.AUTO_TYPING === 'true') {
	conn.sendPresenceUpdate('composing', from)		
	}
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       
if (config.AUTO_RECORDING === 'true') {
        conn.sendPresenceUpdate('recording', from)
        }   

         } 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       
if (config.AUTO_BIO === 'true') {
        conn.updateProfileStatus(`Hey, future leaders! 🌟 ZANTA-XMD is here to inspire and lead, thanks to MR SURANGA MOD-Z 🚀 ${runtime(process.uptime())} `).catch(_ => _)
        }	
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.ALWAYS_ONLINE === 'false') {
                await conn.sendPresenceUpdate('unavailable')
		}
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.ALWAYS_ONLINE === 'true') {
                await conn.sendPresenceUpdate('available')
		}	    
} 
   );

cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.AUTO_BLOCK == 'true' && m.chat.endsWith("@s.whatsapp.net")) {
            return conn.updateBlockStatus(m.sender, 'block')
        }
	} 
   );


cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       
if (config.AUTO_VOICE === 'true') {
const url = `https://gist.github.com/VajiraOfficialBot/2ac7699129e504adab1bab8980ef4fb5/raw`
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{audio: { url : data[vr]},mimetype: 'audio/mpeg',ptt:true},{quoted:mek})   
 }}
} 
   );


cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.AUTO_STICKER === 'true') {
const url = `https://gist.github.com/VajiraOfficialBot/eb470a611d233da012ad1f3d79042fb6/raw`
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{sticker: { url : data[vr]},package: 'made by vajira'},{quoted:mek})   
 }}
} 
   );


cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.AUTO_REPLY === 'true') {
const url = `https://gist.github.com/VajiraOfficialBot/b51ee50e4603d203d36fd61c3d117e9e/raw`
let { data } = await axios.get(url)
for (vr in data){
if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) m.reply(data[vr])
 }}	
} 
   );


cmd({
  on: "body"
},    
async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
       	
if (config.ANTI_BOT == "true"){
if (!isCreator && !isDev && isGroup && !isBotAdmins) {
   reply(`\`\`\`🤖 Bot Detected!!\`\`\`\n\n_✅ Kicked *@${mek.sender.split("@")[0]}*_`, { mentions: [mek.sender] });
  conn.groupParticipantsUpdate(from, [mek.sender], 'remove');
  }}
} 
   );
	
//==================================================================
		    
    





cmd({
  'on': "body"
},
    async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

  try {
    const badWords = ["kariya", "wtf", "mia", "xxx", "fuck", 'sex', "huththa", "pakaya", 'ponnaya', "hutto"];

    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const messageText = body.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));

    if (containsBadWord && config.ANTI_BAD === "true") {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, { 'text': "🚫 ⚠️ BAD WORDS NOT ALLOWED BY ZANTA-XMD ⚠️ 🚫" }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});



cmd({
  'on': "body"
}, 
    async(conn, mek, m,{from, l, quoted, isDev, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

  try {
    // Initialize warnings if not exists
    if (!global.warnings) {
      global.warnings = {};
    }

    // Only act in groups where bot is admin and sender isn't admin
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    // List of link patterns to detect
    const linkPatterns = [
      /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi, // WhatsApp links
      /https?:\/\/(?:api\.whatsapp\.com|wa\.me)\/\S+/gi,  // WhatsApp API links
      /wa\.me\/\S+/gi,                                    // WhatsApp.me links
      /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,         // Telegram links
      /https?:\/\/(?:www\.)?\.com\/\S+/gi,                // Generic .com links
      /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,         // Twitter links
      /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,        // LinkedIn links
      /https?:\/\/(?:whatsapp\.com|channel\.me)\/\S+/gi,  // Other WhatsApp/channel links
      /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,          // Reddit links
      /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,         // Discord links
      /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,           // Twitch links
      /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,           // Vimeo links
      /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,     // Dailymotion links
      /https?:\/\/(?:www\.)?medium\.com\/\S+/gi           // Medium links
    ];

    // Check if message contains any forbidden links
    const containsLink = linkPatterns.some(pattern => pattern.test(body));

    // Only proceed if anti-link is enabled and link is detected
    if (containsLink && config.ANTI_LINK === 'true') {
      console.log(`Link detected from ${sender}: ${body}`);

      // Try to delete the message
      try {
        await conn.sendMessage(from, {
          delete: m.key
        });
        console.log(`Message deleted: ${m.key.id}`);
      } catch (error) {
        console.error("Failed to delete message:", error);
      }

      // Update warning count for user
      global.warnings[sender] = (global.warnings[sender] || 0) + 1;
      const warningCount = global.warnings[sender];

      // Handle warnings
      if (warningCount < 4) {
        // Send warning message
        await conn.sendMessage(from, {
          text: `‎*⚠️LINKS ARE NOT ALLOWED⚠️*\n` +
                `*╭────⬡ WARNING ⬡────*\n` +
                `*├▢ USER :* @${sender.split('@')[0]}!\n` +
                `*├▢ COUNT : ${warningCount}*\n` +
                `*├▢ REASON : LINK SENDING*\n` +
                `*├▢ WARN LIMIT : 3*\n` +
                `*╰─────⬡ *ZANTA-XMD* ⬡────*`,
          mentions: [sender]
        });
      } else {
        // Remove user if they exceed warning limit
        await conn.sendMessage(from, {
          text: `@${sender.split('@')[0]} *ZANTA-XMD BOT HAS BEEN REMOVED - WARN LIMIT EXCEEDED!*`,
          mentions: [sender]
        });
        await conn.groupParticipantsUpdate(from, [sender], "remove");
        delete global.warnings[sender];
      }
    }
  } catch (error) {
    console.error("Anti-link error:", error);
    reply("❌ An error occurred while processing the message.");
  }
});




cmd({
    pattern: "language",
    react: "👨‍💻",
    desc: "Check bot online or no.",
    category: "main",
    use: '.language',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if (config.MODE === 'nonbutton') {


	
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'lang en' , description: 'ENGLISH'},
	    {title: "2", rowId: prefix + 'lang si' , description: 'සිංහල'} ,

	]
    } 
]
const listMessage = {
image: { url: 'https://files.catbox.moe/sajynk.jpg'},
caption: '- SELECT BOT LANGUAGE\n- බොට්ගෙ භාශාව වෙනස් කරන්න', 	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })


	
} if (config.MODE === 'button') {


        conn.sendMessage(from, {
    image: { url: 'https://files.catbox.moe/sajynk.jpg'},	
    caption: '- SELECT BOT LANGUAGE\n- බොට්ගෙ භාශාව වෙනස් කරන්න', 
    footer: config.FOOTER,
                buttons: [
			{
                    buttonId: `${prefix}lang en`,
                    buttonText: {
                        displayText: 'ENGLISH'
                    },
                },
		{
                    buttonId: `${prefix}lang si`,
                    buttonText: {
                        displayText: 'සිංහල'
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
		    
	    




cmd({
  pattern: "mactivate",
  react: "🗣️",
  desc: "To change bot prefix",
  category: "main",
  use: '.setprefix .',
  filename: __filename
},
async (conn, mek, m, {
  from, l, quoted, isDev, body, isCmd, command, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins,
  isAdmins, reply
}) => {
  try {
    if (config.JID == q) {
      return reply(
        config.LANG === 'si'
          ? "*මෙම සැකසුම දැනටමත් යාවත්කාලීන කර ඇත !*"
          : "*This setting is already up to date!*"
      );
    }

    await input_set("JID", q);

    const successMsg = config.LANG === 'si'
      ? `*╭══════════════*\n*┃「 ᴍᴏᴠɪᴇ ᴄᴏɴᴛʀᴏʟᴇʀ*\n*╰══════════════*\n\n*╭───────────┈◦•◦❥•*\n*╎🚀 ධාවනය වෙමින් පවතින Jid: ${config.JID}*\n\n*╎✅ මෙම Jid සඳහා සාර්ථකව සක්‍රිය කළා: ${q}*\n\n*╚──────────────┈┈*`
      : `*╭══════════════*\n*┃「 ᴍᴏᴠɪᴇ ᴄᴏɴᴛʀᴏʟᴇʀ*\n*╰══════════════*\n\n*╭───────────┈◦•◦❥•*\n*╎🚀 Running Jid: ${config.JID}*\n\n*╎✅ Successfully activated for this Jid: ${q}*\n\n*╚──────────────┈┈*`;

    await reply(successMsg);
  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයක් ඇතිවී ඇත !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "dactivate",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, {
  from, prefix, l, quoted, body, isCmd, command, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner,
  groupMetadata, groupName, participants, groupAdmins, isBotAdmins,
  isAdmins, reply, config
}) => {
  try {
    if (!isMe) return await reply(BOTOW);

    const lang = config.LANG;

    if (q === 'on') {
      if (config.DIRECTION === 'true') {
        return reply(
          lang === 'si'
            ? 'ඇත්ත වශයෙන්ම Movie Send Inbox ක්‍රියාත්මකයි\nතවද command යොදා ඇති ස්ථානයට යැවීම සක්‍රියයි'
            : 'Movie send inbox is already ON.\nCommand location delivery is active.'
        );
      }
      await input_set('DIRECTION', 'true');
      return reply(
        lang === 'si'
          ? '✅ Movie Send Inbox සක්‍රියයි. යොදා ඇති ස්ථානයට යැවීම ක්‍රියාත්මකයි.'
          : '✅ Movie send inbox is now ON. Will send to the command location.'
      );
    }

    if (q === 'off') {
      if (config.DIRECTION !== 'true') {
        return reply(
          lang === 'si'
            ? 'Movie Send JID දැනටමත් සක්‍රියයි.'
            : 'Movie send JID is already ON.'
        );
      }
      await input_set('DIRECTION', 'false');
      return reply(
        lang === 'si'
          ? '✅ Movie Send JID සක්‍රියයි. JID වෙත යැවීම ක්‍රියාත්මකයි.'
          : '✅ Movie send JID is now ON. Will send to the JID.'
      );
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "newsactivate",
  react: "🗣️",
  desc: "To Activate auto news",
  category: "main",
  use: '.setprefix .',
  filename: __filename
},
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup,
  sender, senderNumber, botNumber2, botNumber, pushname, isMe,
  isOwner, groupMetadata, groupName, participants, groupAdmins,
  isBotAdmins, isAdmins, reply, config
}) => {
  try {
    if (!isMe) return await reply(BOTOW);

    const lang = config.LANG;

    if (config.N_JID === q) {
      return reply(
        lang === 'si'
          ? '📰 මෙම කොටසට දැනටමත් පුවත් සක්‍රියයි!'
          : '📰 News is already activated for this section!'
      );
    }

    await input_set('N_JID', q);

    return reply(
      lang === 'si'
        ? '✅ පුවත් සාර්ථකව නව කොටසකට සක්‍රිය කළා!'
        : '✅ News was successfully activated for this section!'
    );
  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});

cmd({
  pattern: "statusreply",
  react: "🗣️",
  desc: "To Set status Message",
  category: "main",
  use: '.statusreply .',
  filename: __filename
},
async (conn, mek, m, { q, isMe, reply, config, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    
    const lang = config.LANG;
    if (config.STATUS_REPLY_MESSAGE === q) {
      return reply(lang === 'si' ? 'දැනටමත් මෙම පණිවිඩය සකසා ඇත!' : 'Status reply already set.');
    }

    await input_set('STATUS_REPLY_MESSAGE', q);
    return reply(lang === 'si' ? '✅ Status reply message යාවත්කාලීන විය!' : '✅ Status reply message updated!');
    
  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "mode",
  react: "🗣️",
  desc: "To change response mode (button/nonbutton)",
  category: "main",
  use: '.mode button/nonbutton',
  filename: __filename
},
async (conn, mek, m, { q, isMe, reply, config, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);

    const lang = config.LANG;
    if (config.MODE === q) {
      return reply(lang === 'si' ? 'දැනටමත් මෙම මාදිලිය සක්‍රියයි!' : 'Mode is already set.');
    }

    await input_set('MODE', q);

    if (q.includes("button")) {
      return reply(lang === 'si' ? '✅ බොත්තම් මාදිලියට මාරු විය!' : '✅ Switched to button mode!');
    }

    if (q.includes("nonbutton")) {
      return reply(lang === 'si' ? '✅ non-button මාදිලියට මාරු විය!' : '✅ Switched to non-button mode!');
    }

    return reply(
      lang === 'si'
        ? '🚫 වැරදි අක්ෂරයයි!\n*නිවැරදිවයින් යොදාගන්න:*\n.mode button\n.mode nonbutton'
        : '🚫 Wrong spelling!\n*Use correct options:*\n.mode button\n.mode nonbutton'
    );

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "lang",
  react: "🗣️",
  desc: "To change bot language",
  category: "main",
  use: '.lang en/si',
  filename: __filename
},
async (conn, mek, m, { q, isMe, reply, config, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);

    if (config.LANG === q) {
      return reply(q === 'si' ? 'දැනටමත් සිංහල භාෂාව සක්‍රියයි!' : 'English is already set!');
    }

    await input_set('LANG', q);

    if (q === 'en') {
      return reply('✅ Language changed to ENGLISH!');
    }

    if (q === 'si') {
      return reply('✅ භාෂාව සිංහලට මාරු විය!');
    }

    return reply(
      '🚫 Wrong spelling!\n*Correct usage:*\n.lang en\n.lang si'
    );

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});




cmd({
  pattern: "setprefix",
  react: "🗣️",
  desc: "To change bot prefix",
  category: "main",
  use: '.setprefix .',
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;
    if (config.PREFIX === q) return reply(lang === 'si' ? 'දැනටමත් මෙම prefix භාවිතා වේ!' : 'Prefix already set.');

    await input_set('PREFIX', q);
    return reply(lang === 'si' ? `✅ Prefix ${q} ලෙස වෙනස් විය!` : `✅ Prefix changed to ${q}!`);
  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "setfooter",
  react: "🗣️",
  desc: "To change bot footer",
  category: "main",
  use: '.setfooter .',
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;
    if (config.FOOTER === q) return reply(lang === 'si' ? 'දැනටමත් මෙම footer භාවිතා වේ!' : 'Footer already set.');

    await input_set('FOOTER', q);
    return reply(lang === 'si' ? `✅ Footer ${q} ලෙස වෙනස් විය!` : `✅ Footer changed to ${q}!`);
  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "setlogo",
  react: "🗣️",
  desc: "To change bot logo",
  category: "main",
  use: '.setlogo logo-url',
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;
    if (config.LOGO === q) return reply(lang === 'si' ? 'දැනටමත් මෙම logo භාවිතා වේ!' : 'Logo already set.');

    await input_set('LOGO', q);
    return reply(lang === 'si' ? '✅ Logo එක වෙනස් විය!' : '✅ Logo changed!');
  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "autoreply",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_REPLY === 'true') return reply(lang === 'si' ? 'දැනටමත් Auto Reply සක්‍රියයි!' : 'Auto Reply is already ON.');
      await input_set('AUTO_REPLY', 'true');
      return reply(lang === 'si' ? '✅ Auto Reply සක්‍රිය විය!' : '✅ Auto Reply turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_REPLY !== 'true') return reply(lang === 'si' ? 'Auto Reply දැනටමත් අක්‍රියයි!' : 'Auto Reply is already OFF.');
      await input_set('AUTO_REPLY', 'false');
      return reply(lang === 'si' ? '✅ Auto Reply අක්‍රිය විය!' : '✅ Auto Reply turned OFF.');
    }

    return reply(lang === 'si' ? 'කරුණාකර on හෝ off යොදාගන්න.' : 'Please use `on` or `off`.');

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "oreact",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.OWNER_REACT === 'true') return reply(lang === 'si' ? 'Owner React දැනටමත් සක්‍රියයි!' : 'Owner React is already ON.');
      await input_set('OWNER_REACT', 'true');
      return reply(lang === 'si' ? '✅ Owner React සක්‍රිය විය!' : '✅ Owner React turned ON.');
    }

    if (q === 'off') {
      if (config.OWNER_REACT !== 'true') return reply(lang === 'si' ? 'Owner React දැනටමත් අක්‍රියයි!' : 'Owner React is already OFF.');
      await input_set('OWNER_REACT', 'false');
      return reply(lang === 'si' ? '✅ Owner React අක්‍රිය විය!' : '✅ Owner React turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "onlygroup",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ONLY_GROUP === 'true') return reply(lang === 'si' ? 'Only Group දැනටමත් සක්‍රියයි!' : 'Only Group is already ON.');
      await input_set('ONLY_GROUP', 'true');
      return reply(lang === 'si' ? '✅ Only Group සක්‍රිය විය!' : '✅ Only Group turned ON.');
    }

    if (q === 'off') {
      if (config.ONLY_GROUP !== 'true') return reply(lang === 'si' ? 'Only Group දැනටමත් අක්‍රියයි!' : 'Only Group is already OFF.');
      await input_set('ONLY_GROUP', 'false');
      return reply(lang === 'si' ? '✅ Only Group අක්‍රිය විය!' : '✅ Only Group turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "onlyme",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ONLY_ME === 'true') return reply(lang === 'si' ? 'Only Me දැනටමත් සක්‍රියයි!' : 'Only Me is already ON.');
      await input_set('ONLY_ME', 'true');
      return reply(lang === 'si' ? '✅ Only Me සක්‍රිය විය!' : '✅ Only Me turned ON.');
    }

    if (q === 'off') {
      if (config.ONLY_ME !== 'true') return reply(lang === 'si' ? 'Only Me දැනටමත් අක්‍රියයි!' : 'Only Me is already OFF.');
      await input_set('ONLY_ME', 'false');
      return reply(lang === 'si' ? '✅ Only Me අක්‍රිය විය!' : '✅ Only Me turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "antidelete",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ANTI_DELETE === 'true') return reply(lang === 'si' ? 'Antidelete දැනටමත් සක්‍රියයි!' : 'Antidelete is already ON.');
      await input_set('ANTI_DELETE', 'true');
      return reply(lang === 'si' ? '✅ Antidelete සක්‍රිය විය!' : '✅ Antidelete turned ON.');
    }

    if (q === 'off') {
      if (config.ANTI_DELETE !== 'true') return reply(lang === 'si' ? 'Antidelete දැනටමත් අක්‍රියයි!' : 'Antidelete is already OFF.');
      await input_set('ANTI_DELETE', 'false');
      return reply(lang === 'si' ? '✅ Antidelete අක්‍රිය විය!' : '✅ Antidelete turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});

cmd({
  pattern: "anticall",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ANTI_CALL === 'true') return reply(lang === 'si' ? 'Anticall දැනටමත් සක්‍රියයි!' : 'Anticall is already ON.');
      await input_set('ANTI_CALL', 'true');
      return reply(lang === 'si' ? '✅ Anticall සක්‍රිය විය!' : '✅ Anticall turned ON.');
    }

    if (q === 'off') {
      if (config.ANTI_CALL !== 'true') return reply(lang === 'si' ? 'Anticall දැනටමත් අක්‍රියයි!' : 'Anticall is already OFF.');
      await input_set('ANTI_CALL', 'false');
      return reply(lang === 'si' ? '✅ Anticall අක්‍රිය විය!' : '✅ Anticall turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "welcome",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.WELCOME === 'true') return reply(lang === 'si' ? 'Welcome දැනටමත් සක්‍රියයි!' : 'Welcome is already ON.');
      await input_set('WELCOME', 'true');
      return reply(lang === 'si' ? '✅ Welcome සක්‍රිය විය!' : '✅ Welcome turned ON.');
    }

    if (q === 'off') {
      if (config.WELCOME !== 'true') return reply(lang === 'si' ? 'Welcome දැනටමත් අක්‍රියයි!' : 'Welcome is already OFF.');
      await input_set('WELCOME', 'false');
      return reply(lang === 'si' ? '✅ Welcome අක්‍රිය විය!' : '✅ Welcome turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});




cmd({
  pattern: "mathsai",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.MATHS_AI === 'true') return reply(lang === 'si' ? 'AI ගණිතය දැනටමත් සක්‍රියයි!' : 'AI Maths is already ON.');
      await input_set('MATHS_AI', 'true');
      return reply(lang === 'si' ? '✅ AI ගණිතය සක්‍රිය විය!' : '✅ AI Maths turned ON.');
    }

    if (q === 'off') {
      if (config.MATHS_AI !== 'true') return reply(lang === 'si' ? 'AI ගණිතය දැනටමත් අක්‍රියයි!' : 'AI Maths is already OFF.');
      await input_set('MATHS_AI', 'false');
      return reply(lang === 'si' ? '✅ AI ගණිතය අක්‍රිය විය!' : '✅ AI Maths turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});





cmd({
  pattern: "aichatbot",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AI_CHATBOT === 'true') return reply(lang === 'si' ? 'AI කතා බොට් දැනටමත් සක්‍රියයි!' : 'AI Chatbot is already ON.');
      await input_set('AI_CHATBOT', 'true');
      return reply(lang === 'si' ? '✅ AI කතා බොට් සක්‍රිය විය!' : '✅ AI Chatbot turned ON.');
    }

    if (q === 'off') {
      if (config.AI_CHATBOT !== 'true') return reply(lang === 'si' ? 'AI කතා බොට් දැනටමත් අක්‍රියයි!' : 'AI Chatbot is already OFF.');
      await input_set('AI_CHATBOT', 'false');
      return reply(lang === 'si' ? '✅ AI කතා බොට් අක්‍රිය විය!' : '✅ AI Chatbot turned OFF.');
    }

  } catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "aiimage",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AI_IMAGE === 'true') return reply(lang === 'si' ? 'AI රූපය දැනටමත් සක්‍රියයි!' : 'AI Image is already ON.');
      await input_set('AI_IMAGE', 'true');
      return reply(lang === 'si' ? '✅ AI රූපය සක්‍රිය විය!' : '✅ AI Image turned ON.');
    }

    if (q === 'off') {
      if (config.AI_IMAGE !== 'true') return reply(lang === 'si' ? 'AI රූපය දැනටමත් අක්‍රියයි!' : 'AI Image is already OFF.');
      await input_set('AI_IMAGE', 'false');
      return reply(lang === 'si' ? '✅ AI රූපය අක්‍රිය විය!' : '✅ AI Image turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "onlygroup",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ONLY_GROUP === 'true') return reply(lang === 'si' ? 'බොට් දැනටමත් පෞද්ගලිකයි!' : 'Bot is already in private mode.');
      await input_set('ONLY_GROUP', 'true');
      return reply(lang === 'si' ? '✅ බොට් දැන් පෞද්ගලිකයි!' : '✅ Bot is now private.');
    }

    if (q === 'off') {
      if (config.ONLY_GROUP !== 'true') return reply(lang === 'si' ? 'බොට් දැනටමත් සෑම අයෙකුටම විවෘතයි!' : 'Bot is already public.');
      await input_set('ONLY_GROUP', 'false');
      return reply(lang === 'si' ? '✅ බොට් දැන් සෑම අයෙකුටම විවෘතයි!' : '✅ Bot is now public.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});




cmd({
  pattern: "disablepm",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.DISABLE_PM === 'true') return reply(lang === 'si' ? 'බොට් දැනටමත් අක්‍රිය කර ඇත!' : 'Bot is already shut down.');
      await input_set('DISABLE_PM', 'true');
      return reply(lang === 'si' ? '✅ බොට් දැන් පණිවිඩ නොලැබේ!' : '✅ Bot is now shut down.');
    }

    if (q === 'off') {
      if (config.DISABLE_PM !== 'true') return reply(lang === 'si' ? 'බොට් දැනටමත් ක්‍රියාකරයි!' : 'Bot is already public.');
      await input_set('DISABLE_PM', 'false');
      return reply(lang === 'si' ? '✅ බොට් දැන් සෑම අයෙකුටම ක්‍රියාකරයි!' : '✅ Bot is now available to everyone.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});





cmd({
  pattern: "autovoice",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_VOICE === 'true') return reply(lang === 'si' ? 'Auto Voice දැනටමත් සක්‍රියයි!' : 'Auto Voice is already ON.');
      await input_set('AUTO_VOICE', 'true');
      return reply(lang === 'si' ? '✅ Auto Voice සක්‍රිය විය!' : '✅ Auto Voice turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_VOICE !== 'true') return reply(lang === 'si' ? 'Auto Voice දැනටමත් අක්‍රියයි!' : 'Auto Voice is already OFF.');
      await input_set('AUTO_VOICE', 'false');
      return reply(lang === 'si' ? '✅ Auto Voice අක්‍රිය විය!' : '✅ Auto Voice turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "autosticker",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_STICKER === 'true') return reply(lang === 'si' ? 'Auto Sticker දැනටමත් සක්‍රියයි!' : 'Auto Sticker is already ON.');
      await input_set('AUTO_STICKER', 'true');
      return reply(lang === 'si' ? '✅ Auto Sticker සක්‍රිය විය!' : '✅ Auto Sticker turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_STICKER !== 'true') return reply(lang === 'si' ? 'Auto Sticker දැනටමත් අක්‍රියයි!' : 'Auto Sticker is already OFF.');
      await input_set('AUTO_STICKER', 'false');
      return reply(lang === 'si' ? '✅ Auto Sticker අක්‍රිය විය!' : '✅ Auto Sticker turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autobio",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_BIO === 'true') return reply(lang === 'si' ? 'Auto Bio දැනටමත් සක්‍රියයි!' : 'Auto Bio is already ON.');
      await input_set('AUTO_BIO', 'true');
      return reply(lang === 'si' ? '✅ Auto Bio සක්‍රිය විය!' : '✅ Auto Bio turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_BIO !== 'true') return reply(lang === 'si' ? 'Auto Bio දැනටමත් අක්‍රියයි!' : 'Auto Bio is already OFF.');
      await input_set('AUTO_BIO', 'false');
      return reply(lang === 'si' ? '✅ Auto Bio අක්‍රිය විය!' : '✅ Auto Bio turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "autowelcome",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.WELCOME === 'true') return reply(lang === 'si' ? 'Auto Welcome දැනටමත් සක්‍රියයි!' : 'Auto Welcome is already ON.');
      await input_set('WELCOME', 'true');
      return reply(lang === 'si' ? '✅ Auto Welcome සක්‍රිය විය!' : '✅ Auto Welcome turned ON.');
    }

    if (q === 'off') {
      if (config.WELCOME !== 'true') return reply(lang === 'si' ? 'Auto Welcome දැනටමත් අක්‍රියයි!' : 'Auto Welcome is already OFF.');
      await input_set('WELCOME', 'false');
      return reply(lang === 'si' ? '✅ Auto Welcome අක්‍රිය විය!' : '✅ Auto Welcome turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});




cmd({
  pattern: "antibot",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ANTI_BOT === 'true') return reply(lang === 'si' ? 'Anti-Bot දැනටමත් සක්‍රියයි!' : 'Anti-Bot is already ON.');
      await input_set('ANTI_BOT', 'true');
      return reply(lang === 'si' ? '✅ Anti-Bot සක්‍රිය විය!' : '✅ Anti-Bot turned ON.');
    }

    if (q === 'off') {
      if (config.ANTI_BOT !== 'true') return reply(lang === 'si' ? 'Anti-Bot දැනටමත් අක්‍රියයි!' : 'Anti-Bot is already OFF.');
      await input_set('ANTI_BOT', 'false');
      return reply(lang === 'si' ? '✅ Anti-Bot අක්‍රිය විය!' : '✅ Anti-Bot turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});

cmd({
  pattern: "antilink",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ANTI_LINK === 'true') return reply(lang === 'si' ? 'Antilink දැනටමත් සක්‍රියයි!' : 'Antilink is already ON.');
      await input_set('ANTI_LINK', 'true');
      return reply(lang === 'si' ? '✅ Antilink සක්‍රිය විය!' : '✅ Antilink turned ON.');
    }

    if (q === 'off') {
      if (config.ANTI_LINK !== 'true') return reply(lang === 'si' ? 'Antilink දැනටමත් අක්‍රියයි!' : 'Antilink is already OFF.');
      await input_set('ANTI_LINK', 'false');
      return reply(lang === 'si' ? '✅ Antilink අක්‍රිය විය!' : '✅ Antilink turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});



cmd({
  pattern: "antibad",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ANTI_BAD === 'true') return reply(lang === 'si' ? 'Antibad දැනටමත් සක්‍රියයි!' : 'Antibad is already ON.');
      await input_set('ANTI_BAD', 'true');
      return reply(lang === 'si' ? '✅ Antibad සක්‍රිය විය!' : '✅ Antibad turned ON.');
    }

    if (q === 'off') {
      if (config.ANTI_BAD !== 'true') return reply(lang === 'si' ? 'Antibad දැනටමත් අක්‍රියයි!' : 'Antibad is already OFF.');
      await input_set('ANTI_BAD', 'false');
      return reply(lang === 'si' ? '✅ Antibad අක්‍රිය විය!' : '✅ Antibad turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});

cmd({
  pattern: "autostatus",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_STATUS_READ === 'true') return reply(lang === 'si' ? 'Auto Status දැනටමත් සක්‍රියයි!' : 'Auto Status is already ON.');
      await input_set('AUTO_STATUS_READ', 'true');
      return reply(lang === 'si' ? '✅ Auto Status සක්‍රිය විය!' : '✅ Auto Status turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_STATUS_READ !== 'true') return reply(lang === 'si' ? 'Auto Status දැනටමත් අක්‍රියයි!' : 'Auto Status is already OFF.');
      await input_set('AUTO_STATUS_READ', 'false');
      return reply(lang === 'si' ? '✅ Auto Status අක්‍රිය විය!' : '✅ Auto Status turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autotyping",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_TYPING === 'true') return reply(lang === 'si' ? 'Auto Typing දැනටමත් සක්‍රියයි!' : 'Auto Typing is already ON.');
      await input_set('AUTO_TYPING', 'true');
      return reply(lang === 'si' ? '✅ Auto Typing සක්‍රිය විය!' : '✅ Auto Typing turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_TYPING !== 'true') return reply(lang === 'si' ? 'Auto Typing දැනටමත් අක්‍රියයි!' : 'Auto Typing is already OFF.');
      await input_set('AUTO_TYPING', 'false');
      return reply(lang === 'si' ? '✅ Auto Typing අක්‍රිය විය!' : '✅ Auto Typing turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autorecording",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_RECORDING === 'true') return reply(lang === 'si' ? 'Auto Recording දැනටමත් සක්‍රියයි!' : 'Auto Recording is already ON.');
      await input_set('AUTO_RECORDING', 'true');
      return reply(lang === 'si' ? '✅ Auto Recording සක්‍රිය විය!' : '✅ Auto Recording turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_RECORDING !== 'true') return reply(lang === 'si' ? 'Auto Recording දැනටමත් අක්‍රියයි!' : 'Auto Recording is already OFF.');
      await input_set('AUTO_RECORDING', 'false');
      return reply(lang === 'si' ? '✅ Auto Recording අක්‍රිය විය!' : '✅ Auto Recording turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autoread",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_READ === 'true') return reply(lang === 'si' ? 'Auto Read දැනටමත් සක්‍රියයි!' : 'Auto Read is already ON.');
      await input_set('AUTO_READ', 'true');
      return reply(lang === 'si' ? '✅ Auto Read සක්‍රිය විය!' : '✅ Auto Read turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_READ !== 'true') return reply(lang === 'si' ? 'Auto Read දැනටමත් අක්‍රියයි!' : 'Auto Read is already OFF.');
      await input_set('AUTO_READ', 'false');
      return reply(lang === 'si' ? '✅ Auto Read අක්‍රිය විය!' : '✅ Auto Read turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "cmdread",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.READ_CMD_ONLY === 'true') return reply(lang === 'si' ? 'Cmd Read දැනටමත් සක්‍රියයි!' : 'Cmd Read is already ON.');
      await input_set('READ_CMD_ONLY', 'true');
      return reply(lang === 'si' ? '✅ Cmd Read සක්‍රිය විය!' : '✅ Cmd Read turned ON.');
    }

    if (q === 'off') {
      if (config.READ_CMD_ONLY !== 'true') return reply(lang === 'si' ? 'Cmd Read දැනටමත් අක්‍රියයි!' : 'Cmd Read is already OFF.');
      await input_set('READ_CMD_ONLY', 'false');
      return reply(lang === 'si' ? '✅ Cmd Read අක්‍රිය විය!' : '✅ Cmd Read turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autoreact",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_REACT === 'true') return reply(lang === 'si' ? 'Auto React දැනටමත් සක්‍රියයි!' : 'Auto React is already ON.');
      await input_set('AUTO_REACT', 'true');
      return reply(lang === 'si' ? '✅ Auto React සක්‍රිය විය!' : '✅ Auto React turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_REACT !== 'true') return reply(lang === 'si' ? 'Auto React දැනටමත් අක්‍රියයි!' : 'Auto React is already OFF.');
      await input_set('AUTO_REACT', 'false');
      return reply(lang === 'si' ? '✅ Auto React අක්‍රිය විය!' : '✅ Auto React turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "alwaysonline",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.ALWAYS_ONLINE === 'true') return reply(lang === 'si' ? 'Always Online දැනටමත් සක්‍රියයි!' : 'Always Online is already ON.');
      await input_set('ALWAYS_ONLINE', 'true');
      return reply(lang === 'si' ? '✅ Always Online සක්‍රිය විය!' : '✅ Always Online turned ON.');
    }

    if (q === 'off') {
      if (config.ALWAYS_ONLINE !== 'true') return reply(lang === 'si' ? 'Always Online දැනටමත් අක්‍රියයි!' : 'Always Online is already OFF.');
      await input_set('ALWAYS_ONLINE', 'false');
      return reply(lang === 'si' ? '✅ Always Online අක්‍රිය විය!' : '✅ Always Online turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});


cmd({
  pattern: "autoblock",
  react: "🗣️",
  dontAddCommandList: true,
  filename: __filename
},
async (conn, mek, m, { q, isMe, config, reply, l }) => {
  try {
    if (!isMe) return await reply(BOTOW);
    const lang = config.LANG;

    if (q === 'on') {
      if (config.AUTO_BLOCK === 'true') return reply(lang === 'si' ? 'Auto Block දැනටමත් සක්‍රියයි!' : 'Auto Block is already ON.');
      await input_set('AUTO_BLOCK', 'true');
      return reply(lang === 'si' ? '✅ Auto Block සක්‍රිය විය!' : '✅ Auto Block turned ON.');
    }

    if (q === 'off') {
      if (config.AUTO_BLOCK !== 'true') return reply(lang === 'si' ? 'Auto Block දැනටමත් අක්‍රියයි!' : 'Auto Block is already OFF.');
      await input_set('AUTO_BLOCK', 'false');
      return reply(lang === 'si' ? '✅ Auto Block අක්‍රිය විය!' : '✅ Auto Block turned OFF.');
    }

  } catch (e) {
    reply(lang === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
  }
});

	

cmd({
    pattern: "settings",
    react: "⚙️",
    desc: "setting list",
    category: "main",
    use: '.settings',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)	
let dat = `👨‍💻 ᴢᴀɴᴛᴀ-xᴍᴅ | ᴘᴏᴡʀʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ 👨‍💻

  *ZANTA-XMD SETTINGS*`

	
const sections = [

   {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[1] 𝗕𝗢𝗧 𝗪𝗢𝗥𝗞 𝗠𝗢𝗗𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    1.1", rowId: prefix + 'onlygroup on ' + q , description: 'To Put Bot Private 🔑'}, 
  {title: "    1.2", rowId: prefix + 'onlygroup off ' + q , description: 'To Put Bot Public 🔑'},	
]
    } ,	


{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[2] 𝗕𝗢𝗧 𝗦𝗛𝗨𝗧𝗗𝗢𝗪𝗡 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    2.1", rowId: prefix + 'disablepm on ' + q , description: 'To Put Bot Shutdown 🔑'}, 
  {title: "    2.2", rowId: prefix + 'disablepm off ' + q , description: 'To Put Bot Public 🔑'},	
]
    } ,	
	
   {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[3] 𝗔𝗨𝗧𝗢 𝗩𝗢𝗜𝗖𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    3.1", rowId: prefix + 'autovoice on ' + q , description: 'To Enable Auto Voice 🔑'}, 
  {title: "    3.2", rowId: prefix + 'autovoice off ' + q , description: 'To Disable Auto Voice Off 🔒'},	
]
    } ,	

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[4] 𝗔𝗨𝗧𝗢 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    4.1", rowId: prefix + 'autosticker on ' + q , description: 'To Enable Auto Sticker On 🔑'}, 
  {title: "    4.2", rowId: prefix + 'autosticker off ' + q , description: 'To Disable Auto Sticker Off 🔒'},	
]
    } 	,

{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[5] 𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    5.1", rowId: prefix + 'autoreply on ' + q , description: 'To Enable Auto reply On 🔑'}, 
  {title: "    5.2", rowId: prefix + 'autoreply off ' + q , description: 'To Disable Auto reply Off 🔒'},	
]
    } 	,
	
    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[6] 𝗔𝗨𝗧𝗢 𝗕𝗜𝗢 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    6.1", rowId: prefix + 'autobio on ' + q , description: 'To Enable Auto Bio On 🔑'}, 
  {title: "    6.2", rowId: prefix + 'autobio off ' + q , description: 'To Disable Auto Bio Off 🔒'},	
]
    } 	,

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[7] 𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗩𝗜𝗘𝗪 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    7.1", rowId: prefix + 'autostatus on ' + q , description: 'To Enable Auto Status On 🔑'}, 
  {title: "    7.2", rowId: prefix + 'autostatus off ' + q , description: 'To Disable Auto Status Off 🔒'},	
]
    } 	,

 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[8] 𝗔𝗨𝗧𝗢 𝗧𝗬𝗣𝗜𝗡𝗚 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    8.1", rowId: prefix + 'autotyping on ' + q , description: 'To Enable Auto Typing On 🔑'}, 
  {title: "    8.2", rowId: prefix + 'autotyping off ' + q , description: 'To Disable Auto Typing Off 🔒'},	
]
    } 	,

 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[9] 𝗔𝗨𝗧𝗢 𝗥𝗘𝗖𝗢𝗥𝗗𝗜𝗡𝗚 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    9.1", rowId: prefix + 'autorecording on ' + q , description: 'To Enable Auto Recording On 🔑'}, 
  {title: "    9.2", rowId: prefix + 'autorecording off ' + q , description: 'To Disable Auto Recording Off 🔒'},	
]
    } 	,	

 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[10] 𝗔𝗨𝗧𝗢 𝗥𝗘𝗔𝗗 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    10.1", rowId: prefix + 'autoread on ' + q , description: 'To Enable Auto Read On 🔑'}, 
  {title: "    10.2", rowId: prefix + 'autoread off ' + q , description: 'To Disable Auto Read Off 🔒'},	
]
    } 	,	

 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[11] 𝗔𝗨𝗧𝗢 𝗥𝗘𝗔𝗖𝗧 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    11.1", rowId: prefix + 'autoreact on ' + q , description: 'To Enable Auto React On 🔑'}, 
  {title: "    11.2", rowId: prefix + 'autoreact off ' + q , description: 'To Disable Auto React Off 🔒'},	
]
    } 	,	

 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[12] 𝗔𝗨𝗧𝗢 𝗔𝗟𝗪𝗔𝗬𝗦 𝗢𝗡𝗟𝗜𝗡𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    12.1", rowId: prefix + 'alwaysonline on ' + q , description: 'To Enable Always Online On 🔑'}, 
  {title: "    12.2", rowId: prefix + 'alwaysonline off ' + q , description: 'To Disable Always Online Off 🔒'},	
]
    } 	,	   

{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[13] 𝗔𝗨𝗧𝗢 𝗡𝗢 𝗕𝗟𝗢𝗖𝗞 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    13.1", rowId: prefix + 'autoblock on ' + q , description: 'To Enable Block On 🔑'}, 
  {title: "    13.2", rowId: prefix + 'autoblock off ' + q , description: 'To Disable Block Off 🔒'},	
]
    } 	,	   
	
 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[14] 𝗔𝗨𝗧𝗢 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    14.1", rowId: prefix + 'autowelcome on ' + q , description: 'To Enable Auto Welcome On 🔑'}, 
  {title: "    14.2", rowId: prefix + 'autowelcome off ' + q , description: 'To Disable Auto Welcome Off 🔒'},	
]
    } 	,

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[15] 𝗔𝗡𝗧𝗜 𝗕𝗢𝗧 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    15.1", rowId: prefix + 'antibot on ' + q , description: 'To Enable AntiBot On 🔑'}, 
  {title: "    15.2", rowId: prefix + 'antibot off ' + q , description: 'To Disable AntiBot Off 🔒'},	
]
    } 	,

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[16] 𝗔𝗡𝗧𝗜 𝗟𝗜𝗡𝗞 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    16.1", rowId: prefix + 'antilink on ' + q , description: 'To Enable AntiLink On 🔑'}, 
  {title: "    16.2", rowId: prefix + 'antilink off ' + q , description: 'To Disable AntiLink Off 🔒'},	
]
    } 	,

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[17] 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    17.1", rowId: prefix + 'antibad on ' + q , description: 'To Enable AntiBad On 🔑'}, 
  {title: "    17.2", rowId: prefix + 'antibad off ' + q , description: 'To Disable AntiBad Off 🔒'},	
]
    },

   {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[18] 𝗔𝗡𝗧𝗜 𝗗𝗘𝗟𝗘𝗧𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    18.1", rowId: prefix + 'antidelete on ' + q , description: 'To Enable AntiDelete On 🔑'}, 
  {title: "    18.2", rowId: prefix + 'antidelete off ' + q , description: 'To Disable AntiDelete Off 🔒'},	
]
    },	

    {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[19] 𝗔𝗡𝗧𝗜 𝗖𝗔𝗟𝗟 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    19.1", rowId: prefix + 'anticall on ' + q , description: 'To Enable AntiCall On 🔑'}, 
  {title: "    19.2", rowId: prefix + 'anticall off ' + q , description: 'To Disable AntiCall Off 🔒'},	
]
    },
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[20] 𝗔𝗜 𝗜𝗠𝗔𝗚𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    20.1", rowId: prefix + 'aiimage on ' + q , description: 'To Enable Ai Image On 🔑'}, 
  {title: "    20.2", rowId: prefix + 'aiimage off ' + q , description: 'To Disable Ai Image Off 🔒'},	
]
    },
 {
	title: "━━━━━━━━━━━━━━━━━━\n\n`[21] 𝗔𝗜 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    21.1", rowId: prefix + 'aichatbot on ' + q , description: 'To Enable Ai CHATBOT On 🔑'}, 
  {title: "    21.2", rowId: prefix + 'aichatbot off ' + q , description: 'To Disable Ai CHATBOT Off 🔒'},	
]
    },	
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[22] 𝗔𝗜 𝗠𝗔𝗧𝗛𝗦 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    22.1", rowId: prefix + 'mathsai on ' + q , description: 'To Enable Ai MATHS On 🔑'}, 
  {title: "    22.2", rowId: prefix + 'mathsai off ' + q , description: 'To Disable Ai MATHS Off 🔒'},	
]
    },		
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[23] 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    23.1", rowId: prefix + 'welcome on ' + q , description: 'To Enable Welcome On 🔑'}, 
  {title: "    23.2", rowId: prefix + 'welcome off ' + q , description: 'To Disable Welcome Off 🔒'},	
]
    },
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[24] 𝗢𝗪𝗡𝗘𝗥 𝗥𝗘𝗔𝗖𝗧 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    24.1", rowId: prefix + 'oreact on ' + q , description: 'To Enable Owner React On 🔑'}, 
  {title: "    24.2", rowId: prefix + 'oreact off ' + q , description: 'To Disable Owner React Off 🔒'},	
]
    },	
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[25] 𝗖𝗠𝗗 𝗥𝗘𝗔𝗗 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    25.1", rowId: prefix + 'cmdread on ' + q , description: 'To Enable CmdRead On 🔑'}, 
  {title: "    25.2", rowId: prefix + 'cmdread off ' + q , description: 'To Disable CmdRead Off 🔒'},	
]
    },
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[26] 𝗢𝗡𝗟𝗬 𝗚𝗥𝗢𝗨𝗣 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    26.1", rowId: prefix + 'onlygroup on ' + q , description: 'To Enable OnlyGroup On 🔑'}, 
  {title: "    26.2", rowId: prefix + 'onlygroup off ' + q , description: 'To Disable OnlyGroup Off 🔒'},	
]
    },
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[27] 𝗢𝗡𝗟𝗬 𝗠𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    27.1", rowId: prefix + 'onlyme on ' + q , description: 'To Enable OnlyMe On 🔑'}, 
  {title: "    27.2", rowId: prefix + 'onlyme off ' + q , description: 'To Disable OnlyMe Off 🔒'},	
]
    },
{
	title: "━━━━━━━━━━━━━━━━━━\n\n`[28] 𝗠𝗢𝗗𝗘 𝗦𝗘𝗧𝗧𝗜𝗡𝗚`",
	rows: [
  {title: "    28.1", rowId: prefix + 'mode on ' + q , description: 'To Enable button 🔑'}, 
  {title: "    28.2", rowId: prefix + 'mode off ' + q , description: 'To Disable nonbutton 🔒'},	
]
    }	
]
  const listMessage = {
caption: dat,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})