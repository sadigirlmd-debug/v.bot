const config = require('../settings')
const fg = require('api-dylux')
const fs = require('fs');
const os = require('os')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const cheerio = require('cheerio')
const axios = require("axios")
const vm = require('vm')
const util = require('util')
const {find} = require('raganork-bot')
const fetch = require('node-fetch')
const farrkey = require('xfarr-api')
const ownername = "_VAJIRA RATHNAYAKA_";
const botname = "👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻"
const owner = "https://wa.me/94719199757";
const trueCaller = async (num) => {try { var res = await find(num,'','') } catch { var res = false }; return res;}
const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
const {
    default: makeWASocket,
    makeWALegacySocket,
    extractMessageContent,
    makeInMemoryStore,
    proto,
    prepareWAMessageMedia,
    downloadContentFromMessage,
    getBinaryNodeChild,
    jidDecode,
    areJidsSameUser,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    WAMessageStubType,
    WA_DEFAULT_EPHEMERAL,
} = require('@whiskeysockets/baileys')

//  Bot Prosess Time
  const uptime = process.uptime()
const day = Math.floor(uptime / (24 * 3600)) // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600) // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60) // Calculate minutes
const seconds = Math.floor(uptime % 60) // Calculate seconds




var N_FOUND =''
if(config.LANG === 'SI') N_FOUND = "*මට කිසිවක් සොයාගත නොහැකි විය :(*"
else N_FOUND = "*I couldn't find anything :(*"	
var tmsg5 =''
if(config.LANG === 'SI') tmsg5 = '*කරුණාකර මට ගීතයක නමක් දෙන්න. !*'
else tmsg5 = "*Please give me a song name. !*"
var descg1 = ''
if(config.LANG === 'SI') descg1 = "එය ලබා දී ඇති සංගීතයේ lyrics දෙයි."
else descg1 = "It gives lyrics of given song name."
var cantscg = ''
if(config.LANG === 'SI') cantscg = "*මට මේ ගීතයේ lyrics සොයාගත නොහැක !*"
else cantscg = "*I cant find lyrics of this song !*"
var tmsg =''
if(config.LANG === 'SI') tmsg = 'එය Tech news ලබා දෙයි.'
else tmsg = "It gives Tech news."
var tmsg2 =''
if(config.LANG === 'SI') tmsg2 = 'එය whatsapp beta news ලබා දෙයි.'
else tmsg2 = "It gives whatsapp beta news."
var tmsg3 =''
if(config.LANG === 'SI') tmsg3 = 'එය IOS news ලබා දෙයි.'
else tmsg3 = "It gives IOS news."
var desct =''
if(config.LANG === 'SI') desct = 'එය ඔබ ලබා දුන් දේ සඳහා chatgpt AI මත සොයයි.'
else desct = "It search on chatgpt ai for what you provided."
var needus =''
if(config.LANG === 'SI') needus = '*කරුණාකර මට chatgpt AI හි සෙවීමට වචන ලබා දෙන්න !*'
else needus = "*Please give me words to search on chatgpt ai !*" 
var cantf =''
if(config.LANG === 'SI') cantf = '*Server එක කාර්යබහුලයි. පසුව නැවත උත්සාහ කරන්න. !*'
else cantf = "*Server is busy. Try again later.!*"
var desct =''
if(config.LANG === 'SI') desct = 'එය ලබා දී ඇති ip එක පිළිබඳ විස්තර සපයයි.'
else desct = "It gives details of given ip."
var needus1 =''
if(config.LANG === 'SI') needus1 = '*කරුණාකර මට ip එකක් ලබා දෙන්න !*'
else needus1 = "*Please give me a ip !*" 
var cantf1 =''
if(config.LANG === 'SI') cantf1 = '*මට මෙම ip එක සොයාගත නොහැක !*'
else cantf1 = "*I cant find this ip !*"
var tmsg4 =''
if(config.LANG === 'SI') tmsg4 = '*කරුණාකර මට දුරකථන අංකයක් දෙන්න. !*'
else tmsg4 = "*Please give me phone number !*"
var descg = ''
if(config.LANG === 'SI') descg = "එය ලබා දී ඇති දුරකථන අංකයේ හිමිකරු සොයා ගනී."
else descg = "It find owner of given phone number."


//============================================================================

//============================================================================








