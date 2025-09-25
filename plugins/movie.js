const config = require('../settings')
const { cmd, commands } = require('../lib/command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const { sizeFormatter} = require('human-readable');
var N_FOUND = "*I couldn't find anything :(*"


//===============GINISISILA================


cmd({
    pattern: "ginisisila",	
    react: '📑',
    category: "movie",
    desc: "ginisisila cartoon downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://ginisisilacartoon.net/search.php?q=${q}`
     const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let results = [];
    $("#page_panels_ > table > tbody > tr > td > div").each((c, d) => {
        results.push({
             title: $(d).find("div.video-title").text(),
             date: $(d).find("div.posted-time").text(),
             image: $(d).find("a > img").attr("src"),
             link: $(d).find("a").attr("href"),

        })
    })

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].date,
rowId: prefix + 'ginidl ' + results[i].link
});
}
const sections = [{
title: "_[Result from ginisisila.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: `https://i.ibb.co/0s0WcmF/1og6o9e2.png` },	    
footer: 'MOVIE DOWNLOADER BY TC',
title: 'Search By firemovieshub',
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
    pattern: "ginidl",	
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const genurl = `https://ginisisilacartoon.net/${q}`
		    const response = await axios.get(genurl);
                    const $ = cheerio.load(response.data);
		    const download = $("#player-holder > div > iframe").attr("src");
		    const mtitle = $("#watch-contentHd").text();

const cap = `📃 *Title:* ${mtitle}`
		    
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `gdrive ${download}` , description: `Download in ${mtitle}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By ginisisila',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})







//====================================







async function GDriveDl(url) {
    let id, res = { "error": true }
    if (!(url && url.match(/drive\.google/i))) return res

    const formatSize = sizeFormatter({
        std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B`
    })

    try {
        id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
        if (!id) throw 'ID Not Found'
        res = await fetch(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
            method: 'post',
            headers: {
                'accept-encoding': 'gzip, deflate, br',
                'content-length': 0,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'origin': 'https://drive.google.com',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
                'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                'x-drive-first-party': 'DriveWebUi',
                'x-json-requested': 'true'
            }
        })
        let { fileName, sizeBytes, downloadUrl } = JSON.parse((await res.text()).slice(4))
        if (!downloadUrl) throw 'Link Download Limit!'
        let data = await fetch(downloadUrl)
        if (data.status !== 200) return data.statusText
        return { downloadUrl, fileName, fileSize: formatSize(sizeBytes), mimetype: data.headers.get('content-type') }
    } catch (e) {
        console.log(e)
        return res
    }
}




cmd({
    pattern: "pirate",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/pirate/search?q=${q}&apikey=${config.APIKEY}`)

	
if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.data[i].title} | ${data.data.data.data[i].rating}`,
rowId: prefix + 'piratein ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from pirate.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from pirate. 📲',
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
    pattern: "piratein",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const data = await fetchJson(`${config.API}/api/pirate/movie?url=${q}&apikey=${config.APIKEY}`)
		    
if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
srhss.push({
title: i + 1,
description: data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size + ' | ' + data.data.data.dllinks.directDownloadLinks[i].platform,
rowId: prefix + `piratedl ${data.data.data.dllinks.directDownloadLinks[i].link}|${data.data.data.mainDetails.maintitle}|${data.data.data.moviedata.imageUrls[0]}`
});
}
	
const sections = [
{
title: "_Select Movie_",
rows: srhss
        },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `pirates ${q}` , description: 'Send Movie Details 📄'},

       ]
    },	
{
	title: "*🎬 MOVIE IMAGES 🎬*",
	rows: [
	    {title: "    1.2", rowId: prefix + `piratei ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]
const listMessage = {
caption: `*_☘ Title: ${data.data.data.mainDetails.maintitle}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *ImdbRating* ${data.data.data.moviedata.imdbRating}
- *ImdbvotesCount* ${data.data.data.moviedata.imdbvotesCount}

*⛏️ Link:* ${q}`,
image : { url: data.data.data.mainDetails.imageUrl },	
footer: 'MOVIE DOWNLOADER BY TDD',
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
    pattern: "pirates",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

const data = await fetchJson(`${config.API}/api/pirate/movie?url=${q}&apikey=${config.APIKEY}`)
const msg = `*_☘ Title: ${data.data.data.mainDetails.maintitle}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *ImdbRating* ${data.data.data.moviedata.imdbRating}
- *ImdbvotesCount* ${data.data.data.moviedata.imdbvotesCount}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[0] } , caption: msg } , { quoted: mek })

} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       



