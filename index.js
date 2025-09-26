const {
    default: makeWASocket,
    getAggregateVotesInPollMessage, 
    useMultiFileAuthState,
    DisconnectReason,
    getDevice,
    fetchLatestBaileysVersion,
    jidNormalizedUser,
    getContentType,
    Browsers,
    delay,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    proto
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const FileType = require('file-type')
const moment = require('moment-timezone')
const l = console.log
var config = require('./settings')
const qrcode = require('qrcode-terminal')
const NodeCache = require('node-cache')
const util = require('util')
const mongoose = require('mongoose'); 
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require("cheerio")
var prefix = config.PREFIX
const news = config.news
var prefixRegex = config.PREFIX === "false" || config.PREFIX === "null" ? "^" : new RegExp('^[' + config.PREFIX + ']');
const {
    smsg,
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
    fetchBuffer,
    initializeNewsSources,
    groupUpdatePlugin,
    getFile
} = require('./lib/functions')
const {
    sms,
    downloadMediaMessage
} = require('./lib/msg')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb } = require("./lib/database")
var { get_set , input_set } = require('./lib/set_db')        
const axios = require('axios')
 function genMsgId() {
  const lt = 'VajiraTech';
  const prefix = "3EB";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomText = prefix;

  for (let i = prefix.length; i < 22; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters.charAt(randomIndex);
  }   
 return randomText;
}    

const {
    File
} = require('megajs')
const path = require('path')
const msgRetryCounterCache = new NodeCache()
const ownerNumber = '94719199757'



//===================SESSION============================
if (!fs.existsSync(__dirname + '/session/creds.json')) {
    if (config.SESSION_ID) {
      const sessdata = config.SESSION_ID.replace("ZANTA-XMD=", "")
      const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
      filer.download((err, data) => {
        if (err) throw err
        fs.writeFile(__dirname + '/session/creds.json', data, () => {
          console.log("Session download completed !!")
        })
      })
    }
  }
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;


//====================================
    async function connectToWA() {
//===========================
    console.log("Connecting VAJIRA-MD ☠️...");
    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/session/')
    var { version } = await fetchLatestBaileysVersion()
    
    const conn = makeWASocket({
            logger: P({ level: 'silent' }),
            printQRInTerminal: false,
            browser: Browsers.macOS("Firefox"),
            syncFullHistory: true,
            auth: state,
            version
            })
        
    conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
    if (lastDisconnect.error.output.statusCode) {
    connectToWA()
    }
    } else if (connection === 'open') {

initializeNewsSources(conn, config);	  	


const path = require('path');
const deployedPath = path.join(__dirname, "/lib/deployed_users.json");



  const userId = conn.user?.id?.split(":")[0] || "unknown";

  let deployed = [];
  if (fs.existsSync(deployedPath)) {
    deployed = JSON.parse(fs.readFileSync(deployedPath));
  }

  if (!deployed.includes(userId)) {
    deployed.push(userId);
    fs.writeFileSync(deployedPath, JSON.stringify(deployed, null, 2));
  }


	    
	    
            console.log('Installing plugins 🔌... ')
            
            fs.readdirSync("./plugins/").forEach((plugin) => {
                if (path.extname(plugin).toLowerCase() == ".js") {
                    require("./plugins/" + plugin);
                }
            });
            console.log('Plugins installed ✅')
            console.log('Bot connected ✅')
conn.sendMessage(conn.user.id, {
text: "*👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻 successfully connected* ✓\n\n Use .Update command to see Vajira md new update news \n\n> ◦ *Official GitHub* - ```https://github.com/VajiraTech```\n> ◦ ᴊᴏɪɴ ᴏᴜʀ sᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ ᴠɪᴀ ᴛʏᴘᴇ: .joinsup\n*👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻 ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴄʀᴇᴀᴛᴇᴅ ʙʏ • ᴠᴀᴊɪʀᴀ ʀᴀᴛʜɴᴀʏᴀᴋᴀ*",
contextInfo: {
externalAdReply: {
title: "👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ 👨‍💻\nSuccessfully Connected !",	
thumbnailUrl: "https://cdn.dribbble.com/users/15468/screenshots/2450252/logo.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}}) 
conn.sendMessage(conn.user.id, { text: '!* Share this group link with your grops:\n\nhttps://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z\n\n📈 Share it 20 times to unlock PREMIUM access!' });		    
    }
  })



const AUTO_REPLY_FILE = "./lib/auto-replies.json";



conn.ev.on("messages.upsert", async ({ messages }) => {
  try {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || "";
    if (!text) return;

    if (fs.existsSync(AUTO_REPLY_FILE)) {
      const replies = JSON.parse(fs.readFileSync(AUTO_REPLY_FILE));
      const response = replies[text.toLowerCase()];
      if (response) {
        await conn.sendMessage(m.key.remoteJid, { text: response }, { quoted: m });
      }
    }
  } catch (err) {
    console.error("Auto-reply error:", err);
  }
});



      
        
      // Raw Gist URL
const GIST_URL = "https://gist.github.com/VajiraOfficialBot/3f9c188fac260ffc6171e4433a32bcc5/raw";

// Store last message sent
let lastGistContent = "";

// Function to check and send new messages
async function checkAndSendGistUpdate(conn) {
  try {
    const { data } = await axios.get(GIST_URL);
    const message = data.trim();

    if (!message || message === lastGistContent) return;

    lastGistContent = message;

    const jid = conn.user.id; // Send to bot's own number

    await conn.sendMessage(jid, {
      text: `*📬 New Message:*\n\n${message}`,
    });

    console.log("✅ Sent new gist message to bot's inbox.");
  } catch (err) {
    console.error("Error checking Gist:", err.message);
  }
}

// Run after connection is open
conn.ev.on("connection.update", (update) => {
  if (update.connection === "open") {
    // Check every 15 seconds
    setInterval(() => {
      checkAndSendGistUpdate(conn);
    }, 15 * 1000);
  }
});

//==================================================================
conn.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message || m.key.fromMe) return;

    // Detect if it's a special protocol message (like a status mention)
    if (m.message.protocolMessage && m.message.protocolMessage.type === 'statusMention') {
        const groupId = m.key.remoteJid;
        const responseMessage = "📣 A new status has mentioned this group! Check it out!";
        await conn.sendMessage(groupId, { text: responseMessage });
    }
});


