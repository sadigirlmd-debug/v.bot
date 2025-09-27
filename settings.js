const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID: process.env.SESSION_ID === undefined ? 'session' : process.env.SESSION_ID,
OWNER_NUMBER: process.env.OWNER_NUMBER === undefined ? '' : process.env.OWNER_NUMBER,
N_JID: process.env.N_JID=== undefined ? '‌': process.env.N_JID,    
PREFIX: process.env.PREFIX || '.' ,
POSTGRESQL_URL: process.env.POSTGRESQL_URL === undefined ? 'postgres://vajiratech_user:oSIFl2xmSojMZ0rkzdd0g0W6msuVTpNN@dpg-cpd7fjv109ks73e5gtig-a.frankfurt-postgres.render.com/vajiratech' : process.env.POSTGRESQL_URL,   
MAX_SIZE: 500,
FOOTER: process.env.FOOTER || '> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ ꜱᴜʀᴀɴɢᴀ ᴍᴏᴅ-ᴢ' ,    
LOGO: process.env.LOGO || 'https://files.catbox.moe/pwg89y.jpg' ,
MODE: process.env.MODE === undefined ? '' : process.env.MODE,
STATUS_REPLY_MESSAGE: '𝐘𝐎𝐔𝐑 𝐒𝐓𝐀𝐓𝐔𝐒 𝐒𝐄𝐄𝐍 𝐉𝐔𝐒𝐓 𝐍𝐎𝐖 𝐁𝐘 𝐙𝐀𝐍𝐓𝐀-𝐗𝐌𝐃 ✅',    
ALIVE:  process.env.ALIVE  || '> ZANTA-XMD'  ,    
AUTO_VOICE:  process.env.AUTO_VOICE  || true , 
AUTO_REPLY:  process.env.AUTO_REPLY  || true ,
AUTO_STICKER:  process.env.AUTO_STICKER  || true ,   
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO        
};