cmd({
    pattern: "piratei",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
		
		
const data = await fetchJson(`${config.API}/api/pirate/movie?url=${q}&apikey=${config.APIKEY}`)
		
const msg = config.FOOTER

reply('UPLOADING MOVIE IMAGES 🔄')

await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[1] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[2] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[4] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[5] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 

} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       




cmd({
    pattern: `piratedl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
   
        
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tdd_movie_dl_system'
        const image = q.split("|")[2] 
	    
const data = await fetchJson(`${config.API}/api/pirate/download?url=${mediaUrl}&apikey=${config.APIKEY}`)
	const dl = `${data.data.data.link}`
const dls = dl.replace("u" , "api/file")
console.log(dl)
console.log(dls)      

reply('╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')



if (dl.includes("https://pixeldrain.com")) {    
	    

const message = {
            document: await getBuffer(dls),
	    caption: `${title}\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );	
        

} if (dl.includes("https://www.amdahost.com")) {    

	

const message = {
            document: await getBuffer(dl),
	    caption: `${title}\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );	
        
}

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "slanimeclub",	
    react: '📑',
    category: "movie",
    desc: "slanimeclub movie downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/slanimeclub/search?q=${q}&apikey=${config.APIKEY}`)



	
if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: data.data.data.data[i].title,
rowId: prefix + 'slanime ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from slanimeclub.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from slanimeclub. 📲',
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
    pattern: "slanime",	
    react: '📑',
    category: "movie",
    desc: "slanimeclub moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/slanimeclub/movie?url=${q}&apikey=${config.APIKEY}`)

const cap = `*_☘ Title: ${data.data.data.moviedata.title}_*

- *Date:* ${data.data.data.moviedata.date}
- *Generous* ${data.data.data.moviedata.generous}

*⛏️ Link:* ${q}`


	
if (data.data.data.moviedata.seasons.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.moviedata.seasons.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.moviedata.seasons[i].title} | ${data.data.data.moviedata.seasons[i].number} | ${data.data.data.moviedata.seasons[i].date}`,
rowId: prefix + `slanimedl ${data.data.data.moviedata.seasons[i].link}|${data.data.data.moviedata.seasons[i].title}`
});
}
const sections = [{
title: "_[Result from slanimeclub.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {	    
caption: cap,
image : { url: data.data.data.moviedata.image },		    
footer: config.FOOTER,
title: 'Result from slanimeclub. 📲',
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
    pattern: `slanimedl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
   
       
	   
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tdd_movie_dl_system'
        const data = await fetchJson(`${config.API}/api/slanimeclub/download?url=${mediaUrl}&apikey=${config.APIKEY}`)
        const dl_link = `${data.data.data.link}`

reply('╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')


if (dl_link.includes("https://slanimeclub.co")) {    
	    
    const message = {
            document: await getBuffer(dl_link),
	    caption: `${title}\n\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );

} if (dl_link.includes("https://drive.google.com")) {


let res = await GDriveDl(dl_link)
		let txt = `*[ Downloading file ]*\n\n`
		txt += `*Name :* ${res.fileName}\n`
		txt += `*Size :* ${res.fileSize}\n`
		txt += `*Type :* ${res.mimetype}`	
        await reply(txt)
conn.sendMessage(from, { document: { url: res.downloadUrl }, caption: `${res.fileName}\n\n${config.FOOTER}`, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })

}

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "cinesubz",	
    react: '📑',
    category: "movie",
    desc: "cinesubz moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/cinesubz/search?q=${q}&apikey=${config.APIKEY}`)

	
if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: data.data.data.data[i].title,
rowId: prefix + 'cine ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from cinesubz.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from cinesubz. 📲',
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
    pattern: "cine",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
if (!q) return await reply('*Please Give Me Text..! 🖊️*')



const data = await fetchJson(`${config.API}/api/cinesubz/movie?url=${q}&apikey=${config.APIKEY}`)


const cap1 = `*_☘ Title: ${data.data.data.moviedata.title}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *Count* ${data.data.data.mainDetails.rating.count}
- *Value* ${data.data.data.mainDetails.rating.value}

*⛏️ Link:* ${q}`


const response = await axios.get(q);  
const $ = cheerio.load(response.data);
  
const image = $("div.poster > img").attr("src")
const image2 = $("p > img.aligncenter.size-full.wp-image-93256").attr("src")
const title = $("div.data > h1").text()
const type = $("span > a").text()
const genre = $("div.data > div.sgeneros > a").text()
const date = $("div.extra > span.date").text()
const desc = $("div:nth-child(16)").text()
const rating = $("#repimdb > strong").text()
const fdate = $("#info > div:nth-child(6) > span").text()
const ldate = $("#info > div:nth-child(7) > span").text()


const results = [];
    $("div.se-a > ul.episodios > li").each((c, d) => {

        results.push({

   
      link: $(d).find("a").attr("href"),
       id: $(d).find("div.numerando").text(),
       title: $(d).find("div.episodiotitle > a").text()
          

      })    
        })
	

const cap2 = `*_☘ Title: ${title}*

- *Year:* ${date}
- *Rating:* ${rating}
- *Type:* ${type}
- *Generos:* ${genre}

⛏️ *Link:* ${q}`

	
	



if (q.includes("https://cinesubz.co/movies")) {	




	
if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
srhss.push({
title: i + 1,
description: data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size,
rowId: prefix + `cinedls ${data.data.data.dllinks.directDownloadLinks[i].link}`
});
}
	
const sections = [
{
title: "_Select Movie_",
rows: srhss
        },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `cines ${q}` , description: 'Send Movie Details 📄'},

       ]
    },	
{
	title: "*🎬 MOVIE IMAGES 🎬*",
	rows: [
	    {title: "    1.2", rowId: prefix + `cinei ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]
const listMessage = {
caption: cap1,
image : { url: data.data.data.mainDetails.imageUrl },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })	

}  
	
if (q.includes("https://cinesubz.co/tvshows")) {
	

	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < results.length; i++) {
srhss.push({
title: i + 1,
description: results[i].title + ' | ' + results[i].id,
rowId: prefix + `cinetv ${results[i].link}`
});
}
	
const sections = [
{
title: "_Select Episode_",
rows: srhss
    },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `cines ${q}` , description: 'Send Movie Details 📄'},

       ]
    },	
{
	title: "*🎬 MOVIE IMAGES 🎬*",
	rows: [
	    {title: "    1.2", rowId: prefix + `cinei ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]


const listMessage = {
caption: cap2,	
image : { url: image },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })	

}	
	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})