cmd({
    pattern: "tiktokstalk",
    react: '🎙️',
    desc: "To search tiktok username",
    category: "search",
    use: '.tiktokstalk <tt user name>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('please give a tiktok username')
const data = await fetchJson('https://api.maher-zubair.tech/stalk/tiktok?q=' + q)
let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗧𝗧 𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘 𝗦𝗘𝗔𝗥𝗖𝗛👨‍💻

*📚 NAME:* ${data.result.name}
*🔖 USERNAME:* ${data.result.username}
*⛓️ FOLLOWERS:* ${data.result.followers}
*✨ FOLLOWING:* ${data.result.following}
*📃 DESCRIPTION:* ${data.result.desc}
*👍 LIKES:* ${data.result.likes}
*🚀 BIO:* ${data.result.bio}`
return await conn.sendMessage(from, { image: { url: data.result.profile} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})

cmd({
    pattern: "igstalk",
    react: '🎙️',
    desc: "To search instagram username",
    category: "search",
    use: '.igstalk <tt user name>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('please give a instagram username')
const data = await fetchJson('https://api.maher-zubair.tech/stalk/instagram?q=' + q)
let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗜𝗚 𝗨𝗦𝗘𝗥𝗡𝗔𝗠𝗘 𝗦𝗘𝗔𝗥𝗖𝗛👨‍💻

*📚 NAME:* ${data.result.username}
*🔖 USERNAME:* ${data.result.fullname}
*⛓️ FOLLOWERS:* ${data.result.followers}
*✨ FOLLOWING:* ${data.result.posts}
*📃 DESCRIPTION:* ${data.result.following}
*🚀 BIO:* ${data.result.bio}`
return await conn.sendMessage(from, { image: { url: data.result.photo_profile} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})

	
cmd({
    pattern: "news",
    react: '📰',
    desc: "news information",
    category: "search",
    use: '.news',
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

if (config.MODE === 'nonbutton') {
	
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'hirunews ' + q , description: 'Hiru News 📰'},
	    {title: "2", rowId: prefix + 'derana ' + q , description: 'Derana News 📰'} ,
            {title: "3", rowId: prefix + 'lankadeepa ' + q , description: 'Lankadeepa News 📰'},
	    {title: "4", rowId: prefix + 'siyatha ' + q , description: 'Siyatha News 📰'} ,
	    {title: "5", rowId: prefix + 'itn ' + q , description: 'Itn News 📰'} ,
	    {title: "6", rowId: prefix + 'newsfirst ' + q , description: 'sirasa News 📰'} ,	
	    {title: "7", rowId: prefix + 'nethnews ' + q , description: 'Neth News 📰'} ,	
	    {title: "8", rowId: prefix + 'silumina ' + q , description: 'Silumina News 📰'} ,	
	    {title: "9", rowId: prefix + 'lankatruth ' + q , description: 'Lankatruth News 📰'} ,	
            {title: "10", rowId: prefix + 'gossiplankanews ' + q , description: 'Gossiplankanews News 📰'} ,	
            
        
	]
    } 
]   
const listMessage = {
caption: `NEWS CENTER`,
image : { url: config.LOGO },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })



} if (config.MODE === 'button') {

let buttons = [
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Hiru News 📰",
                    id: prefix + "hirunews"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Derana News 📰",
                    id: prefix + "derana "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Lankadeepa News 📰",
                    id: prefix + "lankadeepa "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Siyatha News 📰",
                    id: prefix + "siyatha"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Itn News 📰",
                    id: prefix + "itn "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "sirasa News 📰",
                    id: prefix + "newsfirst "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Neth News 📰",
                    id: prefix + "nethnews "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Silumina News 📰",
                    id: prefix + "silumina"
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Lankatruth News 📰",
                    id: prefix + "lankatruth "
                }),
            },
            {
                name: "quick_reply",
                buttonParamsJson: JSON.stringify({
                    display_text: "Gossiplankanews News 📰",
                    id: prefix + "gossiplankanews "
                }),
            }

            ]
            let message = {
                image: config.LOGO,
                header: '',
                footer: config.FOOTER,
                body: dat

            }
            return await conn.sendButtonMessage(from, buttons, m, message)
        

}
	
} catch (e) {
reply('*Error !!*')
l(e)
}
})



	