conn.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    for (let user of participants) {
    const profilePic = await conn.profilePictureUrl(user, 'image');	    
      let userTag = `@${user.split('@')[0]}`;

      if (action === 'promote') {
        await conn.sendMessage(id, {
          image: { url: profilePic },
          caption: `✅ ${userTag} has been *promoted* to admin. by VAJIRA MD`,
          mentions: [user]
        });
      } else if (action === 'demote') {
        await conn.sendMessage(id, {
	  image: { url: profilePic },	
          caption: `❌ ${userTag} has been *demoted* from admin. by VAJIRA MD`,
          mentions: [user]	
        });
      }
    }
  });




	    
conn.ev.on('messages.upsert', async ({ messages }) => {
    try {
        const m = messages[0];
        if (!m.message || m.key.fromMe) return;

        const msgText = m.message?.conversation || m.message?.extendedTextMessage?.text;
        if (!msgText || !/^hi$/i.test(msgText.trim())) return;

        const sender = m.key.remoteJid;

        const botJid = conn.user.id; // Bot's JID
        const botNumber = botJid.split('@')[0];

        // Get name from contacts or fallback
        let name = conn.contacts?.[botJid]?.notify || botNumber;

        // Get bio/about
        const statusObj = await conn.fetchStatus(botJid);
        const about = statusObj?.status || 'No about set';

        // Get profile photo
        let profilePic;
        try {
            profilePic = await conn.profilePictureUrl(botJid, 'image');
        } catch {
            profilePic = null;
        }

        // Send Sinhala greeting message
        await conn.sendMessage(sender, {
            text: `හයි ලමයො මන් ඔයාව save කරා...\nඔයත් මව save කරගන්න හරිද 🫣\n\n*Bot Profile Info:*`
        }, { quoted: m });

        // Send contact card (vCard)
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:My WhatsApp Bot;
TEL;type=CELL;type=VOICE;waid=${botNumber}:${botNumber}
NOTE:${about}
END:VCARD`;

        await conn.sendMessage(sender, {
            contacts: {
                displayName: name,
                contacts: [{ vcard }]
            }
        }, { quoted: m });

        // Send profile picture + caption
        const profileText = `*Name:* ${name}
*Number:* wa.me/${botNumber}
*About:* ${about}`;

        if (profilePic) {
            await conn.sendMessage(sender, {
                image: { url: profilePic },
                caption: profileText
            }, { quoted: m });
        } else {
            await conn.sendMessage(sender, {
                text: profileText
            }, { quoted: m });
        }

    } catch (err) {
        console.error("Auto-profile error:", err);
    }
});

	    


conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m || !m.message || !m.key || !m.message.pollUpdateMessage) return;

  const vote = m.message.pollUpdateMessage;
  const jid = m.key.remoteJid;
  const sender = m.key.participant || m.key.remoteJid;
  const selected = vote.selectedOptions;

  // Ensure selected is valid and has at least one item
  if (!selected || !Array.isArray(selected) || selected.length === 0) return;

  const option = selected[0];
  let response = '';

  switch (option) {
    case '1':
      response = `📜 *Main Menu:*\n\n1. .daily\n2. .inviteunlock\n3. .jackpot\n\nUse a command to begin.`;
      break;
    case '2':
      response = `🎁 *Rewards Menu:*\n\n- .daily\n- .shareprogress\n- .refcode`;
      break;
    case '3':
      response = `📊 *Leaderboard Options:*\n\n- .topinvites\n- .xpleader`;
      break;
    default:
      response = `❓ Unknown option selected. Please try again.`;
  }

  await conn.sendMessage(jid, { text: response }, { quoted: m });
});

	    
	    
conn.ev.on("call", async(json) => {
	  if(config.ANTI_CALL === "true" ) { 
    	for(const id of json) {
    		if(id.status == "offer") {
    			if(id.isGroup == false) {
    				await conn.sendMessage(id.from, {
    					text: `⚠️︱Call rejected automaticaly Because owner is busy right now\nහිමිකරු දැන් කාර්ය බහුල බැවින් ඇමතුම ස්වයංක්‍රීයව ප්‍රතික්ෂේප විය`, 
							mentions: [id.from]
    				});
    				await conn.rejectCall(id.id, id.from);
    			} else {
    				await conn.rejectCall(id.id, id.from);
    			}
    		}
    	}}
    }); 
	
//==================================Welcome================================
	

conn.forwardMessage = async (jid, message, forceForward = false, options = {}) => {
            let vtype
            if (options.readViewOnce) {
                message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
                vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                delete (message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
                delete message.message.viewOnceMessage.message[vtype].viewOnce
                message.message = {
                    ...message.message.viewOnceMessage.message
                }
            }

            let mtype = Object.keys(message.message)[0]
            let content = await generateForwardMessageContent(message, forceForward)
            let ctype = Object.keys(content)[0]
            let context = {}
            if (mtype != "conversation") context = message.message[mtype].contextInfo
            content[ctype].contextInfo = {
                ...context,
                ...content[ctype].contextInfo
            }
            const waMessage = await generateWAMessageFromContent(jid, content, options ? {
                ...content[ctype],
                ...options,
                ...(options.contextInfo ? {
                    contextInfo: {
                        ...content[ctype].contextInfo,
                        ...options.contextInfo
                    }
                } : {})
            } : {})
            await conn.relayMessage(jid, waMessage.message, { messageId: waMessage.key.id })
            return waMessage
             }



	
groupUpdatePlugin(conn);
                  
//==================================================================

conn.ev.on('group-participants.update', async (anu) => {
    	if (config.ADMIN_EVENT === 'true') {
console.log(anu)
try {
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await conn.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await conn.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
 if (anu.action == 'promote') {
const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let xeonName = num
xeonbody = ` 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @${xeonName.split("@")[0]}, you have been *promoted* to *admin* 🥳`
   conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": "VAJIRA MD",
"body": "Vajira Rathnayaka",
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonWlcm,
"sourceUrl": `${wagc}`}}})
} else if (anu.action == 'demote') {
const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let xeonName = num
xeonbody = `𝗢𝗼𝗽𝘀‼️ @${xeonName.split("@")[0]}, you have been *demoted* from *admin* 😬`
conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": "VAJIRA MD",
"body": "Vajira Rathnayaka",
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonLft,
"sourceUrl": `${wagc}`}}})
}
}
} catch (err) {
console.log(err)
}
}
})
	      
	      
	
//==================================================================

	
// respon cmd pollMessage
async function getMessage(key) {
    if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg?.message;
    }
    return {
        conversation: "Hai",
    };
}

conn.ev.on('messages.update', async chatUpdate => {
    for (const { key, update } of chatUpdate) {
        if (update.pollUpdates && key.fromMe) {
            const pollCreation = await getMessage(key);
            if (pollCreation) {
                const pollUpdate = await getAggregateVotesInPollMessage({
                    message: pollCreation,
                    pollUpdates: update.pollUpdates,
                });
                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name;
                if (toCmd == undefined) return;
                var prefCmd = prefix + toCmd;

                try {
                    setTimeout(async () => {
                        await gss.sendMessage(key.remoteJid, { delete: key });
                    }, 10000);
                } catch (error) {
                    console.error("Error deleting message:", error);
                }

                gss.appenTextMessage(prefCmd, chatUpdate);
            }
        }
    }
});



conn.ev.on('messages.update', async(mes) => {
        for(const { key, update } of mes) {
            if(update.pollUpdates) {
                const pollCreationmg = await getMessage(key)
                const pollCreation = pollCreationmg.message;
                if(pollCreation) {
                    const from = key.remoteJid;
                    const botNumber = await jidNormalizedUser(conn.user.id);
                    const pollMessage = await getAggregateVotesInPollMessage({
                        message: pollCreation,
                        pollUpdates: update.pollUpdates,
                    })
                    let bodyName = pollMessage.find(poll => poll.voters.length > 0)?.name || '';
                    let bodyIndex = pollMessage.findIndex(poll => poll.name === bodyName) || '';
                    
                    let voter = (pollMessage.find(poll => poll.voters.length > 0)?.voters[0] == 'me')?botNumber  :pollMessage.find(poll => poll.voters.length > 0)?.voters[0];
                    function extractMentionedJid(data) {
                        let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                    
                        for (let key of messageKeys) {
                            if (data[key]  && data[key].mentionedJid) {
                                return data[key].mentionedJid;
                            }
                        }
                    
                        return null; 
                    }function extractpollname(data) {
                        let messageKeys = ['pollCreationMessage', 'pollCreationMessageV1', 'pollCreationMessageV2', 'pollCreationMessageV3'];
                    
                        for (let key of messageKeys) {
                            if (data[key]  && data[key].name) {
                                return data[key].name;
                            }
                        }
                    
                        return null; 
                    }
                    const mentionedJid = extractMentionedJid(pollCreation);
                    const poll = extractpollname(pollCreation);
                    const isRequester= mentionedJid?.includes(voter)
                    const pollSender = pollCreationmg.key.remoteJid.includes('@g.us') ? pollCreationmg.key.participant : pollCreationmg.key.remoteJid;
                    const dat = {
                                body: bodyIndex+ 1,
                                voted:bodyName,
                                from: from,
                                isRequester : isRequester? isRequester:false,
                                mentionedJid: mentionedJid,
                                pollSender: pollSender,
                                poll:poll,
                                voter: voter,
                                type: 'poll'
                }
                
                    await conn.sendMessage(botNumber, { text: JSON.stringify(dat,null,2) } )
                    //conn.sendMessage(botNumber, { text: JSON.stringify(pollCreation,null,2) } )
                    //conn.sendMessage(botNumber, { text: JSON.stringify(pollMessage,null,2) } )
                    //conn.sendMessage(botNumber, { text: JSON.stringify(update?.pollUpdates,null,2) } )
                   
                    //events.commands.map(async(command) => {
                      //  if (body && command.on === "poll") {
                        //command.function(conn, mes, m,{from, l,  body, isGroup, sender,  botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply,react})
                        //}});
                }
            }
        }
    })	



	
//==================================================================	

    conn.ev.on('creds.update', saveCreds)
    conn.ev.on('messages.upsert', async (mek) => {
      try {
            mek = mek.messages[0]
            if (!mek.message) return
	    var id_db = require('./lib/id_db')    
            mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
             //----------------AUTO STATUS VIEW-------------------------------
if (!mek.message) return        
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
 if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_READ === "true"){
                let emoji = [
                    '😘', '😭', '😂', '😹', '😍', '😋', '🙏', '😜', '😢', '😠', '🤫', '😎',
                ];
                let sigma = emoji[Math.floor(Math.random() * emoji.length)];
                await conn.readMessages([mek.key]);
                conn.sendMessage(
                    'status@broadcast',
                    { react: { text: sigma, key: mek.key } },
                    { statusJidList: [mek.key.participant] },
                );
	/* const user = mek.key.participant	      
const text = config.STATUS_REPLY_MESSAGE
await conn.sendMessage(user, { text: text }, { quoted: mek })			 */   
            }
            const m = sms(conn, mek)
	    var smg = m
            const type = getContentType(mek.message)
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
                    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []


const metadata = await conn.newsletterMetadata("jid", "120363290448968237@newsletter")	      
if (metadata.viewer_metadata === null){
await conn.newsletterFollow("120363290448968237@newsletter")
console.log("VAJIRA MD CHANNEL FOLLOW ✅")
}	 

/*
const id = mek.key.server_id
await conn.newsletterReactMessage("120363290448968237@newsletter", id, "❤️")
		    
	      */
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :(type == 'interactiveResponseMessage' ) ? mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson) && JSON.parse(mek.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :(type == 'templateButtonReplyMessage' )? mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : m.msg?.text || m.msg?.conversation || m.msg?.caption || m.message?.conversation || m.msg?.selectedButtonId || m.msg?.singleSelectReply?.selectedRowId || m.msg?.selectedId || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || m.msg?.name || ''

     
	      //==================================NonButton================================
  	
await isbtnID(mek.message?.extendedTextMessage?.contextInfo?.stanzaId) &&
getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)
? getCmdForCmdId(await getCMDStore(mek.message?.extendedTextMessage?.contextInfo?.stanzaId), mek?.message?.extendedTextMessage?.text)  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''   
 
 //==================================================================



conn.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return conn.sendMessage(jid, { poll: { name, values, selectableCount }}) }
	      
 
	    var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)    
	    prefix = config.PREFIX
var isCmd = body.startsWith(prefix)	    
var command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
var args = body.trim().split(/ +/).slice(1)
var q = args.join(' ')

    var body2 = ''
 if(smg.quoted && smg.quoted.fromMe && await id_db.check(smg.quoted.id)  ){
if (body.startsWith(prefix))  body = body.replace( prefix , '')
			     
			     
var id_body = await id_db.get_data( smg.quoted.id , body)
	
if (id_body.cmd) {
  isCmd = true
command = id_body.cmd.startsWith(prefix)?  id_body.cmd.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
args = id_body.cmd.trim().split(/ +/).slice(1)
q = args.join(' ')		
}
}
      console.log(command)
	    const gist = 'https://gist.github.com'  
            const gistusername = 'VajiraOfficialBot'	     
            const gisttype = 'raw'
	    const gistpremiumid = '3d227fcaaef4346773e6bbabfd4e2fe0'
	    const gistmainid = '6d7ee924f0479000d0bee90cd644ad2d'
            const isGroup = from.endsWith('@g.us')
            const sender = mek.key.fromMe ? (conn.user.id.split(':')[0] + '@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
            const senderNumber = sender.split('@')[0]
            const botNumber = conn.user.id.split(':')[0]
            const pushname = mek.pushName || 'Sin Nombre'
	    const ownbot = '94719199757'
	    const isownbot = ownbot?.includes(senderNumber)
            const vajira = '94719199757'
            const isVajira = vajira?.includes(senderNumber)
	    const developers = '94719199757'
            const isbot = botNumber.includes(senderNumber)
	    const isdev = developers.includes(senderNumber) 	    
            let epaneda =  (await axios.get(`${gist}/${gistusername}/${gistpremiumid}/${gisttype}`)).data
            const epada = epaneda.split(",")	    
            const isDev = [ ...epada ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)
	    const botNumber2 = await jidNormalizedUser(conn.user.id)
            const isCreator = [ botNumber2 ].map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(sender)	  
            const isMe = isbot ? isbot : isdev
            const isOwner = ownerNumber.includes(senderNumber) || isMe
            const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const participants = isGroup ? await groupMetadata.participants : ''
            const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
            const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
            const isAdmins = isGroup ? groupAdmins.includes(sender) : false
            const isreaction = m.message.reactionMessage ? true : false
            const isAnti = (teks) => {
                let getdata = teks
                for (let i = 0; i < getdata.length; i++) {
                    if (getdata[i] === from) return true
                }
                return false
            }
            const reply = async(teks) => {
  return await conn.sendMessage(from, { text: teks }, { quoted: mek })
}




//==================================Nonbutton================================



function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}	

        

    var dbset = await  get_set('all')
config = await jsonConcat(config , dbset)    
conn.replyad = async (teks) => {
  return await conn.sendMessage(from, { text: teks ,
contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: mek })
}
const NON_BUTTON = true // Implement a switch to on/off this feature...
conn.buttonMessage2 = async (jid, msgData,quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n${mainNumber} | ${button.buttonText.displayText}\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage ,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage ,
contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}

conn.replyList = async (from , list_reply , options) => {
function convertNumberList(sections) {
    let result = "";

    sections.forEach((section, sectionIndex) => {
        result += section.title? `${section.title}\n` : ''

        section.rows.forEach((row, rowIndex) => {
            result += `${row.title} || ${row.description}`;
            result += rowIndex === section.rows.length - 1 ? "" : "\n"; // Add newline unless it's the last row
        });

        result += sectionIndex === sections.length - 1 ? "" : "\n\n"; // Add extra newline unless it's the last section
    });

    return result;
}
if (!list_reply.sections) return false
list_reply[list_reply.caption? 'caption' : 'text'] = ( list_reply.title ? list_reply.title + '\n\n' : "" ) +  (list_reply.caption? list_reply.caption : list_reply.text) + '\n\n' + list_reply.buttonText + '\n\n' + await convertNumberList(list_reply.sections) + '\n\n' +list_reply.footer	
var t = { ...list_reply }
delete list_reply.sections
delete list_reply.footer
delete list_reply.buttonText
delete list_reply.title
const sentMessage = await conn.sendMessage(from, list_reply , options);	
const cmdArray = [];
t.sections.forEach((section) => {
    section.rows.forEach((row) => {
        cmdArray.push({ rowId: row.rowId, title: row.title });
    });
});
for ( let i = 0; i < cmdArray.length; i++) {	
await id_db.input_data(cmdArray[i].rowId ,cmdArray[i].title , sentMessage.key.id ) 
}}  
      
conn.buttonMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []
    msgData.buttons.forEach((button, bttnIndex) => {
const mainNumber = `${bttnIndex + 1}`;
result += `\n${mainNumber} | ${button.buttonText.displayText}\n`;

CMD_ID_MAP.push({ cmdId: mainNumber, cmd: button.buttonId });
    });

    if (msgData.headerType === 1) {
const buttonMessage = `${msgData.text || msgData.caption}\n🔢 Reply you want number,${result}\
\n\n${msgData.footer}`
const textmsg = await conn.sendMessage(from, { text: buttonMessage ,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
await updateCMDStore(textmsg.key.id, CMD_ID_MAP);
    } else if (msgData.headerType === 4) {
const buttonMessage = `${msgData.caption}\n\n🔢 Reply you want number,${result}\n${msgData.footer}`
const imgmsg = await conn.sendMessage(jid, { image: msgData.image, caption: buttonMessage ,contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
await updateCMDStore(imgmsg.key.id, CMD_ID_MAP);
    }
  }
}


conn.listMessage2 = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n[${mainNumber}] ${section.title}\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage ,
contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

conn.listMessage = async (jid, msgData, quotemek) => {
  if (!NON_BUTTON) {
    await conn.sendMessage(jid, msgData)
  } else if (NON_BUTTON) {
    let result = "";
    const CMD_ID_MAP = []

    msgData.sections.forEach((section, sectionIndex) => {
const mainNumber = `${sectionIndex + 1}`;
result += `\n[${mainNumber}] ${section.title}\n`;

section.rows.forEach((row, rowIndex) => {
  const subNumber = `${mainNumber}.${rowIndex + 1}`;
  const rowHeader = `   ${subNumber} | ${row.title}`;
  result += `${rowHeader}\n`;
  if (row.description) {
    result += `   ${row.description}\n\n`;
  }
  CMD_ID_MAP.push({ cmdId: subNumber, cmd: row.rowId });
});
    });

    const listMessage = `${msgData.text}\n\n${msgData.buttonText},${result}\n${msgData.footer}`
    const text = await conn.sendMessage(from, { text: listMessage, 
contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://wa.me/94711453361" ,
thumbnailUrl: 'https://pomf2.lain.la/f/opmjwj3s.jpg' ,
renderLargerThumbnail: false,
showAdAttribution: true
}
}}, { quoted: quotemek || mek})
    await updateCMDStore(text.key.id, CMD_ID_MAP);
  }
}

    	    
conn.edite = async (gg, newmg) => {
  await conn.relayMessage(from, {
    protocolMessage: {
key: gg.key,
type: 14,
editedMessage: {
  conversation: newmg
}
    }
  }, {})
}	    


	

      

//==================================Button================================
            
	      
            const ownerdata = (await axios.get(`${gist}/${gistusername}/${gistmainid}/${gisttype}`)).data
            config.LOGO = ownerdata.imageurl
            config.FOOTER = ownerdata.footer
            config.PAIR = ownerdata.pair
            config.NEWS = ownerdata.news
            config.API = ownerdata.api
            config.APIKEY = ownerdata.apikey
	    config.DL = ownerdata.dl
	      
            conn.edit = async (mek, newmg) => {
                await conn.relayMessage(from, {
                    protocolMessage: {
                        key: mek.key,
                        type: 14,
                        editedMessage: {
                            conversation: newmg
                        }
                    }
                }, {})
            }
     
conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                let mime = '';
                let res = await axios.head(url)
                mime = res.headers['content-type']
                if (mime.split("/")[1] === "gif") {
                    return conn.sendMessage(jid, {
                        video: await getBuffer(url),
                        caption: caption,
                        gifPlayback: true,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                let type = mime.split("/")[0] + "Message"
                if (mime === "application/pdf") {
                    return conn.sendMessage(jid, {
                        document: await getBuffer(url),
                        mimetype: 'application/pdf',
                        caption: caption,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "image") {
                    return conn.sendMessage(jid, {
                        image: await getBuffer(url),
                        caption: caption,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "video") {
                    return conn.sendMessage(jid, {
                        video: await getBuffer(url),
                        caption: caption,
                        mimetype: 'video/mp4',
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "audio") {
                    return conn.sendMessage(jid, {
                        audio: await getBuffer(url),
                        caption: caption,
                        mimetype: 'audio/mpeg',
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
            }
            conn.sendButtonMessage = async (jid, buttons, quoted, opts = {}) => {

                let header;
                if (opts?.video) {
                    var video = await prepareWAMessageMedia({
                        video: {
                            url: opts && opts.video ? opts.video : ''
                        }
                    }, {
                        upload: conn.waUploadToServer
                    })
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: true,
                        videoMessage: video.videoMessage,
                    }

                } else if (opts?.image) {
                    var image = await prepareWAMessageMedia({
                        image: {
                            url: opts && opts.image ? opts.image : ''
                        }
                    }, {
                        upload: conn.waUploadToServer
                    })
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: true,
                        imageMessage: image.imageMessage,
                    }

                } else {
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: false,
                    }
                }


                let message = generateWAMessageFromContent(jid, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2,
                            },
                            interactiveMessage: {
                                body: {
                                    text: opts && opts.body ? opts.body : ''
                                },
                                footer: {
                                    text: opts && opts.footer ? opts.footer : ''
                                },
                                header: header,
                                nativeFlowMessage: {
                                    buttons: buttons,
                                    messageParamsJson: ''
                                }
                            }
                        }
                    }
                }, {
                    quoted: quoted
                })
                await conn.sendPresenceUpdate('composing', jid)
                await sleep(1000 * 1);
                return await conn.relayMessage(jid, message["message"], {
                    messageId: message.key.id
                })
            }


if (prefixRegex.test(body) && !isMe && !isOwner && !isGroup && config.ONLY_GROUP === 'true') {
    return await conn.sendMessage(from, {
    text: '- ❌ This bot only works in *groups*. Tell the owner to put VAJIRA MD on *public* use 🫡.\n- ❌ මේ බොට්ට වැඩ කරන්නෙ *group* වල විතරයි. VAJIRA MD *public* එකට දාන්න කියලා owner ට කියන්න 🫡.',
    quoted: mek
  });
}

if (prefixRegex.test(body) && !isMe && !isOwner && config.ONLY_ME == 'true') { 
    return await conn.sendMessage(from, {
    text: '- ❌ Owner was put this bot to *private* use. tell him to put this bot to *public* use 🫡.\n- ❌ අයිතිකරු විසින් මෙම බොට් *private* දමා ඇත එය *public* දෑමීම සදහා owner වෙත පවසන්න 🫡.',
    quoted: mek
  });
}    

   
 

            //==================================plugin map================================
         const events = require('./lib/command')
const cmdName = isCmd ?  command : false;
if (isCmd) {
  const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
  if (cmd) {
    if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } })

    try {
cmd.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply ,config, isCreator , isDev, botNumber2 });
    } catch (e) {
console.error("[PLUGIN ERROR] ", e);
    }
  }
}
events.commands.map(async (command) => {
  if (body && command.on === "body") {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (mek.q && command.on === "text") {
    command.function(conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config ,isCreator , isDev, botNumber2 });
  } else if (
    (command.on === "image" || command.on === "photo") &&
    mek.type === "imageMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body,  isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  } else if (
    command.on === "sticker" &&
    mek.type === "stickerMessage"
  ) {
    command.function(conn, mek, m, { from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config, isCreator , isDev, botNumber2 });
  }
});





      conn.downloadAndSaveMediaMessage = async(message, filename, attachExtension = true) => {
                let quoted = message.msg ? message.msg : message
                let mime = (message.msg || message).mimetype || ''
                let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                const stream = await downloadContentFromMessage(quoted, messageType)
                let buffer = Buffer.from([])
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk])
                }
                let type = await FileType.fromBuffer(buffer)
                trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
                    // save to file
                await fs.writeFileSync(trueFileName, buffer)
                return trueFileName
            }	      

if(!isOwner) {	//!isOwner) {	
    if(config.ANTI_DELETE === "true" ) {
        
    if (!m.id.startsWith("BAE5")) {
    
    // Ensure the base directory exists
    const baseDir = 'message_data';
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir);
    }
    
    function loadChatData(remoteJid, messageId) {
      const chatFilePath = path.join(baseDir, remoteJid, `${messageId}.json`);
      try {
        const data = fs.readFileSync(chatFilePath, 'utf8');
        return JSON.parse(data) || [];
      } catch (error) {
        return [];
      }
    }
    
    function saveChatData(remoteJid, messageId, chatData) {
      const chatDir = path.join(baseDir, remoteJid);
    
      if (!fs.existsSync(chatDir)) {
        fs.mkdirSync(chatDir, { recursive: true });
      }
    
      const chatFilePath = path.join(chatDir, `${messageId}.json`);
    
      try {
        fs.writeFileSync(chatFilePath, JSON.stringify(chatData, null, 2));
       // console.log('Chat data saved successfully.');
      } catch (error) {
        console.error('Error saving chat data:', error);
      }
    }
        
    function handleIncomingMessage(message) {
      const remoteJid = from //message.key.remoteJid;
      const messageId = message.key.id;
    
      const chatData = loadChatData(remoteJid, messageId);
    
      chatData.push(message);
    
      saveChatData(remoteJid, messageId, chatData);
    
    //  console.log('Message received and saved:', messageId);
    }
    
    const delfrom = config.DELETEMSGSENDTO !=='' ? config.DELETEMSGSENDTO + 'chat.whatsapp.com': from
    function handleMessageRevocation(revocationMessage) {
    //const remoteJid = revocationMessage.message.protocolMessage.key.remoteJid;
     //const messageId = revocationMessage.message.protocolMessage.key.id;
    const remoteJid = from // revocationMessage.msg.key.remoteJid;
    const messageId = revocationMessage.msg.key.id;
    
        
     // console.log('Received revocation message with ID:', messageId);
    
      const chatData = loadChatData(remoteJid, messageId);
    
       const originalMessage = chatData[0]   
    
      if (originalMessage) {
        const deletedBy = revocationMessage.sender.split('@')[0];
        const sentBynn = originalMessage.key.participant ?? revocationMessage.sender;
    const sentBy = sentBynn.split('@')[0];
          if ( deletedBy.includes(botNumber) || sentBy.includes(botNumber) ) return;
     if(originalMessage.message && originalMessage.message.conversation && originalMessage.message.conversation !== ''){
         const messageText = originalMessage.message.conversation;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
         var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    //........................................//........................................
    }else if(originalMessage.msg.type ==='MESSAGE_EDIT'){
     conn.sendMessage(delfrom, { text: `❌ *edited message detected* ${originalMessage.message.editedMessage.message.protocolMessage.editedMessage.conversation}` },{quoted: mek});
     
    //........................................//........................................
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage && originalMessage.msg.text ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messageText = originalMessage.msg.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${messageText}${xx}` });
    } else if(originalMessage.message && originalMessage.message.exetendedTextMessage ){ //&& originalMessage.message.exetendedTextMessage.text && originalMessage.message.exetendedTextMessage.text !== ''){
        const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
     var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.body}${xx}` });
    }else if(originalMessage.type === 'extendedTextMessage') {
    async function quotedMessageRetrive(){     
    var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                
    if(originalMessage.message.extendedTextMessage){
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        var xx = '```'
     conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }else{
    const messagetext = originalMessage.message.extendedTextMessage.text;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
        conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${xx}${originalMessage.message.extendedTextMessage.text}${xx}` });
    }
    }
    
    quotedMessageRetrive()
           
    }else if(originalMessage.type === 'imageMessage') {
          async function imageMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.imageMessage.caption){
    const messageText = originalMessage.message.imageMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.imageMessage.caption}` })
    }else{
        await conn.sendMessage(delfrom, { image: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }       
        }
    imageMessageRetrive()
     
    }else if(originalMessage.type === 'videoMessage') {
          async function videoMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
    
    const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if(originalMessage.message.videoMessage.caption){
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    const messageText = originalMessage.message.videoMessage.caption;
    if (isGroup && messageText.includes('chat.whatsapp.com')) return;
    
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n\n> 🔓 Message Text: ${originalMessage.message.videoMessage.caption}` })
           }
    }else{
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
        const vData = originalMessage.message.videoMessage.fileLength
    const vTime = originalMessage.message.videoMessage.seconds;
    const fileDataMB = config.MAX_SIZE
    const fileLengthBytes = vData
    const fileLengthMB = fileLengthBytes / (1024 * 1024);
    const fileseconds = vTime
    if (fileLengthMB < fileDataMB && fileseconds < 30*60 ) {
        await conn.sendMessage(delfrom, { video: fs.readFileSync("./" + type.ext), caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_` })
    }
    }       
    }
    videoMessageRetrive()
    }else if(originalMessage.type === 'documentMessage') {
          async function documentMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    
        
    
    if(originalMessage.message.documentWithCaptionMessage){
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
     
    }else{
    
    await conn.sendMessage(delfrom, { document: fs.readFileSync("./" + type.ext), mimetype: originalMessage.message.documentMessage.mimetype, fileName: originalMessage.message.documentMessage.fileName, caption: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n`});
    
    }
     }
    
    documentMessageRetrive()
    }else if(originalMessage.type === 'audioMessage') {
          async function audioMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.audioMessage){
    const audioq = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: audioq});
    
    }else{
    if(originalMessage.message.audioMessage.ptt === "true"){
    
    const pttt = await conn.sendMessage(delfrom, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, ptt: 'true',fileName: `${m.id}.mp3` })	
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: pttt});
    
     }
      }
     }
    
    audioMessageRetrive()
    }else if(originalMessage.type === 'stickerMessage') {
          async function stickerMessageRetrive(){      var nameJpg = getRandom('');
    const ml = sms(conn, originalMessage)
                let buff =  await ml.download(nameJpg)
                let fileType = require('file-type');
                let type = fileType.fromBuffer(buff);
                await fs.promises.writeFile("./" + type.ext, buff);
    if(originalMessage.message.stickerMessage){
     
    //await conn.sendMessage(from, { audio: fs.readFileSync("./" + type.ext), mimetype:  originalMessage.message.audioMessage.mimetype, fileName:  `${m.id}.mp3` })	
     const sdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'VAJIRA-MD 🌟'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: sdata});
    
    }else{
    
    const stdata = await conn.sendMessage(delfrom,{sticker: fs.readFileSync("./" + type.ext) ,package: 'VAJIRA-MD 🌟'})
    return await conn.sendMessage(delfrom, { text: `🚫 *This message was deleted !!*\n\n  🚮 *Deleted by:* _${deletedBy}_\n  📩 *Sent by:* _${sentBy}_\n` },{quoted: stdata});
    
      }
     }
    
    stickerMessageRetrive()
             }
         
      } else {
        console.log('Original message not found for revocation.');
      }
    }
//    if(!isGroup){
    if (mek.msg && mek.msg.type === 0) {
      handleMessageRevocation(mek);
    } else {//if(mek.message && mek.message.conversation && mek.message.conversation !== ''){
      handleIncomingMessage(mek);
    
   //     }
    }
    }
    }	
    }



	      
//==================================================================	

	      
            switch (command) {
        case 'jid':
        reply(from)
        break

			    
        default:				
        if (isOwner && body.startsWith('$')) {
        let bodyy = body.split('$')[1]
        let code2 = bodyy.replace("°", ".toString()");
        try {
        let resultTest = await eval(code2);l
        if (typeof resultTest === "object") {
        reply(util.format(resultTest));
        } else {
        reply(util.format(resultTest));
        }
        } catch (err) {
        reply(util.format(err));
        }}}
        } catch (e) {
            const isError = String(e)
            console.log(isError)
        }
    })
}
app.get("/", (req, res) => {
res.send("📟 Vajira-Md Working successfully!");
});
app.listen(port, () => console.log(`Vajira-Md Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 4000);
    
    