cmd({
    pattern: "cinetv",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const data = await fetchJson(`${config.API}/api/cinesubz/episode?url=${q}&apikey=${config.APIKEY}`)
	    
if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
srhss.push({
title: i + 1,
description: data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size,
rowId: prefix + `cinedls ${data.data.data.dllinks.directDownloadLinks[i].link}`
});
}
	
const sections = [
{
title: "_Select Movie_",
rows: srhss
    }
]
const listMessage = {
caption: `*_☘ Title: ${data.data.data.mainDetails.title}_*

- *EpisodeTitle:* ${data.data.data.mainDetails.episodeTitle}
- *Year:* ${data.data.data.mainDetails.date}
- *Completeness* ${data.data.data.mainDetails.completeness}

*⛏️ Link:* ${q}`	,
image : { url: data.data.data.imageUrls[0] },	
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
    pattern: "cinedls",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/cinesubz/download?url=${q}&apikey=${config.APIKEY}`)

	const downloads = data.data.data;

    if (!downloads || downloads.length === 0) {
      return reply("No download links found.");
    }

    // Format and send download links
    let messages = `*🎥 Cinesubz Download Links 🎥*\n\n`;
    downloads.forEach((item, index) => {
      messages += `*${index + 1}. ${item.fileName}*\n`;
      messages += `📦 Size: ${item.fileSize}\n`;
      messages += `🔗 Type: ${item.type}\n===============================\n`;
    });

if (downloads < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < downloads.length; i++) {
srh.push({
title: i + 1,
description: `${downloads[i].type} | ${downloads[i].fileSize}`,
rowId: prefix + `cinedl ${downloads[i].href}|${downloads[i].fileName}`
});
}
const sections = [{
title: "_[Result from cinesubz.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: messages,
footer: config.FOOTER,
title: 'Result from cinesubz. 📲',
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
    pattern: "cines",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
        
        
if (q.includes("https://cinesubz.co/movies")) {
		
		
		
const data = await fetchJson(`${config.API}/api/cinesubz/movie?url=${q}&apikey=${config.APIKEY}`)
const msg = `*_☘ Title: ${data.data.data.moviedata.title}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *Count* ${data.data.data.mainDetails.rating.count}
- *Value* ${data.data.data.mainDetails.rating.value}

*⛏️ Link:* ${q}

${config.FOOTER}`
return await conn.sendMessage(from, { image: { url:data.data.data.mainDetails.imageUrl } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
	
	
	
} if (q.includes("https://cinesubz.co/tvshows")) {



const data = await fetchJson(`${config.API}/api/cinesubz/episodes?url=${q}&apikey=${config.APIKEY}`)
const msg = `*_☘ Title: ${data.data.data.mainDetails.title}_*

- *EpisodeTitle:* ${data.data.data.mainDetails.episodeTitle}
- *Year:* ${data.data.data.mainDetails.date}
- *Completeness* ${data.data.data.mainDetails.completeness}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(from, { image: { url:data.data.data.mainDetails.imageUrl } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
}	
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       



cmd({
    pattern: "cinei",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
		
if (q.includes("https://cinesubz.co/movies")) {
		
const data = await fetchJson(`${config.API}/api/cinesubz/movie?url=${q}&apikey=${config.APIKEY}`)
		
const msg = config.FOOTER

reply('UPLOADING MOVIE IMAGES 🔄')

await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[1] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[2] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[4] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[5] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 


}if (q.includes("https://cinesubz.co/tvshows")) {


const data = await fetchJson(`${config.API}/api/sinhalasubs/episodes?url=${q}&apikey=${config.APIKEY}`)
		
const msg = config.FOOTER

reply('UPLOADING MOVIE IMAGES 🔄')
	
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[1] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[2] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[4] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[5] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 	
}
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       



cmd({
    pattern: `cinedl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
   
        
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tdd_movie_dl_system'
        

reply('╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')


if (q.includes("https://pixeldrain.com")) {    
	    
/*await conn.sendMessage(from, {
        document: { url: mediaUrl },
	caption: `${title}\n\n*🎬 TDD TEAM MOVIEDL 🎬*`,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴛᴅᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${title}`,
            thumbnailUrl: config.LOGO,
            sourceUrl: `${mediaUrl}`,
            mediaType: 2,
            mediaUrl: `${mediaUrl}`
          }
        }
      }, { quoted: m });	
*/

    const message = {
            document: await getBuffer(mediaUrl),
	    caption: `${title}\n\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );

} if (q.includes("https://06.cscloud12.online")) {



/*await conn.sendMessage(from, {
        document: { url: mediaUrl },
	caption: `${title}\n\n*🎬 TDD TEAM MOVIEDL 🎬*`,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴛᴅᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${title}`,
            thumbnailUrl: `${config.LOGO}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${q}`
          }
        }
      }, { quoted: m });	*/


	
    
        const message = {
            document: await getBuffer(mediaUrl),
	    caption: `${title}\n\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );



} if (q.includes("https://drive.usercontent.google.com")) {


let newlink = mediaUrl.match(/id=([a-zA-Z0-9_-]+)/)[1]
const dl = `https://drive.google.com/file/d/${newlink}/view`


	
let res = await GDriveDl(dl)
		let txt = `*[ Downloading file ]*\n\n`
		txt += `*Name :* ${res.fileName}\n`
		txt += `*Size :* ${res.fileSize}\n`
		txt += `*Type :* ${res.mimetype}`	
        await reply(txt)
conn.sendMessage(from, { document: { url: res.downloadUrl }, caption: `${res.fileName}\n\n${config.FOOTER}`, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })

/*await conn.sendMessage(from, {
        document: { url: res.downloadUrl },
	caption: `${title}\n\n*🎬 TDD TEAM MOVIEDL 🎬*`,
        mimetype: res.mimetype,
        fileName: res.fileName,
        contextInfo: {
          externalAdReply: {
            title: 'ᴛᴅᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${title}`,
            thumbnailUrl: `${config.LOGO}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${q}`
          }
        }
      }, { quoted: m });	*/


	

}

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});