cmd({
    pattern: "gossiplankanews",
    react: "🔖",
    desc: "To see info of nethnews",
    category: "",
    use: '.gossiplankanews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = `https://www.gossiplankanews.com/?m=1`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);            
const link = $("h2.post-title > a").attr("href")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("h1.post-title").text().trim()
const date = $1("span.post-date.published").text().trim()
const image = $1("div.separator > img").attr("src")
const desc = $1("p").text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗚𝗢𝗦𝗜𝗣𝗟𝗔𝗡𝗞𝗔👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🕛 Date:* ${date}
*📃 Description:* ${desc}`

return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})



cmd({
    pattern: "lankatruth",
    react: "🔖",
    desc: "To see info of nethnews",
    category: "",
    use: '.nethnews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = `https://lankatruth.com/si/?cat=2`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
 const link = $("div > div.elementor-post__title > a").attr("href")
    const response1 = await axios.get(link);  
    const $1 = cheerio.load(response1.data); 
    const title = $1("div > h1").text()
    const date = $1("div.jeg_meta_date > a").text()
    const image = $1("div > div > img").attr("src")
    const desc = $1("div.elementor-element.elementor-element-02b3942.elementor-widget.elementor-widget-theme-post-content > div > p").text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗟𝗔𝗡𝗞𝗔𝗧𝗥𝗨𝗧𝗛👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🕛 Date:* ${date}
*📃 Description:* ${desc}`

return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})




cmd({
    pattern: "silumina",
    react: "🔖",
    desc: "To see info of nethnews",
    category: "",
    use: '.nethnews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = `https://www.silumina.lk/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
    const title = $("div.penci-ercol-66.penci-ercol-order-2.penci-sticky-ct.elementor-column.elementor-col-66.elementor-top-column.elementor-element.elementor-element-202cd2f > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div.pcbg-content > div > div > div.pcbg-heading.item-hover > h3 > a").text().trim()
    const date = $("div.penci-ercol-66.penci-ercol-order-2.penci-sticky-ct.elementor-column.elementor-col-66.elementor-top-column.elementor-element.elementor-element-202cd2f > div > div > div > div > div > div > div > div:nth-child(1) > div > div > div.pcbg-content > div > div > div.grid-post-box-meta.pcbg-meta.item-hover > div > span > time").text()
    const link = $("div.pcbg-heading.item-hover > h3 > a").attr("href")
    const response1 = await axios.get(link);  
    const $1 = cheerio.load(response1.data); 
    const image = $1("div.post-image > a").attr("href")
    const desc = $1("div > #penci-post-entry-inner > p").text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗟𝗨𝗠𝗜𝗡𝗔👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🕛 Date:* ${date}
*📃 Description:* ${desc}`

return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})


cmd({
    pattern: "nethnews",
    react: "🔖",
    desc: "To see info of nethnews",
    category: "",
    use: '.nethnews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = `https://nethnews.lk/`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const title = $('div > div:nth-child(2) > div > div.col-sm-9 > h3 > a').text()            
const link = $('div > div:nth-child(2) > div > div.col-sm-9 > h3 > a').attr('href')
const image = $('div.col-sm-3 > img').attr('src')
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);  
const date = $1('header > span > time').text()    
const desc = $1('div.td-post-content > p').text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗛𝗜𝗥𝗨𝗡𝗘𝗪𝗦👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🕛 Date:* ${date}
*📃 Description:* ${desc}`

return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})


cmd({
    pattern: "derana",
    react: "🔖",
    desc: "To see info of derananews",
    category: "",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   

const data = await fetchJson(`https://vajira-api.vercel.app/news/derana`); 		    

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗗𝗘𝗥𝗔𝗡𝗔 𝗡𝗘𝗪𝗦👨‍💻

*📚 Title:* ${data.result.title}
*🔖 Link:* ${data.result.url}
*🕛 TIME:* ${data.result.date}
*📃 DESCRIPTION:* ${data.result.desc}`
	
return await conn.sendMessage(from, { image: { url: 'https://pomf2.lain.la/f/cup3gmk6.jpg'} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})



	
cmd({
    pattern: "hirunews",
    react: "🔖",
    desc: "To see info of hirunews",
    category: "",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = `https://www.hirunews.lk/local-news.php?pageID=1`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);      
        const title = $("div:nth-child(2) > div.column.middle > div.all-section-tittle").text().trim()
        const link = $("div:nth-child(2) > div.column.left > div > a").attr("href")
        const date = $("div:nth-child(2) > div.column.middle > div.middle-tittle-time").text().trim()
        const img = $("img.middle-sm.img-fluid").attr("src")
        const response1 = await axios.get(link);  
        const $1 = cheerio.load(response1.data);
        const desc = $1("#article-phara2").text().trim()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗛𝗜𝗥𝗨𝗡𝗘𝗪𝗦👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🕛 Date:* ${date}
*📃 Description:* ${desc}`
	
return await conn.sendMessage(from, { image: { url: img} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})

cmd({
    pattern: "lankadeepa",
    react: "🔖",
    desc: "To see info of hirunews",
    category: "",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url1 = `https://www.lankadeepa.lk/latest_news/1`;
const response = await axios.get(url1);  
const $x = cheerio.load(response.data);
const id = $x("div.m-t--10.p-b-40 > div:nth-child(1) > a").attr("href")  
const image1 = $x("div.m-t--10.p-b-40 > div:nth-child(1) > a > img").attr("src")  
const title1 = $x("div:nth-child(1) > div > h5:nth-child(1) > a").text().trim()   
const date = $x("div:nth-child(1) > div > span > span.f1-s-4.cl8.hov-cl10.trans-03.timec").text().trim()                
const response1 = await axios.get(id);  
 const $1 = cheerio.load(response1.data);
const desc1 = $1("div.header.inner-content.p-b-20").find("p").text().trim();

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗟𝗔𝗡𝗞𝗔𝗗𝗘𝗘𝗣𝗔👨‍💻

*📚 Title:* ${title1}
*🔖 Link:* ${id}
*🚀 Date:* ${date}
*📃 DESCRIPTION:* ${desc1}`
	
return await conn.sendMessage(from, { image: { url: image1} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})


cmd({
    pattern: "newsfirst",
    react: "🔖",
    desc: "To see info of hirunews",
    category: "",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = 'https://sinhala.newsfirst.lk/local';
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("div.local_news > div:nth-child(1) > a").attr("href")
const link1 = `https://sinhala.newsfirst.lk/${link}`
const response1 = await axios.get(link1);  
const $1 = cheerio.load(response1.data);   
const title = $1("div.ng-star-inserted > h1").text()
const time = $1("div.author_main > span").text()
const desc = $1("#testId > p:nth-child(2)").text() 
const desc1 = $1("#testId > p:nth-child(3)").text()  
const desc2 = $1("#testId > p:nth-child(4)").text()
const image = $1("#post_img").attr("src").replace(/ /g,'%20')

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗡𝗘𝗪𝗦𝗙𝗜𝗥𝗦𝗧👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link1}
*🚀 Date:* ${time}
*📃 DESCRIPTION:* ${desc}${desc1}${desc2}`
	
return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})


cmd({
    pattern: "siyatha",
    react: "🔖",
    desc: "To see info of hirunews",
    category: "",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = 'https://siyathanews.lk/archives/category/local-news';
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("div.td-module-thumb > a").attr("href")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("div.td_block_wrap.tdb_title.tdi_34.tdb-single-title.td-pb-border-top.td_block_template_1 > div > h1").text()
const date = $1("#tdi_29 > div > div.vc_column.tdi_32.wpb_column.vc_column_container.tdc-column.td-pb-span6 > div > div.vc_row_inner.tdi_37.vc_row.vc_inner.wpb_row.td-pb-row > div > div > div > div.td_block_wrap.tdb_single_date.tdi_40.td-pb-border-top.td_block_template_1.tdb-post-meta > div > time").text()
const desc = $1("div.td_block_wrap.tdb_single_content.tdi_55.td-pb-border-top.td_block_template_1.td-post-content.tagdiv-type > div > p").text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗦𝗜𝗬𝗔𝗧𝗛𝗔 𝗡𝗘𝗪𝗦👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🚀 Date:* ${date}
*📃 DESCRIPTION:* ${desc}`
	
