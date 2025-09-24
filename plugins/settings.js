const { cmd, commands } = require('../lib/command')
const config = require('../settings')
var { get_set , input_set } = require('../lib/set_db') 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
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
    pattern: "newsactivate",
    react: "🗣️",
    desc: "To Activate auto news",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
    if ( config.N_JID == q) return reply(`Succesfully News Change To This Section`)
  await input_set('N_JID' , q)
  return reply(`News was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "statusreply",
    react: "🗣️",
    desc: "To Set status Message",
    category: "main",
    use: '.statusreply .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
    if ( config.STATUS_REPLY_MESSAGE == q) return reply(`Succesfully Set status reply`)
  await input_set('STATUS_REPLY_MESSAGE' , q)
  return reply(`status reply was changed`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})



cmd({
    pattern: "mode",
    react: "🗣️",
    desc: "To Set status Message",
    category: "main",
    use: '.mode button/nonbutton .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
    if ( config.MODE == q) return reply(`Succesfully Set Mode`)
  await input_set('MODE' , q)

if (q.includes("button")) {		
  return reply(`Successfully Changed to button Mode ✅`);
} if (q.includes("nonbutton")) {	
  return reply(`Successfully Changed to nonbutton Mode ✅`);
} else if (!q.includes("nonbutbb")) {
  return reply(`Spelling is wrong 🚫\n*correct spelling is:*\n\n*_To Activate Button Mode_*\n- .mode button\n*_To Activate NonButton Mode_*\n- .mode nonbutton`);
}

} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "setprefix",
    react: "🗣️",
    desc: "To change bot prefix",
    category: "main",
    use: '.setprefix .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
    if ( config.PREFIX == q) return reply(alredy)
  await input_set('PREFIX' , q)
  return reply(`prefix was changed to`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "setlogo",
    react: "🗣️",
    desc: "To change bot logo",
    category: "main",
    use: '.setlogo logo url .',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!isMe) return await reply(BOTOW)
    if ( config.LOGO == q) return reply(alredy)
  await input_set('LOGO' , q)
  return reply(`Logo was changed to`)
} catch (e) {
reply('*Error !!*')
l(e)
}
})	
	

cmd({
    pattern: "autoreply",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_REPLY == 'true') return reply('already Auto reply is on ')
  await input_set('AUTO_REPLY' , 'true')
  return reply('Auto Reply turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_REPLY !== 'true') return reply('already Auto reply is off')
  await input_set('AUTO_REPLY' , 'false')
  return reply('Auto Reply turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	




	
cmd({
    pattern: "oreact",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.OWNER_REACT == 'true') return reply('already Owner React is on ')
  await input_set('OWNER_REACT' , 'true')
  return reply('Owner React turned on')
  }
if ( q == 'off' ) {
   if ( config.OWNER_REACT !== 'true') return reply('already Owner React is off')
  await input_set('OWNER_REACT' , 'false')
  return reply('Owner React turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

cmd({
    pattern: "onlygroup",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ONLY_GROUP == 'true') return reply('already Only Group is on ')
  await input_set('ONLY_GROUP' , 'true')
  return reply('Only Group turned on')
  }
if ( q == 'off' ) {
   if ( config.ONLY_GROUP !== 'true') return reply('already Only Group is off')
  await input_set('ONLY_GROUP' , 'false')
  return reply('Only Group turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})		  

cmd({
    pattern: "onlyme",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ONLY_ME == 'true') return reply('already Only Me is on ')
  await input_set('ONLY_ME' , 'true')
  return reply('Only Me turned on')
  }
if ( q == 'off' ) {
   if ( config.ONLY_ME !== 'true') return reply('already Only Me is off')
  await input_set('ONLY_ME' , 'false')
  return reply('Only Me turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})		  


	
cmd({
    pattern: "antidelete",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ANTI_DELETE == 'true') return reply('already antidelete is on ')
  await input_set('ANTI_DELETE' , 'true')
  return reply('Antidelete turned on')
  }
if ( q == 'off' ) {
   if ( config.ANTI_DELETE !== 'true') return reply('already antidelete is off')
  await input_set('ANTI_DELETE' , 'false')
  return reply('Antidelete turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	


cmd({
    pattern: "anticall",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ANTI_CALL == 'true') return reply('already anticall is on ')
  await input_set('ANTI_CALL' , 'true')
  return reply('Anticall turned on')
  }
if ( q == 'off' ) {
   if ( config.ANTI_CALL !== 'true') return reply('already anticall is off')
  await input_set('ANTI_CALL' , 'false')
  return reply('Anticall turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "welcome",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.WELCOME == 'true') return reply('already Welcome is on ')
  await input_set('WELCOME' , 'true')
  return reply('Welcome turned on')
  }
if ( q == 'off' ) {
   if ( config.WELCOME !== 'true') return reply('already Welcome is off')
  await input_set('WELCOME' , 'false')
  return reply('Welcome turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	


cmd({
    pattern: "mathsai",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.MATHS_AI == 'true') return reply('already Ai Maths is on ')
  await input_set('MATHS_AI' , 'true')
  return reply('Ai Maths turned on')
  }
if ( q == 'off' ) {
   if ( config.MATHS_AI !== 'true') return reply('already Ai Maths is off')
  await input_set('MATHS_AI' , 'false')
  return reply('Ai Maths turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})      
	
cmd({
    pattern: "aichatbot",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AI_CHATBOT == 'true') return reply('already Ai Chatbot is on ')
  await input_set('AI_CHATBOT' , 'true')
  return reply('Ai Chatbot turned on')
  }
if ( q == 'off' ) {
   if ( config.AI_CHATBOT !== 'true') return reply('already Ai Chatbot is off')
  await input_set('AI_CHATBOT' , 'false')
  return reply('Ai Chatbot turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "aiimage",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AI_IMAGE == 'true') return reply('already Ai Image is on ')
  await input_set('AI_IMAGE' , 'true')
  return reply('Ai Image turned on')
  }
if ( q == 'off' ) {
   if ( config.AI_IMAGE !== 'true') return reply('already Ai Image is off')
  await input_set('AI_IMAGE' , 'false')
  return reply('Ai Image turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})
	

cmd({
    pattern: "onlygroup",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ONLY_GROUP == 'true') return reply('already bot is private ')
  await input_set('ONLY_GROUP' , 'true')
  return reply('Bot is now private')
  }
if ( q == 'off' ) {
   if ( config.ONLY_GROUP !== 'true') return reply('already bot is public')
  await input_set('ONLY_GROUP' , 'false')
  return reply('Bot is now public')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "disablepm",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.DISABLE_PM == 'true') return reply('already bot is Shutdown ')
  await input_set('DISABLE_PM' , 'true')
  return reply('Bot is now Shutdown')
  }
if ( q == 'off' ) {
   if ( config.DISABLE_PM !== 'true') return reply('already bot is working public')
  await input_set('DISABLE_PM' , 'false')
  return reply('Bot is now works everyone')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})




   

cmd({
    pattern: "autovoice",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_VOICE == 'true') return reply('already on ')
  await input_set('AUTO_VOICE' , 'true')
  return reply('autovoice turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_VOICE !== 'true') return reply('already off')
  await input_set('AUTO_VOICE' , 'false')
  return reply('autovoice turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "autosticker",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_STICKER == 'true') return reply('already on ')
  await input_set('AUTO_STICKER' , 'true')
  return reply('autosticker turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_STICKER !== 'true') return reply('already off')
  await input_set('AUTO_STICKER' , 'false')
  return reply('autosticker turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "autobio",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_BIO == 'true') return reply('already on ')
  await input_set('AUTO_BIO' , 'true')
  return reply('autobio turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_BIO !== 'true') return reply('already off')
  await input_set('AUTO_BIO' , 'false')
  return reply('autobio turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "autowelcome",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.WELCOME == 'true') return reply('already on ')
  await input_set('WELCOME' , 'true')
  return reply('autowelcome turned on')
  }
if ( q == 'off' ) {
   if ( config.WELCOME !== 'true') return reply('already off')
  await input_set('WELCOME' , 'false')
  return reply('autowelcome turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "antibot",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ANTI_BOT == 'true') return reply('already on ')
  await input_set('ANTI_BOT' , 'true')
  return reply('antibot turned on')
  }
if ( q == 'off' ) {
   if ( config.ANTI_BOT !== 'true') return reply('already off')
  await input_set('ANTI_BOT' , 'false')
  return reply('antibot turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "antilink",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ANTI_LINK == 'true') return reply('already on ')
  await input_set('ANTI_LINK' , 'true')
  return reply('antilink turned on')
  }
if ( q == 'off' ) {
   if ( config.ANTI_LINK !== 'true') return reply('already off')
  await input_set('ANTI_LINK' , 'false')
  return reply('antilink turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

	  
cmd({
    pattern: "antibad",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ANTI_BAD == 'true') return reply('already on ')
  await input_set('ANTI_BAD' , 'true')
  return reply('antibad turned on')
  }
if ( q == 'off' ) {
   if ( config.ANTI_BAD !== 'true') return reply('already off')
  await input_set('ANTI_BAD' , 'false')
  return reply('antibad turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	


cmd({
    pattern: "autostatus",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_STATUS_READ == 'true') return reply('already on ')
  await input_set('AUTO_STATUS_READ' , 'true')
  return reply('autostatus turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_STATUS_READ !== 'true') return reply('already off')
  await input_set('AUTO_STATUS_READ' , 'false')
  return reply('autostatus turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "autotyping",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_TYPING == 'true') return reply('already on ')
  await input_set('AUTO_TYPING' , 'true')
  return reply('autotyping turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_TYPING !== 'true') return reply('already off')
  await input_set('AUTO_TYPING' , 'false')
  return reply('autotyping turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

cmd({
    pattern: "autorecording",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_RECORDING == 'true') return reply('already on ')
  await input_set('AUTO_RECORDING' , 'true')
  return reply('autorecording turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_RECORDING !== 'true') return reply('already off')
  await input_set('AUTO_RECORDING' , 'false')
  return reply('autorecording turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

cmd({
    pattern: "autoread",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_READ == 'true') return reply('already on ')
  await input_set('AUTO_READ' , 'true')
  return reply('autoread turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_READ !== 'true') return reply('already off')
  await input_set('AUTO_READ' , 'false')
  return reply('autoread turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	


cmd({
    pattern: "cmdread",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.READ_CMD_ONLY == 'true') return reply('already on ')
  await input_set('READ_CMD_ONLY' , 'true')
  return reply('cmdread turned on')
  }
if ( q == 'off' ) {
   if ( config.READ_CMD_ONLY !== 'true') return reply('already off')
  await input_set('READ_CMD_ONLY' , 'false')
  return reply('cmdread turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

cmd({
    pattern: "autoreact",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_REACT == 'true') return reply('already on ')
  await input_set('AUTO_REACT' , 'true')
  return reply('autoreact turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_REACT !== 'true') return reply('already off')
  await input_set('AUTO_REACT' , 'false')
  return reply('autoreact turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	



cmd({
    pattern: "alwaysonline",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.ALWAYS_ONLINE == 'true') return reply('already on ')
  await input_set('ALWAYS_ONLINE' , 'true')
  return reply('alwaysonline turned on')
  }
if ( q == 'off' ) {
   if ( config.ALWAYS_ONLINE !== 'true') return reply('already off')
  await input_set('ALWAYS_ONLINE' , 'false')
  return reply('alwaysonline turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

cmd({
    pattern: "autoblock",
    react: "🗣️",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , config}) => {
try{
if (!isMe) return await reply(BOTOW)	
if (q == 'on') {
  if ( config.AUTO_BLOCK == 'true') return reply('already on ')
  await input_set('AUTO_BLOCK' , 'true')
  return reply('Auto block turned on')
  }
if ( q == 'off' ) {
   if ( config.AUTO_BLOCK !== 'true') return reply('already off')
  await input_set('AUTO_BLOCK' , 'false')
  return reply('Auto block turned off')
}
  
} catch (e) {
reply('*Error !!*')
l(e)
}
})	

	

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
let dat = `🧙‍♂️ 𝐙𝐀𝐍𝐓𝐀 × 𝐌𝐃 𝐎𝐅𝐂 🧙‍♂️

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