//===================


cmd({
    pattern: "sinhalasub",	
    react: '📑',
    category: "movie",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/sinhalasubs/search?q=${q}&apikey=${config.APIKEY}`)
	
if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: data.data.data.data[i].title,
rowId: prefix + 'subin ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from sinhalasub. 📲',
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
    pattern: "subin",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
if (!q) return await reply('*Please Give Me Text..! 🖊️*')



const data = await fetchJson(`${config.API}/api/sinhalasubs/movie?url=${q}&apikey=${config.APIKEY}`)
const cap1 = `*_☘ Title: ${data.data.data.mainDetails.maintitle}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *ImdbRating* ${data.data.data.moviedata.imdbRating}
- *ImdbvotesCount* ${data.data.data.moviedata.imdbvotesCount}

*⛏️ Link:* ${q}`


const data1 = await fetchJson(`${config.API}/api/sinhalasubs/tvshow?url=${q}&apikey=${config.APIKEY}`)

const responsev = await axios.get(q);  
const $c = cheerio.load(responsev.data);
    const datas = [];
    $c("ul.episodios > li").each((c, d) => {
        datas.push({
         link: $c(d).find("div.episodiotitle > a").attr("href"),    
         title1: $c(d).find("div.numerando").text(),
         episode: $c(d).find("div.episodiotitle > a").text()
        })
    })
	
const cap2 = `*_☘ Title: ${data.data.data.mainDetails.maintitle}*

- *Year:* ${data1.data.data.mainDetails.dateCreated}
- *Rating:* ${data1.data.data.mainDetails.rating.value} || ${data1.data.data.mainDetails.rating.count}
- *Generos:* ${data1.data.data.mainDetails.genres[0]} ${data1.data.data.mainDetails.genres[1]}

⛏️ *Link:* ${q}`

if (q.includes("https://sinhalasub.lk/movies")) {
	
if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
srhss.push({
title: i + 1,
description: data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size,
rowId: prefix + `subdl ${data.data.data.dllinks.directDownloadLinks[i].link}|${data.data.data.mainDetails.maintitle}|${data.data.data.moviedata.imageUrls[0]}`
});
}
	
const sections = [
{
title: "_Select Movie_",
rows: srhss
        },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `subins ${q}` , description: 'Send Movie Details 📄'},

       ]
    },	
{
	title: "*🎬 MOVIE IMAGES 🎬*",
	rows: [
	    {title: "    1.2", rowId: prefix + `subini ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]
const listMessage = {
caption: cap1,
image : { url: data.data.data.moviedata.imageUrls[0] },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })	

}  
	
