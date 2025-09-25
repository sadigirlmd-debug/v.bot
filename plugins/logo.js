const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const { Maker } = require('imagemaker.js')
var Photooxy = require('@sl-code-lords/photooxy')
var photooxy = new Photooxy()
const fileType = require("file-type");
const fs = require('fs');
var TextPro = require('@sl-code-lords/text-pro-me')
var text_pro = new TextPro()
const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');

      







var imgmsg =''
if(config.LANG === 'SI') imgmsg = "```කරුණාකර නමක් දෙන්න !```"
else imgmsg = "```Please give me a name !```"
var imgmsg2 =''
if(config.LANG === 'SI') imgmsg2 = "*උදා: .banner vajira+rathnayaka*"
else imgmsg2 = "*Ex: .banner vajira+rathnayaka*"
var imgmsg3 =''
if(config.LANG === 'SI') imgmsg3 = "*උදා: .banner2 vajira+rathnayaka*"
else imgmsg3 = "*Ex: .banner2 vajira+rathnayaka*"
var imgmsg4 =''
if(config.LANG === 'SI') imgmsg4 = "*උදා: .banner3 vajira+rathnayaka*"
else imgmsg4 = "*Ex: .banner3 vajira+rathnayaka*"
var imgmsg5 =''
if(config.LANG === 'SI') imgmsg5 = "*උදා: .banner3 vajira+rathnayaka*"
else imgmsg5 = "*Ex: .banner3 vajira+rathnayaka*"
var imgmsg6 =''
if(config.LANG === 'SI') imgmsg6 = "*උදා: .banner3 vajira+rathnayaka*"
else imgmsg6 = "*Ex: .banner3 vajira+rathnayaka*"
var desc =''
if(config.LANG === 'SI') desc = "එය වචන 1කින් ephoto360 logos නිර්මාණය කරයි.."
else desc = "It creates ephoto360 logos using 1 word.."
var desc2 =''
if(config.LANG === 'SI') desc2 = "එය channel banners නිර්මාණය කරයි.."
else desc2 = "It creates channel banners.."
var errt =''
if(config.LANG === 'SI') errt = "*මට මෙම ලාංඡනය නිර්මාණය කළ නොහැක. :(*"
else errt = "*I cant create this logo :(*"
var imgmsg7 =''
if(config.LANG === 'SI') imgmsg7 = "*උදා: .photooxy2 Vajira+rathnayaka*"
else imgmsg7 = "*Ex: .photooxy2 Vajira+rathnayaka*"
var desc1 =''
if(config.LANG === 'SI') desc1 = "එය වචන 1කින් photooxy logos නිර්මාණය කරයි.."
else desc1 = "It creates photooxy logos using 1 word.."
var desc3 =''
if(config.LANG === 'SI') desc3 = "එය වචන 2කින් photooxy logos නිර්මාණය කරයි.."
else desc3 = "It creates photooxy logos using 2 word.."
var imgmsgeew =''
if(config.LANG === 'SI') imgmsgeew = '*ඡායාරූපයකට mention දෙන්න !*'
else imgmsgeew = "*Reply to a photo !*"


var imgmsg8 =''
if(config.LANG === 'SI') imgmsg8 = "*උදා: .textpro2 vajira+rathnayaka*"
else imgmsg8 = "*Ex: .textpro2 vajira+rathnayaka*"

var desc4 =''
if(config.LANG === 'SI') desc4 = "එය වචන 1කින් textpro logos නිර්මාණය කරයි.."
else desc4 = "It creates textpro logos using 1 word.."

var desc5 =''
if(config.LANG === 'SI') desc5 = "එය වචන 2කින් textpro logos නිර්මාණය කරයි.."
else desc5 = "It creates textpro logos using 2 word.."

var errt =''
if(config.LANG === 'SI') errt = "*මට මෙම ලාංඡනය නිර්මාණය කළ නොහැක. :(*"
else errt = "*I cant create this logo :(*"
//============================================================================