return await conn.sendMessage(from, { image: { url: 'https://pomf2.lain.la/f/08oe8nfw.jpeg'} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})



cmd({
    pattern: "itn",
    react: "🔖",
    desc: "To see info of hirunews",
    category: "",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{   
const url = 'https://www.itnnews.lk/local/';
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
const link = $("div.block-inner > div:nth-child(1) > div > h3 > a").attr("href")
const image = $("div.p-featured > a > img").attr("src")
const response1 = await axios.get(link);  
const $1 = cheerio.load(response1.data);
const title = $1("div.single-header-content.overlay-text > h1").text()
const date = $1("span.meta-el.meta-date > time").text()
const desc = $1("div.e-ct-outer > div > p").text()

let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 𝗜𝗧𝗡 𝗡𝗘𝗪𝗦👨‍💻

*📚 Title:* ${title}
*🔖 Link:* ${link}
*🚀 Date:* ${date}
*📃 DESCRIPTION:* ${desc}`
	
return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})

cmd({
    pattern: "ffstalk",
    react: '🎙️',
    desc: "To see info freefire id",
    category: "search",
    use: '.ffstalk',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
    if (!q) {
      
        
        return reply(`*Provide me Free Fire UID*`);
    }

    const userId = encodeURIComponent(q);
    const apiEndpoint = `https://ffname.vercel.app/?uid=${userId}`;

    
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        if (!data || !data.nickname || !data.region) {
            
            return reply('Failed to generate Free Fire name');
        }

        const generatedName = data.nickname;
        const userRegion = data.region;

        return reply(` Free Fire userid Information\n Name: ${generatedName}\nRegion: ${userRegion}`);
 } catch (e) {
console.error('Error during API request:', e);
        
        return reply('Unexpected error occurred during the request.');	   
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 

reply()
l(e)
}
})       