if (q.includes("https://sinhalasub.lk/tvshows")) {
	
	
if (datas.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srhss = [];
	
for (var i = 0; i < datas.length; i++) {
srhss.push({
title: i + 1,
description: datas[i].title1 + ' | ' + datas[i].episode,
rowId: prefix + `subintv ${datas[i].link}`
});
}
	
const sections = [
{
title: "_Select Episode_",
rows: srhss
    },	
{
	title: "*🎬 MOVIE INFO 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `subins ${q}` , description: 'Send Movie Details 📄'},

       ]
    },	
{
	title: "*🎬 MOVIE IMAGES 🎬*",
	rows: [
	    {title: "    1.2", rowId: prefix + `subini ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]


const listMessage = {
caption: cap2,	
image : { url: data1.data.data.imageUrls[0] },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })	
}	

} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


cmd({
    pattern: "subins",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
if (q.includes("https://sinhalasub.lk/movies")) {
		
const data = await fetchJson(`${config.API}/api/sinhalasubs/movie?url=${q}&apikey=${config.APIKEY}`)	
const msg = `*_☘ Title: ${data.data.data.mainDetails.maintitle}_*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.runtime}
- *ImdbRating* ${data.data.data.moviedata.imdbRating}
- *ImdbvotesCount* ${data.data.data.moviedata.imdbvotesCount}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
	
	
	
}if (q.includes("https://sinhalasub.lk/tvshows")) {



const data = await fetchJson(`${config.API}/api/sinhalasubs/tvshow?url=${q}&apikey=${config.APIKEY}`)	
const msg = `*_☘ Title: ${data.data.data.mainDetails.maintitle}*

- *Year:* ${data.data.data.mainDetails.dateCreated}
- *Rating:* ${data.data.data.mainDetails.rating.value} || ${data.data.data.mainDetails.rating.count}
- *Generos:* ${data.data.data.mainDetails.genres[0]} ${data.data.data.mainDetails.genres[1]}

*⛏️ Link:* ${q}

${config.FOOTER}`	
return await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
}	
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       



cmd({
    pattern: "subini",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')
		
if (q.includes("https://sinhalasub.lk/movies")) {
		
const data = await fetchJson(`${config.API}/api/sinhalasubs/movie?url=${q}&apikey=${config.APIKEY}`)
		
const msg = config.FOOTER

reply('UPLOADING MOVIE IMAGES 🔄')


await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[1] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[2] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[4] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.moviedata.imageUrls[5] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 


}if (q.includes("https://sinhalasub.lk/tvshows")) {


const data = await fetchJson(`${config.API}/api/sinhalasubs/tvshow?url=${q}&apikey=${config.APIKEY}`)
		
const msg = config.FOOTER

reply('UPLOADING MOVIE IMAGES 🔄')
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[0] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[1] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[2] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[4] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { image: { url:data.data.data.imageUrls[5] } , caption: msg } , { quoted: mek })
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 	
}
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       


cmd({
    pattern: "subintv",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/sinhalasubs/episode?url=${q}&apikey=${config.APIKEY}`)

const cap = `*_☘ Title: ${data.data.data.mainDetails.title}*

- *Year:* ${data.data.data.mainDetails.episodeTitle}
- *Completeness:* ${data.data.data.mainDetails.completeness}
- *Date:* ${data.data.data.mainDetails.date}

⛏️ *Link:* ${q}`

	
if (config.MODE === 'nonbutton') {	
if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
srh.push({
title: i + 1,
description: data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size,
rowId: prefix + `subdl ${data.data.data.dllinks.directDownloadLinks[i].link}|${data.data.data.mainDetails.title}|${data.data.data.imageUrls[0]}`
});
}
const sections = [{
title: "_[Result from sinhalasub.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
caption: cap,
image : { url: data.data.data.imageUrls[0] },	
footer: config.FOOTER,
title: 'Result from sinhalasub. 📲',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {



if (data.data.data.dllinks.directDownloadLinks.length < 1) return await conn.sendMessage(from, { text: N_FOUND }, { quoted: mek } )

var sections = []
        for (var i = 0; i < data.data.data.dllinks.directDownloadLinks.length; i++) {
        //if(data[i].thumb && !data[i].views.includes('Follow')){
          sections.push({
            rows: [{
              title: i + 1,
	      description:  data.data.data.dllinks.directDownloadLinks[i].quality + ' | ' + data.data.data.dllinks.directDownloadLinks[i].size,
              id: prefix + `subdl ${data.data.data.dllinks.directDownloadLinks[i].link}|${data.data.data.mainDetails.title}|${data.data.data.imageUrls[0]}`
            }]
          })
      }
//}

                let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: 'Join Our Channel',
                        url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`,
                        merchant_url: `https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z`
                    }),
                },
                {
                    name: 'single_select',
                    buttonParamsJson: JSON.stringify({
                        title: 'Result from cinesubz. 📲',
                        sections
                    })
                }]
    
        let message = {
            image : data.data.data.imageUrls[0],	
            header: '',
            footer: config.FOOTER,
            body: cap
        }
return await conn.sendButtonMessage(from, buttons, m, message, { quoted: mek});
}
	

	
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})