cmd({
    pattern: "textpro1",
    react: '🎡',
    alias: ["logo","textpro"],
    desc: desc4,
    category: "logo",
    use: '.textpro1 vihanga yt',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
const results = await text_pro.get_url_list()
let data = results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < 9; i++) {
if(!data[i].double_text && !data[i].need_image){
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'dlogo ' + q + '+' + data[i].url
});
}
}
const sections = [{
title: "Result from textpro. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *TEXTPRO LOGO 01*

*🤹 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from textpro. 📲',
buttonText: 'Select Logo 🎡',
sections
}
await conn.replyList(from, listMessage,{quoted: mek})

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "textpro2",
    react: '🎡',
    alias: ["logo2"],
    desc: desc5,
    category: "logo",
    use: '.textpro2 vihanga+ashinshana',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q.includes('+')) return await reply(imgmsg8)
const results = await text_pro.get_url_list()
let data = results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < 9; i++) {
if(data[i].double_text && !data[i].need_image){
srh.push({
title: i + 1,
description: data[i].title,
rowId: prefix + 'dlogo2 ' + q + '+' + data[i].url
});
}
}
const sections = [{
title: "Result from textpro. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *TEXTPRO LOGO 02*

*🤹 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from textpro. 📲',
buttonText: 'Select Logo 🎡',
sections
}
await conn.replyList(from, listMessage,{quoted: mek})

} catch (e) {
reply(errt)
l(e)
}
})