cmd({
    pattern: "manga",
    react: '🎙️',
    desc: "To see info of manga",
    category: "search",
    use: '.manga',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const { Manga } =require("@shineiichijo/marika")
const manga = new Manga();
if(!q) return reply(`Which manga do you want to search?\nExample ${prefix}manga naruto`)
let srh = await manga.searchManga(q)
    let mang = `🎀 *Title: ${srh.data[0].title}*\n`;
    mang += `📈 *Status: ${srh.data[0].status}*\n`;
    mang += `🌸 *Total Volumes: ${srh.data[0].volumes}*\n`;
    mang += `🎗 *Total Chapters: ${srh.data[0].chapters}*\n`;
    mang += `🧧 *Genres:*\n`;
    for (let i = 0; i < srh.data[0].genres.length; i++) {
      mang += `\t\t\t\t\t\t\t\t*${srh.data[0].genres[i].name}*\n`;
    }
    mang += `✨ *Published on: ${srh.data[0].published.from}*\n`;
    mang += `🌟 *Score: ${srh.data[0].scored}*\n`;
    mang += `🎐 *Popularity: ${srh.data[0].popularity}*\n`;
    mang += `🎏 *Favorites: ${srh.data[0].favorites}*\n`;
    mang += `✍ *Authors:*\n`;
    for (let i = 0; i < srh.data[0].authors.length; i++) {
      mang += `\t\t\t\t\t\t\t\t\t*${srh.data[0].authors[i].name}* *(${srh.data[0].authors[0].type})*\n`;
    }
    mang += `\n🌐 *URL: ${srh.data[0].url}*\n\n`;
    if (srh.data[0].background !== null)
      mang += `🎆 *Background:* ${srh.data[0].background}`;
    mang += `❄️ *Description:* ${srh.data[0].synopsis.replace(
      /\[Written by MAL Rewrite]/g,
      ""
    )}`;
conn.sendMessage(from,{image:{url:srh.data[0].images.jpg.large_image_url},caption:mang},{quoted:mek})   
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       


cmd({
    pattern: "weather",
    react: '🎙️',
    desc: "To see info of weather",
    category: "search",
    use: '.weather',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (!q) return reply('What location?')
let city = q.split(' ')[0];
            let wdata = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
            );
            let textw = ""
            textw += `*🗺️Weather of  ${city}*\n\n`
            textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
            textw += `*Description:-* ${wdata.data.weather[0].description}\n`
            textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
            textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
            textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
            textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
            textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
            textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
            textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
            textw += `*Country:-* ${wdata.data.sys.country}\n`

           conn.sendMessage(
                from, {
                    text: textw,
                }, {
                    quoted: mek,
                }
           )
              
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       
	


cmd({
    pattern: "cricketscore",
    alias: ["score"],
    react: '🎙️',
    desc: "To see info of cricket",
    category: "search",
    use: '.cricketscore',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) {
    
    return mek.reply(`*Provide a match ID for cricket score.*\nExample: !cricketscore 12345`);
  }

  const matchId = encodeURIComponent(q);

  
    const apiUrl = `https://cricket-olive.vercel.app/score?id=${matchId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      
      return mek.reply(`Invalid response from the cricket score API. Status code: ${response.status}`);
    }

    const result = await response.json();

    let formattedResult = `╭══════════════•∞•══╮\n`;
    formattedResult += `│⿻   *👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻*\n`;
    formattedResult += `│⿻   *LIVE MATCH INFO* ✨\n`;
    formattedResult += `│⿻\n`;

    if (result.update && result.update.toLowerCase() !== "data not found") {
      formattedResult += `│⿻   *${result.title}*\n`;
      formattedResult += `│⿻   *${result.update}*\n`;
      formattedResult += `│⿻ \n`;
    } else {
      await m.reply(`*Update:* Data not found for the specified match ID.`);
      
      return
    }

    if (result.livescore && result.livescore.toLowerCase() !== "data not found") {
      formattedResult += `│⿻   *Live Score:* ${result.livescore}\n`;
      formattedResult += `│⿻   *Run Rate:* ${result.runrate}\n`;
      formattedResult += `│⿻\n`;
      formattedResult += `│⿻   *Batter 1:* ${result.batterone}\n`;
      formattedResult += `│⿻   *${result.batsmanonerun} (${result.batsmanoneball})* SR: ${result.batsmanonesr} ${result.batsmanone === result.batterone ? "" : ""}\n`;
      formattedResult += `│⿻\n`;
      formattedResult += `│⿻   *Batter 2:* ${result.battertwo}\n`;
      formattedResult += `│⿻   *${result.batsmantworun} (${result.batsmantwoball})* SR: ${result.batsmantwosr} ${result.battertwo === result.battertwo ? "" : ""}\n`;
      formattedResult += `│⿻\n`;
      formattedResult += `│⿻   *Bowler 1:* ${result.bowlerone}\n`;
      formattedResult += `│⿻   *${result.bowleroneover} overs, ${result.bowleronerun}/${result.bowleronewickers}, Econ:* ${result.bowleroneeconomy} ${result.bowlerone === result.bowlerone ? "" : ""}\n`;
      formattedResult += `│⿻\n`;
      formattedResult += `│⿻    *Bowler 2:* ${result.bowlertwo}\n`;
      formattedResult += `│⿻   *${result.bowlertwoover} overs, ${result.bowlertworun}/${result.bowlertwowickers}, Econ:* ${result.bowlertwoeconomy} ${result.bowlertwo === result.bowlertwo ? "" : ""}\n`;
    }

    formattedResult += `╰══•∞•═══════════════╯ `;

    await m.reply(formattedResult);
    
  } catch (error) {
    console.error(error);
    
    return mek.reply(`An error occurred while processing the cricket score request. ${error.message}`);
   
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
reply()
l(e)
}
})       
	

cmd({
    pattern: "gitstalk",
    react: '🎙️',
    desc: "To search github info",
    category: "gitstalk",
    use: '.xnxxsearch <xnxx name>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        	if (!args[0]) return m.reply('Mention a GitHub username to stalk.');

  const username = args[0];


    // Fetch GitHub user data using Axios
    const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
    const userData = githubResponse.data;

    if (githubResponse.status !== 200) {
      return mek.reply(`❌ GitHub user not found.`);
    }

    // Construct the response message
    let responseMessage = `🌟 *GitHub Profile - @${userData.login}*\n\n`;
    responseMessage += `  ◦  *Name*: ${userData.name || 'N/A'}\n`;
    responseMessage += `  ◦  *Username*: @${userData.login}\n`;
    responseMessage += `  ◦  *Bio*: ${userData.bio || 'N/A'}\n`;
    responseMessage += `  ◦  *ID*: ${userData.id}\n`;
    responseMessage += `  ◦  *Node ID*: ${userData.node_id}\n`;
    responseMessage += `  ◦  *Profile URL*: ${userData.avatar_url}\n`;
    responseMessage += `  ◦  *GitHub URL*: ${userData.html_url}\n`;
    responseMessage += `  ◦  *Type*: ${userData.type}\n`;
    responseMessage += `  ◦  *Admin*: ${userData.site_admin ? 'Yes' : 'No'}\n`;
    responseMessage += `  ◦  *Company*: ${userData.company || 'N/A'}\n`;
    responseMessage += `  ◦  *Blog*: ${userData.blog || 'N/A'}\n`;
    responseMessage += `  ◦  *Location*: ${userData.location || 'N/A'}\n`;
    responseMessage += `  ◦  *Email*: ${userData.email || 'N/A'}\n`;
    responseMessage += `  ◦  *Public Repositories*: ${userData.public_repos}\n`;
    responseMessage += `  ◦  *Public Gists*: ${userData.public_gists}\n`;
    responseMessage += `  ◦  *Followers*: ${userData.followers}\n`;
    responseMessage += `  ◦  *Following*: ${userData.following}\n`;
    responseMessage += `  ◦  *Created At*: ${userData.created_at}\n`;
    responseMessage += `  ◦  *Updated At*: ${userData.updated_at}\n`;

   
 const githubReposData = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=stargazers_count&direction=desc`);
    const reposData = await githubReposData.json();

    if (reposData.length > 0) {
      const topRepos = reposData.slice(0, 5); // Display the top 5 starred repositories

      const reposList = topRepos.map(repo => {
        return `  ◦  *Repository*: [${repo.name}](${repo.html_url})
  ◦  *Description*: ${repo.description || 'N/A'}
  ◦  *Stars*: ${repo.stargazers_count}
  ◦  *Forks*: ${repo.forks}`;
      })

      const reposCaption = `📚 *Top Starred Repositories*\n\n${reposList.join('\n\n')}`;
      responseMessage += `\n\n${reposCaption}`;
    } else {
      responseMessage += `\n\nNo public repositories found.`;
    }

    // Send the message with the updated caption and user's avatar
    await conn.sendMessage(mek.chat, { image: { url: userData.avatar_url }, caption: responseMessage }, { quoted: mek });

    // Add a success reaction message
    const successReactionMessage = {
      react: {
        text: "✔",
        key: m.key
      }
    }
    await conn.sendMessage(m.chat, successReactionMessage);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    await conn.sendMessage(m.chat, 'An error occurred while fetching GitHub data.', { quoted: mek });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
reply()
l(e)
}
})       