cmd({
    pattern: `subdl`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {
   
        
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tdd_movie_dl_system'
        const image = q.split("|")[2] 
	    
const data = await fetchJson(`${config.API}/api/sinhalasubs/download?url=${mediaUrl}&apikey=${config.APIKEY}`)
	const dl = `${data.data.data.link}`

reply('╭═════════════════❀\n│  UPLOADING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')

	    
/*await conn.sendMessage(from, {
        document: { url: dl },
	caption: `${title}\n\n*🎬 TDD TEAM MOVIEDL 🎬*`,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴛᴅᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${title}`,
            thumbnailUrl: `${image}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${image}`
          }
        }
      }, { quoted: m });	*/

	    
const message = {
            document: await getBuffer(dl),
	    caption: `${title}\n\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };	    
        await conn.sendMessage(from, message );
	    
        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




//====================






cmd({
    pattern: "ytsmx",	
    react: '📑',
    category: "movie",
    desc: "ytsmx moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/ytsmx/search?q=${q}&apikey=${config.APIKEY}`)

if (data.data.data.data.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.data.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.data[i].title} | ${data.data.data.data[i].rating} | ${data.data.data.data[i].year}`,
rowId: prefix + 'ytmx ' + data.data.data.data[i].link
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
    }	  				 
 ]

    const listMessage = {
text: ``,
footer: config.FOOTER,
title: 'Result from ytsmx. 📲',
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
    pattern: "ytmx",	
    react: '📑',
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	

const data = await fetchJson(`${config.API}/api/ytsmx/movie?url=${q}&apikey=${config.APIKEY}`)
const cap = `*_☘ Title: ${data.data.data.moviedata.title}*

- *Year:* ${data.data.data.moviedata.year}
- *Language:* ${data.data.data.moviedata.language}
- *Enter:* ${data.data.data.moviedata.enter}

⛏️ *Link:* ${q}`

if (data.data.data.moviedata.dllinks.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < data.data.data.moviedata.dllinks.length; i++) {
srh.push({
title: i + 1,
description: `${data.data.data.moviedata.dllinks[i].quality} | ${data.data.data.moviedata.dllinks[i].type} | ${data.data.data.moviedata.dllinks[i].size}`,
rowId: prefix + 'ytsmxdl ' + data.data.data.moviedata.dllinks[i].magnet
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
    },	
{
	title: "*🎬 MOVIE DETAILS 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `ytsmxs ${q}` , description: 'Send Movie IMAGES 🏞️'},

       ]
    }
]
    const listMessage = {
caption: cap,	
image: data.data.data.moviedata.image,
footer: config.FOOTER,
title: 'Result from ytsmx. 📲',
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
    pattern: "ytsmxs",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
    async (conn, mek, m, { reply, isDev, from, q, prefix }) => {
        try {
        
        if (!q) return await reply('*Please Give Me Link..! 🖊️*')

		
const data = await fetchJson(`${config.API}/api/ytsmx/movie?url=${q}&apikey=${config.APIKEY}`)
const msg = `*_☘ Title: ${data.data.data.moviedata.title}*

- *Year:* ${data.data.data.moviedata.year}
- *Language:* ${data.data.data.moviedata.language}
- *Enter:* ${data.data.data.moviedata.enter}

*⛏️ Link:* ${q}

${config.FOOTER}`
		
return await conn.sendMessage(from, { image: { url:data.data.data.moviedata.image } , caption: msg } , { quoted: mek })

await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*_First activate location sender_*\n\n- Eg:- .activate\n- Then reply 1.1')
            console.log(e)
            }
    })       






cmd({
    pattern: "ytsmxdl",
    react: '⬆',    
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isDev, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
	

							 
//  if ( !isDev ) return reply('⚠️ ⚠️ *Contact owner to Active your number To Premium user*')  

var Seedr = require("seedr");
var seedr = new Seedr();
await seedr.login("vajirarathnayaka891@gmail.com","vajirarathnayaka891@");

const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ magnet file...📥' }, {quoted: mek} )
const magnet = await seedr.addMagnet(q);

reply('╭═════════════════❀\n│  UPLODING YOUR MOVIE 📥\n│ ❀ Target : WAIT FEW MINUTES...\n│ ❀ Use commands after come the movie\n│ ❀ Device : 1/3\n╰═════════════════❀')


    if (magnet.code === 400 || magnet.result !== true) {
        console.log("Error adding magnet " + JSON.stringify(magnet, null, 2))
        return null;
    }
    var contents = []
	do {
		contents = await seedr.getVideos();
	} while (contents.length === 0);


		var file = await seedr.getFile(contents[0][0].id);
		var folder_id=  contents[0][0].fid 

	const link = file.url

	    
/*await conn.sendMessage(from, {
        document: await getBuffer(link),
        mimetype: 'audio/mp4',
        fileName: `${file.name}.mp4`,
        contextInfo: {
          externalAdReply: {
            title: 'ᴛᴅᴅ-ᴍᴏᴠɪᴇ-ᴅʟ',
            body: `${file.name}`,
            thumbnailUrl: `${config.LOGO}`,
            sourceUrl: `${q}`,
            mediaType: 2,
            mediaUrl: `${config.LOGO}`
          }
        }
      }, { quoted: m });	*/


const message = {
            document: await getBuffer(link),
	    caption: `${file.name}\n\n${config.FOOTER}`,
            mimetype: "video/mp4",
            fileName: `${file.name}.mp4`,
        };	    
        await conn.sendMessage(from, message );

	await seedr.deleteFolder(folder_id)
await conn.sendMessage(from, { text : `Movie send ${config.JID} Successfull ✔` }, {quoted: mek} )
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})



//===============ZOOM================
cmd({
    pattern: "zoom",	
    react: '📑',
    category: "movie",
    desc: "zoom moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const url = `https://zoom.lk/?s=${q}`;
const response = await axios.get(url);	
const $ = cheerio.load(response.data);

let results = [];
    $("div.td-pb-span8.td-main-content > div > div.td_module_16.td_module_wrap.td-animation-stack").each((c, d) => {
        results.push({
             time: $(d).find("div.item-details > div > span > time").text(),
             title: $(d).find("div.item-details > h3 > a").text(),
             author: $(d).find("div.item-details > div > span > a").text(),
             desc: $(d).find("div.item-details > div.td-excerpt").text(),
             comments: $(d).find("div.item-details > div > span.td-module-comments a").text(),
             image: $(d).find("div.td-module-thumb > img").attr("src"),
	     link: $(d).find("div.item-details > h3 > a").attr("href"),	
           
        })
    })


if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '+' + results[i].time,
rowId: prefix + 'zoomdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from zoom.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },		    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from zoom. 📲',
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
    pattern: "zoomdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')


const response = await axios.get(q);	
const $ = cheerio.load(response.data);
      const title = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_title.tdi_60.tdb-single-title.td-pb-border-top.td_block_template_17 > div > h1").text();
      const author = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_64.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > ul > li > a").text();
      const view = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_67.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > span").text();
      const date = $("#tdi_56 > div > div.vc_column.tdi_59.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.vc_row_inner.tdi_62.vc_row.vc_inner.wpb_row.td-pb-row > div.vc_column_inner.tdi_70.wpb_column.vc_column_container.tdc-inner-column.td-pb-span4 > div > div > div > div > time").text();
      const size = $("#tdi_81 > div > div.vc_column.tdi_84.wpb_column.vc_column_container.tdc-column.td-pb-span8 > div > div.td_block_wrap.tdb_single_content.tdi_86.td-pb-border-top.td_block_template_17.td-post-content.tagdiv-type > div > p > a > small").text();
      const dllink = $("div.tdb-block-inner.td-fix-index > p > a").attr("href");

const cap = `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n
⏳ *Views:* ${view}\n`
	
	    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download in ${size}`},	
	]
    }	  
]
const listMessage = {
text: cap,
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By zoom',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SUBZ===============

cmd({
    pattern: "subz",	
    react: '📑',
    category: "movie",
    desc: "subz moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	var link = `https://subz.lk/?s=${q}`
var response = await axios.get(link);
var $ = cheerio.load(response.data);
const results = [];

$('div.col-lg-3.col-md-6.col-sm-12').each((i,element) => {
results.push({
title: $(element).find('a.font-bold.text-wrap.text-break.text-justify').text(),
link: $(element).find('a').attr("href"),
image: $(element).find('img').attr("src"),
emovies: $(element).find('a.text-white').attr("href"),
})
    })

	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title  + '+' + results[i].emovies,
rowId: prefix + 'subzdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from subz.]_",
rows: srh
}]

    const listMessage = {
caption: `⏳ Search A SubsTitle Name: ${q}
📲 Search top 10 SubsTitles\n`,
image : { url: config.LOGO },	    	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
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
    pattern: "subzdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

var response = await axios.get(q);
var $ = cheerio.load(response.data);

const title = $("h1.text-center.text-danger.h4").text();
const image = $("img.rounded.mx-auto.d-block.shadow-2-strong.mb-0.wp-post-image").attr("src");
const date = $("time").text().trim();
const dllink = $("a.btn.btn-outline-success.fw-bold").attr("href");
const size = $("li.list-group-item").text().trim();

const cap = `📃 *Title:* ${title}\n
📅 *Year:* ${date}\n
💫 *Size:* ${size}\n`
	

	    
  const sections = [
{
	title: "*🎬 SUB-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: `Download Substitles`},	
	]
    }	  
]
const listMessage = {
caption: cap,
image : { url: config.LOGO },	
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Search By subz',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })
} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})