cmd({
    pattern: "dlogo",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    let [name,link] = q.split('+')
    var image1 = await text_pro.one_text_create(
        link,
        name
        )
    var img1_buf = await text_pro.image_to_buffer(image1.url)
    await conn.sendMessage(from, { image: img1_buf, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "dlogo2",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    let [name,name2,link] = q.split('+')
    var image2 = await text_pro.double_text_create(
        link,
        name,
        name2
        )
    var img2_buf = await text_pro.image_to_buffer(image2.url)
    await conn.sendMessage(from, { image: img2_buf, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})

//============================================================================
cmd({
    pattern: "ephoto360",
    react: '🎭',
    alias: ["logo6","ephoto360","ephoto"],
    desc: desc,
    category: "logo",
    use: '.ephoto360 VajiraTech',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
const sections = [
    {
title: "Result from ephoto360. 📲",
rows: [
{title: '1',rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html', description: 'Blackpink'},
//{title: "1", rowId: prefix + 'menu' , description: 'COMMANDS MENU'},
{title: '2', rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html', description: 'Dragon ball'},
{title: '3', rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html', description: 'Naruto shippuden'},
{title: '4', rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-sunset-light-text-effects-online-807.html', description: 'Sunset light'},
{
title: '5',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/beautiful-3d-foil-balloon-effects-for-holidays-and-birthday-803.html',
description: 'beautiful 3d foil baloon'        
},{
title: '6',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html',
description: 'Digital glitch'
},{
title: '7',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-text-on-wet-glass-online-589.html',
description: 'Write text on wet glass'
},{
title: '8',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-glossy-silver-3d-text-effect-online-802.html',
description: 'Glossy silver 3D text effect'
},{
title: '9',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html',
description: 'Colorful neon light text effect'
},{
title: '10',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-thor-logo-style-text-effects-online-for-free-796.html',
description: 'Thor logo style'
},{
title: '11',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-typography-text-effect-on-pavement-online-774.html',
description: 'Typography text effect on pavement'
},{
title: '12',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html',
description: 'Impressive neon Glitch text effect'
},{
title: '13',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/handwritten-text-on-foggy-glass-online-680.html',
description: 'Handwritten text on foggy glass'
},{
title: '14',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html',
description: 'Impressive decorative 3D metal text'
},{
title: '15',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-frozen-christmas-text-effect-online-792.html',
description: 'Frozen Christmas text'
},{
title: '16',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html',
description: 'Hacker avatar'
},{
title: '17',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html',
description: '3D colorful paint text'
},{
title: '18',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-greeting-video-card-for-international-women-s-day-on-march-8-784.html',
description: 'Women\'s Day'
},{
title: '19',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html',
description: 'Pixel Glitch'
},{
title: '20',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html',
description: 'Americal flag'
},{
title: '21',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html',
description: 'Erasing'
},{
title: '22',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-multicolored-signature-attachment-arrow-effect-714.html',
description: 'Multicolored signature attachment arrow'
},{
title: '23',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/online-blackpink-style-logo-maker-effect-711.html',
description: 'Multicolored signature attachment arrow'
},{
title: '24',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-blackpink-neon-logo-text-effect-online-710.html',
description: 'Black neon'
},{
title: '25',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-star-wars-character-mascot-logo-online-707.html',
description: 'Star wars character mascot'
},{
title: '26',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-glowing-text-effects-online-706.html',
description: 'Glowing text'
},{
title: '27',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-funny-animations-of-a-traveling-bear-701.html',
description: 'Funny animations of a traveling bear'
},{
title: '28',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-text-effect-on-the-beach-online-688.html',
description: 'The beach online'
},{
title: '29',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-cute-girl-gamer-mascot-logo-online-687.html',
description: 'Cute girl gamer mascot'
},{
title: '30',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/3d-underwater-text-effect-online-682.html',
description: '3D underwater'
},{
title: '31',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/free-bear-logo-maker-online-673.html',
description: 'Bear logo'
},{
title: '32',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-football-team-logo-online-free-671.html',
description: 'Football team logo'
},{
title: '33',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-cartoon-style-graffiti-text-effect-online-668.html',
description: 'Cartoon style graffiti'
},{
title: '34',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html',
description: 'Multicolor 3D paper'
},{
title: '35',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-watercolor-text-effect-online-655.html',
description: 'Watercolor text'
},{
title: '36',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html',
description: 'Light text effect futuristic technology'
},{
title: '37',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-text-effect-clouds-in-the-sky-online-619.html',
description: 'Write text effect clouds in the sky'
},{
title: '38',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/pubg-logo-maker-cute-character-online-617.html',
description: 'PUBG logo maker cute character'
},{
title: '39',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/pubg-mascot-logo-maker-for-an-esports-team-612.html',
description: 'PUBG Mascot Logo Maker for an eSports'
},{
title: '40',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-blackpink-logo-online-free-607.html',
description: 'Black Pink 03'
},{
title: '41',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-funny-warning-sign-602.html',
description: 'Funny warning sign'
},{
title: '42',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-3d-gradient-text-effect-online-600.html',
description: '3D gradient text'
},{
title: '43',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/write-in-sand-summer-beach-online-free-595.html',
description: 'Write in sand summer beach'
},{
title: '44',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-a-luxury-gold-text-effect-online-594.html',
description: 'Luxury gold text'
},{
title: '45',
rowId: prefix + 'dlogo6 ' + q + '+' + 'https://en.ephoto360.com/create-multicolored-neon-light-signatures-591.html',
description: 'Multicolored neon light signatures'
},

]
    }
]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *EPHOTO360 LOGO*

*🤹 Entered Name:* ${q}`,
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


cmd({
    pattern: "banner",
    alias: ["ytbanner","cover","channelbanner"],
    desc: desc2,
    category: "logo",
    use: '.banner VajiraTech+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg2)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-overwatch-2-banner-for-the-online-youtube-channel-782.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner2",
    alias: ["ytbanner2","cover2","channelbanner2"],
    desc: desc2,
    category: "logo",
    use: '.banner2 VajiraTech+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg3)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/make-your-own-free-fire-youtube-banner-online-free-562.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner3",
    alias: ["ytbanner3","cover3","channelbanner3"],
    desc: desc2,
    category: "logo",
    use: '.banner3 VajiraTech+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg4)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-a-youtube-banner-game-of-pubg-cool-402.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner4",
    alias: ["ytbanner4","cover4","channelbanner4"],
    desc: desc2,
    category: "logo",
    use: '.banner4 VajiraTech+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg5)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-call-of-duty-warzone-youtube-banner-online-548.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "banner5",
    alias: ["ytbanner5","cover5","channelbanner5"],
    desc: desc2,
    category: "logo",
    use: '.banner5 VajiraTech+yt',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    if (!q.includes('+')) return await reply(imgmsg6)
    let [name,name2] = q.split('+')
    new Maker().Ephoto360('https://en.ephoto360.com/create-banner-youtube-game-apex-legend-online-406.html', [`${name}`,`${name2}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(res.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
    })
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "dlogo6",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})

let [text,url] = q.split('+')
const data = await fetchJson(`https://manul-official-tech-api-site.vercel.app/ephoto-effect?apikey=Manul-Official&url=${url}&texk=${text}`)
    
 // (link, [`${name}`]).then(async res => {
        await conn.sendMessage(from, { image: await getBuffer(data.data.imageUrl), caption: config.FOOTER }, { quoted: mek })
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
 //   })

} catch (e) {
    reply(errt)
  l(e)
}
})




cmd({
    pattern: "photooxy1",
    react: '💫',
    alias: ["logo3","photooxy"],
    desc: desc1,
    category: "logo",
    use: '.photooxy1 vihanga yt',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return await reply(imgmsg)
const results = await photooxy.get_urls_list()
let data = results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
if(data[i].text === 1 && !data[i].images){
srh.push({
title: i + 1,
rowId: prefix + 'dlogo3 ' + q + '+' + data[i].url, description: data[i].title
});
}
}
const sections = [{
title: "Result from photooxy. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *PHOTOOXY LOGO 01*

*🤹 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from photooxy. 📲',
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
    pattern: "photooxy2",
    react: '🎡',
    alias: ["logo4"],
    desc: desc3,
    category: "logo",
    use: '.photooxy2 vihanga+ashinshana',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q.includes('+')) return await reply(imgmsg7)
const results = await photooxy.get_urls_list()
let data = results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
if(data[i].text === 2 && !data[i].images){
srh.push({
title: i + 1,
rowId: prefix + 'dlogo4 ' + q + '+' + data[i].url, description: data[i].title
});
}
}
const sections = [{
title: "Result from photooxy. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *PHOTOOXY LOGO 02*

*🤹 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from photooxy. 📲',
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
    pattern: "photooxy3",
    react: '🎡',
    alias: ["logo5"],
    desc: desc3,
    category: "logo",
    use: '.photooxy3 <reply image',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const isQuotedViewOnce = m.quoted ? (m.quoted.type === 'viewOnceMessage') : false
const isQuotedImage = m.quoted ? ((m.quoted.type === 'imageMessage') || (isQuotedViewOnce ? (m.quoted.msg.type === 'imageMessage') : false)) : false
if ((m.type === 'imageMessage') || isQuotedImage) {
var namePng = getRandom('');
let buff = isQuotedImage ? await m.quoted.download(namePng) : await m.download(namePng)
let type = await fileType.fromBuffer(buff);
await fs.promises.writeFile("./" + type.ext, buff);
const results = await photooxy.get_urls_list()
let data = results
if (data.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.length; i++) {
if(data[i].text === 0 && data[i].images.length === 1){
srh.push({
title: i + 1,
rowId: prefix + 'dlogo5 ' + "./" + type.ext + '+' + data[i].url, description: data[i].title
});
}
}
const sections = [{
title: "Result from photooxy. 📲",
rows: srh
}]
const listMessage = { 
text: `[👨‍💻 ＶＡＪＩＲＡ - ＭＤ 👨‍💻]

   *PHOTOOXY LOGO 03*

*🤹 Entered Name:* ${q}`,
footer: config.FOOTER,
title: 'Result from photooxy. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} else return await reply(imgmsgeew)    
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "dlogo3",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    let [name,link] = q.split('+')
    var image1 = await photooxy.create({
        url : link,
        text : [`${name}`]
        })
      var img1_buf = await photooxy.image_to_buffer(image1.url)
    await conn.sendMessage(from, { image: img1_buf, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "dlogo4",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    let [name,name2,link] = q.split('+')
    var image2 = await photooxy.create({
        url : link,
        text : [`${name}`,`${name2}`]
        })
      var img2_buf = await photooxy.image_to_buffer(image2.url)
    await conn.sendMessage(from, { image: img2_buf, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})

cmd({
    pattern: "dlogo5",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    await conn.sendMessage(from, { react: { text: '🎆', key: mek.key }})
    let [name,link] = q.split('+')
    var image2 = await photooxy.create({
        url : link,
        images: [`${name}`]
        })
      var img2_buf = await photooxy.image_to_buffer(image2.url)
    await conn.sendMessage(from, { image: img2_buf, caption: config.FOOTER }, { quoted: mek })
    await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
} catch (e) {
    reply(errt)
  l(e)
}
})
    