cmd({
    pattern: "infobot",
    react: '🎙️',
    desc: "To see info of bot",
    category: "search",
    use: '.infobot',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const tod = `
╭━──━─◈─━─━╮
│🔖 *Bot Name* : ${botname}
│🔖 *Owner Name* : ${ownername}
│🔖 *Owner Number* : ${owner}
│🔖 *Prefix* : ${prefix}
│🔖 *Runtime* : _*${hours}h ${minutes}m ${seconds}s*_
╰━━─━─◈─━─━╯`

    const pollOptions = ['.menu', '.ping']

    conn.sendPoll(mek.chat, tod, pollOptions)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       




cmd({
    pattern: "nofind",
    react: '🎙️',
    desc: "To see same to the number",
    category: "search",
    use: '.nofind',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        let regex = /x/g;
    if (!q) throw 'Give a number to search';
    if (!q.match(regex)) throw `*Example: ${prefix + command} 919142294xxx`;
    let random = q.match(regex).length, total = Math.pow(10, random), array = [];
    for (let i = 0; i < total; i++) {
        let list = [...i.toString().padStart(random, '0')];
        let result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net';
        if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) {
            let info = await conn.fetchStatus(result).catch(_ => {});
            array.push({ exists: true, jid: result, ...info });
        } else {
            array.push({ exists: false, jid: result });
        }
    }
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       

	    
cmd({
    pattern: "xnxxsearch",
    react: '🎙️',
    desc: "To search xnxx video",
    category: "search",
    use: '.xnxxsearch <xnxx name>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
        	if (!q) return mek.reply(`Enter Query`)
	const fg = require('api-dylux')
	let res = await fg.xnxxSearch(q)
            let ff = res.result.map((v, i) => `${i + 1}┃ *Title* : ${v.title}\n*Link:* ${v.link}\n`).join('\n') 
              if (res.status) mek.reply(ff)
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       


cmd({
    pattern: "google",
    react: '🎙️',
    desc: "To search infomations",
    category: "search",
    use: '.google <search name>',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
          if (!q) throw `Example : ${prefix + command} what is a bot`
  let google = require('google-it');
  google({ 'query': q }).then(res => {
    let teks = `Google Search From : ${text}\n\n`
    for (let g of res) {
      teks += `⭔ *Title* : ${g.title}\n`;
      teks += `⭔ *Description* : ${g.snippet}\n`
      teks += `⭔ *Link* : ${g.link}\n\n────────────────────────\n\n`
    }
    mek.reply(teks)
  })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       
	

 
    
cmd({
    pattern: "lyrics",
    category: "search",
    react: "🎬",
    desc: "Search lyrics",
    use: ".lyrics song name",
    filename: __filename   
},
    async (conn, mek, m, { reply, isDev, from, l, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

        const url = `https://www.lyrihub.lk/?s=${q}`;
const response = await axios.get(url);  
const $ = cheerio.load(response.data);
   
    const results = [];
    $("article").each((c, d) => {

        results.push({
          
         title: $(d).find("h2.entry-title > a").text(),
       link: $(d).find("a").attr("href")
        
                
        })
    })

	

		
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )		
	

var srh = [];  		
	
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1.1,	
description: results[i].title,
rowId: prefix + 'ly ' + results[i].link
});

	
}		
const sections = [
	{
title: "*ＬＹＲＩＣＳ ＳＥＡＲＣＨ*\n",
rows: srh
}
]

    const listMessage = {
caption: `🎬 VAJIRA MD LYRICS 🎬`,
image : { url: config.LOGO },	    
footer: 'LYRICS SEARCH BY VAJIRA MD',
title: 'Result from Lyrics. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "ly",
    react: '🎙️',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, prefix, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('please give a tiktok username')
const response = await axios.get(q);  
const $ = cheerio.load(response.data);

const title = $("div.nameofsong > h1").text().trim()
const etitle = $("div.titleofsong > h2").text().trim()
const artist = $("div.artistofsong").text().trim()
const image = $("img.img-fluid").attr("src").trim()
const lyrics = $("div.lyrics-content").text().trim()
	
let info = `👨‍💻 𝗩𝗔𝗝𝗜𝗥𝗔 𝗟𝗬𝗥𝗜𝗖𝗦 𝗦𝗘𝗔𝗥𝗖𝗛👨‍💻

*📚 TITLE:* ${title}|${etitle}
*🔖 ARTIST:* ${artist}
*⛓️ LYRICS:* ${lyrics}`
return await conn.sendMessage(from, { image: { url: image} , caption: info } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }})
} catch (e) {
l(e)
}
})


cmd({
    pattern: "itunes",
    alias: ["lyric"],
    react: '🎙️',
    desc: descg1,
    category: "search",
    use: '.itunes <song name>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('Please provide a song name')
    let result = await fetch(`https://api.popcat.xyz/itunes?q=` +q)
    if (!result.ok) {
      throw new Error(`API request failed with status ${result.status}`)
    }
    let json = await result.json()
    console.log('JSON response:', json)
    let songInfo = 
    `*Song Information:*\n
     • *Name:* ${json.name}\n
     • *Artist:* ${json.artist}\n
     • *Album:* ${json.album}\n
     • *Release Date:* ${json.release_date}\n
     • *Price:* ${json.price}\n
     • *Length:* ${json.length}\n
     • *Genre:* ${json.genre}\n
     • *URL:* ${json.url}`
    // Check if thumbnail is present, then send it with songInfo as caption
    if (json.thumbnail) {
      await conn.sendMessage(mek.chat, {image: {url:json.thumbnail}, caption: songInfo}, {quoted: mek})
    } 
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       



      
cmd({
    pattern: "true",
    alias: ["truecaller"],
    react: '💯',
    desc: descg,
    category: "search",
    use: '.true <phone number>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    if (isBan) return reply(mess.banned);
        if (isBanChat) return reply(mess.bangc);
    if (!q) {
      // Reply when no phone number is provided
    return  reply ('Please provide a phone number.');
    }

    const installationId = 'a1i0h--loh5IMkhktEDXmgSLUQDHGrXDUbWqFoWEgiItBNgppvYin-rG97CRLpuh';
    const apiUrl = `https://sid-bhai.vercel.app/api/truecaller?phone=${encodeURIComponent(text)}&id=${installationId}`;

    let response = await axios.get(apiUrl);
    console.log(response);
    let json = response.data;

    const { name, alternateName, addresses, email, countryDetails } = json;

    let info = `╭––『 *Phone Detail* 』\n`;
    info += `┆ ⚝ *Name:* ${name}\n`;

    if (addresses && addresses.length > 0) {
      info += `┆ ⚝ *Address:* ${addresses[0].city}, ${addresses[0].countryCode}\n`;
      info += `┆ ⚝ *Time Zone:* ${addresses[0].timeZone}\n`;
      info += `┆ ⚝ *Pin Code* ${addresses[0].zipCode}\n`;
      info += `┆ ⚝ *Street* ${addresses[0].street}\n`;
    }

    info += `┆ ⚝ *Email:* ${email}\n`;
    info += `╰–––––––––––––––༓\n`;

    if (countryDetails) {
      info += `╭––『 *countryDetails* 』\n`;
      info += `┆ ⚝ *Name:* ${countryDetails.name}\n`;
      info += `┆ ⚝ *Native:* ${countryDetails.native}\n`;
      info += `┆ ⚝ *Phone Code:* +${countryDetails.phone[0]}\n`;
      info += `┆ ⚝ *Continent:* ${countryDetails.continent}\n`;
      info += `┆ ⚝ *Capital:* ${countryDetails.capital}\n`;
      info += `┆ ⚝ *Currency:* ${countryDetails.currency.join(', ')}\n`;
      info += `┆ ⚝ *Languages:* ${countryDetails.languages.join(', ')}\n`;
      info += `┆ ⚝ *Flag:* ${countryDetails.flag}\n`;
      info += `╰–––––––––––––––༓`;
    }

    await conn.sendMessage(from, {
      q: info,
    }, {
      quoted: mek,
    })

  } catch (error) {
reply('*Error !!*')
l(e)
}
})


cmd({
    pattern: "ip",
    alias: ["ipstalk","sip","searchip","ip-locator"],
    react: '🌐',
    desc: desct,
    category: "search",
    use: '.ipstalk 112.134.193.130',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
if(!q.includes('.')) return reply(needus)
const IP = "IP :"
const ST = "STATUS :"
const CONTINENT = "CONTINENT :"
const COUNTRY = "COUNTRY :"
const COUNTRYCODE = "COUNTRYCODE :"
const REGIONNAME = "REGIONNAME :"
const CITY = "CITY :"
const ZIP = "ZIP :"
const CURRENCY = "CURRENCY :"
const ISP = "ISP :"
const MOBILE = "MOBILE :"
const PROXY = "PROXY :"
const r = await fetchJson('https://api.techniknews.net/ipgeo/' + q)
const wea = `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

    *IP STALKER*
    
` +
'*🔴 ' + IP +'* ```' + q + '```\n' +
'*✅' + ST +'* ```' + r.status+ '```\n' +
    '*🌐' + CONTINENT +'* ```' + r.continent+ '```\n' +
    '*🗺' + COUNTRY +'* ```' + r.country+ '```\n' +
    '*🔢' + COUNTRYCODE +'* ```' + r.countryCode+ '```\n' +
    '*🌍' + REGIONNAME +'* ```' + r.regionName+ '```\n' +
    '*🚩' + CITY +'* ```' + r.city+ '```\n' +
    '*🏛' + ZIP +'* ```' + r.zip+ '```\n' +
    '*💸' + CURRENCY +'* ```' + r.currency+ '```\n' +
    '*📡' + ISP +'* ```' + r.isp+ '```\n' +
    '*🛡' + PROXY +'* ```' + r.proxy+ '```\n' +
    '*📱' + MOBILE +'* ```' + r.mobile+ '```\n\n'
    + "└───────────◉"
await conn.sendMessage(from , { text: wea}, { quoted: mek } )
} catch (e) {
reply(cantf)
l(e)
}
})


cmd({
    pattern: "pemoji",
    react: "🔖",
    desc: "imoji to image convert",
    category: "search",
    use: '.pemoji',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
   if (!q) return reply(`*👸💬 Please Give me a imoji*\nExample - .${command}👸`)
    await conn.sendMessage(from, { react: { text: `✨`, key: mek.key }})
await conn.sendMessage(mek.chat, { image: { url:`https://api.vihangayt.me/search/semoji?q=${encodeURIComponent(q)} `},  caption: `${global.cap}`}, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       



                            
//=============================BARD COMMAND========================================

cmd({
    pattern: "bard",
    alias: ["bardai","gbard","googlebard","googleai","ai2"],
    react: '👾',
    desc: desct,
    category: "search",
    use: '.bard ha',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(needus)
let apilist = await fetchJson('https://gist.githubusercontent.com/vihangayt0/7dbb65f6adfe21538f7febd13982569a/raw/apilis.json')
let list = apilist.users
let apikey = list[Math.floor(Math.random() * list.length)]
const dataget = await fetchJson(apilist.xz +'api/bard?text='+ q +'&apikey='+ apikey)
return await reply(dataget.content)
} catch (e) {
try{
    const dataget = await fetchJson('https://api.akuari.my.id/ai/gbard?chat=' + q)
return await reply(dataget.respon)
} catch (e) {
reply(cantf)
l(e)
}
}
})


cmd({
    pattern: "bingimgai",
    alias: ["midj"],
    react: '📷',
    desc: "Generate Images using Bing AI",
    category: "search",
    use: '.bingimgai <prompt>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return await  reply("*Give me a prompt to generate images*")
  let response = await fetchJson('https://api.yanzbotz.my.id/api/text2img/bing-image?prompt='+q+'&apiKey=vihangayt0')
        if (response && response.result && Array.isArray(response.result) && response.result.length > 0) {
            for (let i = 0; i < response.result.length; i++) {
                await conn.sendMessage(from, { image: { url: response.result[i] }, caption: config.FOOTER }, { quoted: mek });
            }
        } else {
            reply('No images found for the given prompt');
        }
} catch (e) {
reply('Unable to generate images to the given prompt')
l(e)
}
})

cmd({
    pattern: "blackbox",
    alias: ["bb"],
    react: '👾',
    desc: "Blackbox ai chat",
    category: "search",
    use: '.blackbox hi',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply('Need a keyword')
var res = (await fetchJson('https://api.vihangayt.asia/ai/blackbox?q=' + q)).result

return await reply(res)
} catch (e) {
reply('Unable to generate')
l(e)
}
})

//============================================================================



cmd({
    pattern: "imdb",
    react: "🍎",
    desc: "To check imdb",
    category: "search",
    use: '.imdb',
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply(`_Name a Series or movie`)

            let fids = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${q}&plot=full`)
            let imdbt = ""
            console.log(fids.data)
            imdbt += "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` IMDB SEARCH```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n"
            imdbt += "🎬Title      : " + fids.data.Title + "\n"
            imdbt += "📅Year       : " + fids.data.Year + "\n"
            imdbt += "⭐Rated      : " + fids.data.Rated + "\n"
            imdbt += "📆Released   : " + fids.data.Released + "\n"
            imdbt += "⏳Runtime    : " + fids.data.Runtime + "\n"
            imdbt += "🌀Genre      : " + fids.data.Genre + "\n"
            imdbt += "👨🏻‍💻Director   : " + fids.data.Director + "\n"
            imdbt += "✍Writer     : " + fids.data.Writer + "\n"
            imdbt += "👨Actors     : " + fids.data.Actors + "\n"
            imdbt += "📃Plot       : " + fids.data.Plot + "\n"
            imdbt += "🌐Language   : " + fids.data.Language + "\n"
            imdbt += "🌍Country    : " + fids.data.Country + "\n"
            imdbt += "🎖️Awards     : " + fids.data.Awards + "\n"
            imdbt += "📦BoxOffice  : " + fids.data.BoxOffice + "\n"
            imdbt += "🏙️Production : " + fids.data.Production + "\n"
            imdbt += "🌟imdbRating : " + fids.data.imdbRating + "\n"
            imdbt += "✅imdbVotes  : " + fids.data.imdbVotes + ""
           conn.sendMessage(m.chat, {
                image: {
                    url: fids.data.Poster,
                },
                caption: imdbt,
            }, {
                quoted: mek,
            })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
l(e)
}
})

//============================================================================