//================SINHALSUBTITLE===============

cmd({
    pattern: "s-subtitle",	
    react: '📑',
    category: "movie",
    desc: "s-subtitle moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{

        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
	const url = `https://sinhala-subtitles.com/?s=${q}`;
const response = await axios.get(url);
        var $ = cheerio.load(response.data);
        const results = [];
        
        $('article.l-post.grid-base-post.grid-post').each((i,element) => {
        results.push({
        
        link: $(element).find('a').attr("href"),
        image: $(element).find('span').attr("data-bgsrc"),
        title: $(element).find('a').attr("title"),
        date: $(element).find('time.post-date').text(),
        desc: $(element).find('p').text()
        
        })
            })

	
if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: i + 1,
description: results[i].title + '||' + results[i].date,
rowId: prefix + 'ssdl ' + results[i].link
});
}
const sections = [{
title: "_[Result from sinhala-subtitles.]_",
rows: srh
}]

    const listMessage = {
caption: `🎬 VAJIRA MD MOVIE-DL 🎬

   ⏳ Search A Movie Name: ${q}
📲 Search top 10 Movies\n`,
image : { url: config.LOGO },	    
footer: 'MOVIE DOWNLOADER BY VAJIRA MD',
title: 'Result from sinhala-subtitles. 📲',
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
    pattern: "ssdl",	
    react: '📑',
    category: "",
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, reply }) => {
try{
        if (!q) return await reply('*Please Give Me Text..! 🖊️*')

const response = await axios.get(q);	
const $ = cheerio.load(response.data);
const title = $('h1.is-title.post-title').text();
const date = $('span.meta-item.date > time.post-date').text();
const image = $('a.image-link.media-ratio.ar-bunyad-main').attr("href");
const desc = $('p').text();
const dllink = $('figure > a').attr("href");

const cap = `📃 *Title:* ${title}\n
🔗 *Link:* ${dllink}\n
📅 *Year:* ${date}\n
⏳ *Views:* ${desc}\n`

	
  const sections = [
{
	title: "*🎬 MOVIE-SEARCH-SITE 🎬*",
	rows: [
	    {title: "    1.1", rowId: prefix + `zip ${dllink}|${title}` , description: 'Download in sinhala-subtitles'},	
	]
    }	  
]
const listMessage = {
caption: cap,
image : { url: image },	
footer: 'MOVIE DOWNLOADER BY VAJIR MD',
title: 'Search By sinhala-subtitles',
buttonText: '*🔢 Reply below number*',
sections
}
return await conn.replyList(from, listMessage ,{ quoted : mek })

} catch (e) {
  reply('*ERROR !!*')
  l(e)
}
})
	








//------------------------dl---------------






cmd({
    pattern: `mp4`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
     const response = await axios.get(mediaUrl);  
const $ = cheerio.load(response.data);
    const link = $("#link").attr("href")
const drain = link.replace(/u/g, 'api/file')   
console.log(drain)

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(drain),
	    caption: `${title}\n\n*> 🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});



cmd({
    pattern: `mp41`,
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


	    
        //const mediaUrl = q.trim();
        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'tc_movie_dl_system'
	    
    


var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}



        const message = {
            document: await getBuffer(mediaUrl),
	    caption: `${title}\n\n*> 🎬 VAJIRA MD TEAM MOVIEDL 🎬*`,
            mimetype: "video/mp4",
            fileName: `${title}.mp4`,
        };


	    
        await conn.sendMessage(from, message );

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});




cmd({
    pattern: "zip",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
}, async (conn, mek, m, { from, q, isDev, reply }) => {
	
    if (!q) {
        return await reply('*Please provide a direct URL!*');
    }


    try {


        const mediaUrl = q.split("|")[0]
        const title = q.split("|")[1]  || 'vajira_md_sub_dl_system'

        const response = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        const mediaBuffer = Buffer.from(response.data, 'binary');

var vajiralod = [
"《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
"《 ████▒▒▒▒▒▒▒▒》30%",
"《 ███████▒▒▒▒▒》50%",
"《 ██████████▒▒》80%",
"《 ████████████》100%",
"𝙸𝙽𝙸𝚃𝙸𝙰𝙻𝙸𝚉𝙴𝙳 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳 🦄..."
]
let { key } = await conn.sendMessage(from, {text: 'ᴜᴘʟᴏᴀᴅɪɴɢ ᴍᴏᴠɪᴇ...'})

for (let i = 0; i < vajiralod.length; i++) {
await conn.sendMessage(from, {text: vajiralod[i], edit: key })
}


        const message = {
            document: await getBuffer(mediaUrl),
	    caption: "*🎬 VAJIRA MD SUB-DL 🎬*",
            mimetype: "VAJIRA MD SUB DL",
            fileName: `${title}.zip`,
        };

        await conn.sendMessage(from, message, { quoted: mek });
await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (error) {
        console.error('Error fetching or sending', error);
        await conn.sendMessage(from, '*Error fetching or sending *', { quoted: mek });
    }
});