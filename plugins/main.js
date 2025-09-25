const config = require('../settings')
const os = require('os');
const moment = require('moment');
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
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require('../lib/updateDB');
const axios = require("axios");
const cheerio = require("cheerio"); // Not needed here, but useful if scraping later


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

const imageList = [
      "https://files.catbox.moe/ao1lcx.jpg",
      "https://files.catbox.moe/m0l6nq.jpg"
    ];



var BOTOW = ''
if(config.LANG === 'SI') BOTOW = "*ඔබ Bot\'s හිමිකරු හෝ  උපපරිපාලක නොවේ !*"
else BOTOW = "*You are not bot\'s owner or moderator !*"
//============================================================================

cmd({
  pattern: "missedcall",
  desc: "Send a fake missed call",
  category: "fun",
  use: ".missedcall <number>",
  filename: __filename
}, async (conn, m, { q, reply }) => {
  try {
    if (!q) return reply("Please provide a number (with country code).\nExample: `.missedcall 94712345678`");

   // const jid = q.replace(/[^0-9]/g, "") + @s.whatsapp.net;

    reply("☎️ Calling...");

    // Offer the call
    await conn.sendNode(q, [
      {
        tag: "call",
        attrs: {
          from: conn.user.id,
          to: q,
          id: m.key.id
        },
        content: [
          {
            tag: "offer",
            attrs: {
              "call-id": m.key.id,
              "call-creator": conn.user.id,
              "device_class": "mobile"
            },
            content: []
          }
        ]
      }
    ]);

    // Wait briefly then cancel (simulate missed call)
    setTimeout(async () => {
      await conn.sendNode(q, [
        {
          tag: "call",
          attrs: {
            from: conn.user.id,
            to: q,
            id: m.key.id
          },
          content: [
            {
              tag: "reject",
              attrs: {
                "call-id": m.key.id,
                "call-creator": conn.user.id,
                "reason": "cancel"
              },
              content: []
            }
          ]
        }
      ]);
    }, 3000); // 3 seconds

  } catch (err) {
    console.error(err);
    reply("❌ Failed to send missed call.");
  }
});



cmd({
  pattern: "selfpoll",
  desc: "Show a poll to switch self mode on/off",
  category: "bot",
  use: ".selfpoll",
  filename: __filename
},
async (conn, mek, m, { prefix, from }) => {
  try {
    await conn.sendMessage(from, {
      poll: {
        name: `*– 乂 Cara Penggunaan Fitur Mode Senyap (Self Mode)*\n\n> *\`0\`* - Untuk mematikan fitur self mode (Bot aktif di grup)\n> *\`1\`* - Untuk menghidupkan fitur self mode (Bot hanya aktif di private chat)`,
        values: [`${prefix}menu`, `${prefix}alive`],
        selectableCount: 1
      }
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, { text: "❌ Gagal mengirim polling." }, { quoted: m });
  }
});



const HEROKU_API_KEY = "HRKU-AAOHRpxoGdh2piF_b4WssArT_IUHAaS_OJyASjy_4ZcQ_____wt5-QMfMLx2";
const HEROKU_TEAM = "new-teams"; // From your URL



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








cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
    desc: "Get pairing code for VAJIRA MD AI bot",
    category: "download",
    use: ".pair +94711453097",
    filename: __filename
}, async (conn, mek, m, { q, senderNumber, reply }) => {
    try {
        let invalidMsg, failedMsg, doneMsg, errorMsg;
        
        if (config.LANG === 'si') {
            invalidMsg = "❌ කරුණාකර රටේ කේතය සමඟ වලංගු දුරකථන අංකයක් ලබාදෙන්න\nඋදා: .pair +94711453097";
            failedMsg = "❌ Pairing කේතය ලබාගැනීම අසාර්ථකයි. කරුණාකර පසුව උත්සහ කරන්න.";
            doneMsg = "> *VAJIRA MD X යුගල කිරීම සම්පුර්ණයි ✅*";
            errorMsg = "❌ Pairing කේතය ලබාගැනීමේදී දෝෂයකි. කරුණාකර පසුව උත්සහ කරන්න.";
        } else {
            invalidMsg = "❌ Please provide a valid phone number with country code\nExample: .pair +94711453097";
            failedMsg = "❌ Failed to retrieve pairing code. Please try again later.";
            doneMsg = "> *VAJIRA MD X PAIRING COMPLETED ✅*";
            errorMsg = "❌ An error occurred while getting pairing code. Please try again later.";
        }

        const phoneNumber = q ? q.trim() : senderNumber;

        if (!phoneNumber || !phoneNumber.match(/^\+?\d{10,15}$/)) {
            return await reply(invalidMsg);
        }

        const baseUrl = `${config.PAIR}/code?number=`;
        const response = await axios.get(`${baseUrl}${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply(failedMsg);
        }

        const pairingCode = response.data.code;
        await reply(`${doneMsg}\n\n*Your pairing code is:* ${pairingCode}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply(errorMsg);
    }
});


let qrInterval = {};

cmd({
  pattern: "scan",
  react: "📷",
  desc: "Start auto-refresh QR session",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  if (qrInterval[from]) return reply("⚠️ QR scan is already running.");

  reply("⏳ Starting QR scan...");

  qrInterval[from] = setInterval(async () => {
    try {
      // Step 1: Load the HTML page
      const page = await axios.get(`${config.PAIR}/qr`);
      const $ = cheerio.load(page.data);

      // Step 2: Get image URL (assumes <img src="..." /> is inside page)
      const imgSrc = $("img").attr("src");

      if (!imgSrc) {
        return await conn.sendMessage(from, { text: "❌ QR image not found in page." }, { quoted: m });
      }

      const imageURL = imgSrc.startsWith("http") ? imgSrc : `https://vajiramdpair-f5f1c910b4da.herokuapp.com${imgSrc}`;

      // Step 3: Download image as buffer
      const imageRes = await axios.get(imageURL, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(imageRes.data);

      // Step 4: Send QR image
      await conn.sendMessage(from, {
        image: imageBuffer,
        mimetype: "image/png",
        caption: "📷 *Scan this QR to deploy your session.*\nQR will refresh automatically every 30 seconds."
      }, { quoted: m });

    } catch (err) {
      console.error("QR Fetch Error:", err.message);
      await conn.sendMessage(from, {
        text: "⚠️ Failed to fetch QR image. Retrying..."
      }, { quoted: m });
    }
  }, 30000); // Every 30 seconds
});





cmd({
  pattern: "stopscan",
  react: "🛑",
  desc: "Stop QR session auto-refresh",
  category: "main",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  if (qrInterval[from]) {
    clearInterval(qrInterval[from]);
    delete qrInterval[from];
    return reply("✅ QR scan process stopped.");
  } else {
    reply("⚠️ No active QR scan process found.");
  }
});




cmd({
  pattern: "register",
  desc: "Register with a username",
  category: "main",
  use: ".register <username>",
  filename: __filename
}, async (conn, m, mek, { q, reply }) => {
  if (!q) return reply("Please provide a username: `.register <username>`");

  const fs = require("fs");
  const file = "./lib/pending_registrations.json";

  if (!fs.existsSync(file)) fs.writeFileSync(file, "{}");

  const pending = JSON.parse(fs.readFileSync(file));
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  pending[m.sender] = { username: q, code };
  fs.writeFileSync(file, JSON.stringify(pending, null, 2));

  // Send a message confirming the registration request
  reply(`✅ Registration code sent!\nUse: \`.verify ${code}\` to verify your registration.`);
});



cmd({
  pattern: "verify",
  desc: "Verify your registration",
  category: "main",
  use: ".verify <code>",
  filename: __filename
}, async (conn, m, mek, { q, reply }) => {
  if (!q) return reply("Please provide your code: `.verify <code>`");

  const fs = require("fs");
  const pendingFile = "./lib/pending_registrations.json";
  const regFile = "./lib/registered_users.json";

  if (!fs.existsSync(pendingFile)) fs.writeFileSync(pendingFile, "{}");
  if (!fs.existsSync(regFile)) fs.writeFileSync(regFile, "[]");

  const pending = JSON.parse(fs.readFileSync(pendingFile));
  const registered = JSON.parse(fs.readFileSync(regFile));

  if (!pending[m.sender]) {
    return reply("❌ No registration request found. Use `.register <username>` first.");
  }

  if (pending[m.sender].code !== q) {
    return reply("❌ Invalid verification code.");
  }

  registered.push({
    id: m.sender,
    username: pending[m.sender].username,
    verifiedAt: new Date().toISOString()
  });

  delete pending[m.sender];

  fs.writeFileSync(pendingFile, JSON.stringify(pending, null, 2));
  fs.writeFileSync(regFile, JSON.stringify(registered, null, 2));

  reply(`✅ You are now verified as *${registered[registered.length - 1].username}*!`);
});




const sudoFile = './lib/sudo.json';

if (!fs.existsSync(sudoFile)) {
  fs.writeFileSync(sudoFile, JSON.stringify([]));
}

const getSudo = () => JSON.parse(fs.readFileSync(sudoFile));
const saveSudo = (list) => fs.writeFileSync(sudoFile, JSON.stringify(list, null, 2));

cmd({
  pattern: "sudo",
  category: "main",
  react: "🛡️",
  desc: "Manage sudo users",
  use: ".sudo add 9476xxxxxxx / .sudo list",
  filename: __filename
}, async (conn, m, mek, { from, q, reply, isCreator }) => {
  if (!isCreator) return reply("*Only owner can use this command.*");

  const args = q.trim().split(" ");
  const mode = args[0];

  if (!mode || (mode !== "add" && mode !== "list" && mode !== "remove"))
    return reply("*Use: .sudo add <number> / .sudo remove <number> / .sudo list*");

  const sudoList = getSudo();

  if (mode === "list") {
    if (sudoList.length === 0) return reply("*No sudo users found.*");
    const listText = sudoList.map((n, i) => `${i + 1}. wa.me/${n}`).join("\n");
    return reply("*Sudo Users:*\n\n" + listText);
  }

  const num = args[1]?.replace(/[^0-9]/g, '');
  if (!num) return reply("*Please provide a valid number.*");

  if (mode === "add") {
    if (sudoList.includes(num)) return reply("*Already a sudo user.*");
    sudoList.push(num);
    saveSudo(sudoList);
    return reply(`*Added sudo:* wa.me/${num}`);
  }

  if (mode === "remove") {
    if (!sudoList.includes(num)) return reply("*Number not in sudo list.*");
    const updated = sudoList.filter(n => n !== num);
    saveSudo(updated);
    return reply(`*Removed sudo:* wa.me/${num}`);
  }
});






cmd({
  pattern: "reporter",
  category: "",
  desc: config.LANG === "si" ? "අංකයක් හිමිකරුට වාර්තා කරන්න" : "Log/report a number to the owner or a file",
  use: ".report <number> <reason>",
  filename: __filename
},
async (conn, mek, m, { reply, q, isOwner }) => {
  try {

	  
    const [rawNumber, ...reasonParts] = q.split(" ");
    const reason = reasonParts.join(" ").trim();

    if (!rawNumber || !/^\d{7,15}$/.test(rawNumber)) {
      return reply(config.LANG === 'si' 
        ? "❌ වලංගු අංකයක් ලබා දෙන්න.\nඋදාහරණය: `.report 94712345678 spam`" 
        : "❌ Provide a valid number.\nUsage: `.report 94712345678 spam`");
    }

    const reportEntry = `Number: ${rawNumber}\nReason: ${reason || "No reason"}\nReported by: ${m.sender}\nTime: ${new Date().toLocaleString()}\n\n`;


    const path = require("path");
    const reportFile = path.join(__dirname, "reports.txt");
    fs.appendFileSync(reportFile, reportEntry);

    reply(config.LANG === 'si' 
      ? `✅ +${rawNumber} සඳහා වාර්තාවක් ලියා ඇත.\nඔබගේ අදහසට ස්තුතියි.` 
      : `✅ Report logged for +${rawNumber}.\nThank you for your feedback.`);
  } catch (err) {
    console.error("Report error:", err);
    reply(config.LANG === 'si' 
      ? "❌ අංකය වාර්තා කිරීමට අසාර්ථක විය. නැවත උත්සාහ කරන්න." 
      : "❌ Failed to report number. Try again.");
  }
});



cmd({
  pattern: "clearchats",
  desc: config.LANG === "si" ? "බොට් වෙතින් සියලු කතා අැලවීම ඉවත් කරන්න" : "Clear all chats from the bot.",
  category: "main",
  react: "🧹",
  filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
  if (!isOwner) return reply(config.LANG === 'si' 
    ? "❌ ඔබට මෙය ක්‍රියාත්මක කිරීමට අයිතියක් නැහැ!" 
    : "❌ You are not the owner!");
  
  try {
    const chats = conn.chats.all();
    for (const chat of chats) {
      await conn.modifyChat(chat.jid, 'delete');
    }
    reply(config.LANG === 'si' 
      ? "🧹 සියලු කතා සාර්ථකව ඉවත් කරන ලදි!" 
      : "🧹 All chats cleared successfully!");
  } catch (error) {
    reply(config.LANG === 'si' 
      ? `❌ කතා ඉවත් කිරීමේ දෝෂයක්: ${error.message}` 
      : `❌ Error clearing chats: ${error.message}`);
  }
});


cmd({
    pattern: "update",
    alias: ["upgrade", "sync"],
    react: '🆕',
    desc: "Update the bot to the latest version.",
    category: "main",
    filename: __filename
}, async (client, message, args, { reply, isOwner }) => {
    // Language variables
    let notOwner, checkingMsg, upToDateMsg, updatingMsg, extractingMsg, replacingMsg, successMsg, failedMsg;

    if (config.LANG === 'si') {
        notOwner = "❌ මෙම විධානය භාවිතා කළ හැක්කේ බොට් හිමිකරුට පමණි.";
        checkingMsg = "🔍 VAJIRA MD X යාවත්කාලීන පරීක්ෂා කරමින්...";
        upToDateMsg = "✅ ඔබේ VAJIRA MD X දැනටමත් නවතම තත්වයට යාවත්කාලීනයි!";
        updatingMsg = "🚀 VAJIRA MD X බොට් යාවත්කාලීන වෙමින්...";
        extractingMsg = "📦 නවතම කේතය උපරිභාග කරමින්...";
        replacingMsg = "🔄 ගොනු ප්‍රතිස්ථාපනය වෙමින්...";
        successMsg = "✅ යාවත්කාලීන කිරීම සම්පුර්ණයි! බොට් නැවත ඇරඹෙමින්...";
        failedMsg = "❌ යාවත්කාලීන කිරීම අසාර්ථක විය. කරුණාකර අතින් උත්සහ කරන්න.";
    } else {
        notOwner = "❌ This command is only for the bot owner.";
        checkingMsg = "🔍 Checking for VAJIRA MD X updates...";
        upToDateMsg = "✅ Your VAJIRA MD X bot is already up-to-date!";
        updatingMsg = "🚀 Updating VAJIRA MD X Bot...";
        extractingMsg = "📦 Extracting the latest code...";
        replacingMsg = "🔄 Replacing files...";
        successMsg = "✅ Update complete! Restarting the bot...";
        failedMsg = "❌ Update failed. Please try manually.";
    }

    if (!isOwner) return reply(notOwner);

    try {
        await reply(checkingMsg);
        const { data: commitData } = await axios.get("https://api.github.com/repos/webscrape2003/VAJIRA-MD/commits/main");
        const latestCommitHash = commitData.sha;
        const currentHash = await getCommitHash();

        if (latestCommitHash === currentHash) {
            return reply(upToDateMsg);
        }

        await reply(updatingMsg);
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get("https://github.com/webscrape2003/VAJIRA-MD/archive/main.zip", { responseType: "arraybuffer" });
        fs.writeFileSync(zipPath, zipData);

        await reply(extractingMsg);
        const extractPath = path.join(__dirname, 'latest');
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        await reply(replacingMsg);
        const sourcePath = path.join(extractPath, "VAJIRA-MD-main");
        const destinationPath = path.join(__dirname, '..');
        copyFolderSync(sourcePath, destinationPath);

        await setCommitHash(latestCommitHash);
        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply(successMsg);
        process.exit(0);
    } catch (error) {
        console.error("Update error:", error);
        return reply(failedMsg);
    }
});




cmd({
  pattern: "channelreact",
  alias: ["chr"],
  react: "📕",
  use: ".channelreact <link>,<reaction>",
  desc: "React to a channel message",
  category: "main",
  filename: __filename,
},
async (conn, mek, m, { q, reply }) => {
  try {
    // Language variables
    let usageMsg, invalidInput, invalidFormat, successMsg, errorMsg;
    
    if (config.LANG === 'si') {
      usageMsg = "*භාවිතය:* .channelreact <link>,<reaction>";
      invalidInput = "*අවලංගු ආදානයක්.* කරුණාකර සබැඳිය හා විකාශය දෙකම ලබාදෙන්න.";
      invalidFormat = "*අවලංගු නාලිකා සබැඳි ආකෘතියක්.*";
      successMsg = (reaction) => `✅ "${reaction}" ලෙස ප්‍රතික්‍රියාවක් යවා ඇත.`;
      errorMsg = (msg) => `❌ දෝෂයක්: ${msg}`;
    } else {
      usageMsg = "*Usage:* .channelreact <channel link>,<emoji>";
      invalidInput = "*Invalid input.* Please provide both the link and the emoji.";
      invalidFormat = "*Invalid channel link format.*";
      successMsg = (reaction) => `✅ Reacted with "${reaction}" to the message.`;
      errorMsg = (msg) => `❌ Error: ${msg}`;
    }

    if (!q || !q.includes(',')) return reply(usageMsg);
    const [link, reaction] = q.split(',').map(v => v.trim());
    if (!link || !reaction) return reply(invalidInput);

    const parts = link.split('/');
    const channelId = parts[4];
    const messageId = parts[5];

    if (!channelId || !messageId) return reply(invalidFormat);

    const res = await conn.newsletterMetadata("invite", channelId);
    await conn.newsletterReactMessage(res.id, messageId, reaction);

    reply(successMsg(reaction));
  } catch (e) {
    console.error(e);
    reply(errorMsg(e.message));
  }
});



cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "main",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    let notOwnerMsg, noMsg, broadcasted;

    if (config.LANG === 'si') {
        notOwnerMsg = "❌ ඔබට මේ විධානය භාවිතා කළ නොහැක!";
        noMsg = "📢 කරුණාකර පණිවිඩයක් ලබාදෙන්න.";
        broadcasted = "📢 පණිවිඩය සියලුම සමූහ වෙත යවා ඇත.";
    } else {
        notOwnerMsg = "❌ You are not the owner!";
        noMsg = "📢 Please provide a message to broadcast.";
        broadcasted = "📢 Message broadcasted to all groups.";
    }

    if (!isOwner) return reply(notOwnerMsg);
    if (args.length === 0) return reply(noMsg);
    const message = args.join(' ');
    const groups = Object.keys(await conn.groupFetchAllParticipating());

    for (const groupId of groups) {
        await conn.sendMessage(groupId, { text: message }, { quoted: mek });
    }

    reply(broadcasted);
});



cmd({
    pattern: "ping",
    react: "📟",
    alias: ["speed","cyber_ping"],
    desc: "To Check bot's ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{ from, l, reply }) => {
try {
    const nima = require("@whiskeysockets/baileys");
    const inital = new Date().getTime();

    let pingingMsg, resultMsg, errorMsg;

    if (config.LANG === 'si') {
        pingingMsg = '*_Vajira බොට් එකට Ping කරනවා..._* ❗';
        resultMsg = (time) => `📍️ *Pong ${time} මිලි තත්පර*`;
        errorMsg = '*දෝෂයකි !!*';
    } else {
        pingingMsg = '*_Pinging to Vajira Module..._* ❗';
        resultMsg = (time) => `📍️ *Pong ${time} Ms*`;
        errorMsg = '*Error !!*';
    }

    let ping = await conn.sendMessage(from , { text: pingingMsg });
    const final = new Date().getTime();
    const steps = ['◍○○○○', '◍◍○○○', '◍◍◍○○', '◍◍◍◍○', '◍◍◍◍◍'];
    
    for (const step of steps) {
        await conn.sendMessage(from, { text: step, edit: ping.key });
    }

    return await conn.sendMessage(from, { text: resultMsg(final - inital), edit: ping.key });

} catch (e) {
    reply(config.LANG === 'si' ? '*දෝෂයකි !!*' : '*Error !!*');
    l(e);
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
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';
        const codeBlock = '```';

        const lang = {
            notOwner: LANG === 'si' ? 'ℹ️ *සමාවෙන්න! මෙය හිමිකරුට පමණක් වේ.*' : 'ℹ️ *Sorry! This is Owner only Command.*',
            noReply: LANG === 'si' ? 'ℹ️ *කරුණාකර පණිවිඩයකට reply කරන්න...*' : 'ℹ️ *Please reply to a message...*',
            error: LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *An error occurred !!*',
            devices: {
                ios: LANG === 'si' ? 'iOS WhatsApp (iPhone)' : 'iOS WhatsApp (iPhone)',
                web: LANG === 'si' ? 'Web WhatsApp' : 'Web WhatsApp',
                baileys: LANG === 'si' ? 'Web WhatsApp (Wiskeysockets/Baileys-WA-Web-Api)' : 'Web WhatsApp (Wiskeysockets/Baileys-WA-Web-Api)',
                queen: LANG === 'si' ? 'Web WhatsApp (QueenAmdi-Wa-Bot)' : 'Web WhatsApp (QueenAmdi-Wa-Bot)',
                cyber: LANG === 'si' ? 'Web WhatsApp (Cyber-X-Wa-Bot)' : 'Web WhatsApp (Cyber-X-Wa-Bot)',
                zero: LANG === 'si' ? 'Web WhatsApp (ZeroTwo-Md-Wa-Bot)' : 'Web WhatsApp (ZeroTwo-Md-Wa-Bot)',
                android: LANG === 'si' ? 'Android WhatsApp' : 'Android WhatsApp',
            }
        };

        if (!isMe) return reply(lang.notOwner);
        if (!m.quoted) return reply(lang.noReply);

        const quotedId = m.quoted.id;
        const target = `@${m.quoted.sender.split('@')[0]}`;
        let deviceType;

        if (quotedId.startsWith("3A")) deviceType = lang.devices.ios;
        else if (quotedId.startsWith("3EB")) deviceType = lang.devices.web;
        else if (quotedId.startsWith("BAE")) deviceType = lang.devices.baileys;
        else if (quotedId.startsWith("QUEENAMDI")) deviceType = lang.devices.queen;
        else if (quotedId.startsWith("CYBER2")) deviceType = lang.devices.cyber;
        else if (quotedId.startsWith("ZEROTWO")) deviceType = lang.devices.zero;
        else deviceType = lang.devices.android;

        await conn.sendMessage(from, {
            text: `${target}  *${LANG === 'si' ? 'භාවිතා කරමින් සිටී:' : 'Is Using:'}* ${codeBlock}${deviceType}${codeBlock}`,
            mentions: [m.quoted.sender]
        });

    } catch (e) {
        reply(`${config.LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *Error occurred !!*'}\n\n${e}`);
        console.error(e);
    }
});




cmd({
  pattern: "system",
  desc: "Shows system info and bot settings",
  category: "main",
  filename: __filename,
  use: ".system",
},
async (conn, mek, m, { reply }) => {
  try {
    const uptime = process.uptime();
    const formattedUptime = moment.utc(uptime * 1000).format("HH:mm:ss");

    const memoryUsage = process.memoryUsage();
    const usedMemory = (memoryUsage.rss / 1024 / 1024).toFixed(2);
    const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
    const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
    const cpuInfo = os.cpus()[0].model;

    const systemInfo = `
*📟 VAJIRA MD X BOT SYSTEM-STATUS*

*🤖 Platform:* ${os.platform()}
*🖥️ Arch:* ${os.arch()}
*💾 Uptime:* ${formattedUptime}
*🧠 RAM Usage:* ${usedMemory} MB / ${totalMem} MB
*⚙️ Free Memory:* ${freeMem} MB
*🔌 CPU:* ${cpuInfo}

*⚙️ Node:* ${process.version}
*📂 Working Dir:* ${process.cwd()}

*🧩 Modules Loaded:* ${Object.keys(require.cache).length}
*👤 User:* ${os.userInfo().username}

${config.FOOTER}
`;

    reply(systemInfo.trim());
  } catch (err) {
    console.error('SystemStatus Error:', err);
    reply('❌ Failed to fetch system status.');
  }
});


cmd({
    pattern: "id",
    react: "🔖",
    desc: "To take Device id",
    category: "main",
    use: '.sv',
    filename: __filename
},    
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? 'ℹ️ *සමාවෙන්න! මෙය හිමිකරුට පමණක් වේ.*' : 'ℹ️ *Sorry! This is Owner only Command.*',
            noReply: LANG === 'si' ? 'ℹ️ *කරුණාකර පණිවිඩයකට reply කරන්න...*' : 'ℹ️ *Please reply to a message...*',
            error: LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *An error occurred !!*',
        };

        if (!isMe) return reply(lang.notOwner);
        if (!m.quoted) return reply(lang.noReply);

        reply(m.quoted.id);
    } catch (e) {
        reply(`${config.LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *Error occurred !!*'}\n\n${e}`);
        console.error(e);
    }
});




cmd({
    pattern: "forward",
    desc: "Forward msgs",
    alias: ["fo"],
    category: "main",
    use: '.forward < Jid address >',
    filename: __filename
},

async (conn, mek, m, { from, isOwner, q, reply }) => {
    const LANG = config.LANG || 'en';

    const lang = {
        ownerOnly: LANG === 'si' ? '*මෙය හිමිකරුට පමණක් වෙයි ❌*' : '*Owner Only ❌*',
        noMessage: LANG === 'si' ? '*කරුණාකර පණිවිඩයක් ලබා දෙන්න ❌*' : '*Please provide a message ❌*',
        noJid: LANG === 'si' ? 'කරුණාකර Jid ලබා දෙන්න' : 'Please provide Jid address',
        forwarded: LANG === 'si' ? '*පණිවිඩය යවන්නේ:*' : '*Message forwarded to:*',
    };

    if (!isOwner) {
        return reply(lang.ownerOnly);
    }

    if (!mek.quoted) {
        return reply(lang.noMessage);
    }

    if (!q) {
        return reply(lang.noJid);
    }

    const data = q.split(",");
    let message = {};
    message.key = mek.quoted?.fakeObj?.key;
    message.message = mek.quoted;

    for (let i = 0; i < data.length; i++) {
        await conn.forwardMessage(data[i], message, false);
    }
    return reply(`${lang.forwarded}\n\n ${data}`);
});




cmd({
    pattern: "sv",
    react: "🔖",
    desc: "To take owner number",
    category: "main",
    use: '.sv',
    filename: __filename
},    
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? 'ℹ️ *සමාවෙන්න! මෙය හිමිකරුට පමණක් වේ.*' : 'ℹ️ *Sorry! This is Owner only Command.*',
            error: LANG === 'si' ? '*දෝෂයක් ඇතිවිය !!*' : '*Error occurred !!*',
            statusReply: LANG === 'si' ? '*whatsapp තත්වයට ප්‍රතිචාර දක්වන්න*' : '*reply to whatsapp status*',
        };

        if (!isMe) return reply(lang.notOwner);

        mek.reply_message && mek.reply_message.status
            ? mek.reply_message
            : false;

        mek.bot.forwardOrBroadCast(from, { quoted: { key: mek.key } });
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

        reply(lang.statusReply);
    } catch (e) {
        reply(lang.error);
        console.error(e);
    }
});



	
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
                    url: `https://telegra.ph/file/03f1eccdcb525a5e1a6ad.jpg`,
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
            'FN:' + 'Vajira' + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: 'Vajira', contacts: [{ vcard }] },
            contextInfo: {
                externalAdReply: {
                    title: 'Vajira',
                    body: 'Touch here.',
                    renderLargerThumbnail: true,
                    thumbnailUrl: ``,
                    thumbnail: `https://telegra.ph/file/b714e9a697c2fd0794985.jpg`,
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
    pattern: "menu2",
    react: "📂",
    alias: ["help"],
    desc: "Get bot\'s command list.",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,  isSachintha, isSavi, isSadas, isMani, isMe,isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try{
    let menuc1 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
if(!commands[i].dontAddCommandList){
menuc1 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc2 = ``
for (let i=0;i<commands.length;i++) { 
  if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
  menuc2 += `*│⩥* .${commands[i].pattern}\n`
  }}};

let menuc3 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
    menuc3 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc4 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'logo'){
  if(!commands[i].dontAddCommandList){
menuc4 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc5 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
menuc5 += `*│►* .${commands[i].pattern}\n`
}}};

let menuc6 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
  menuc6 += `*│⩥* .${commands[i].pattern}\n`
}}};

let menuc7 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'bug'){
if(!commands[i].dontAddCommandList){
  menuc7 += `*│⩥* .${commands[i].pattern}\n`
}}};	

let menuc8 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
if(!commands[i].dontAddCommandList){
  menuc8 += `*│⩥* .${commands[i].pattern}\n`
}}};

let menuc9 = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
if(!commands[i].dontAddCommandList){
  menuc9 += `*│⩥* .${commands[i].pattern}\n`
}}};
     
let menumg = `*Hellow👸* ${pushname}

*╭─     ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*│🕵️‍♂️ 𝘙𝘶𝘯 𝘛𝘪𝘮𝘦 -* ${runtime(process.uptime())} 
*│🕵️‍♂️ 𝘙𝘢𝘮 𝘜𝘴𝘦 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*👸 𝗩𝗔𝗝𝗜𝗥𝗔 𝗠𝗗 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ*
*╭──────────●●►*
*│🧙‍♂️ DOWNLOAD COMMANDS*
*│   ───────*

${menuc1}*╰───────────●●►*
*╭──────────●●►*
*│🧙‍♂️ SEARCH COMMANDS*
*│   ───────*

${menuc2}*╰───────────●●►*

*╭──────────●●►*
*│🧙‍♂️ CONVERT COMMANDS*
*│   ───────*

${menuc3}*╰───────────●●►*

*╭──────────●●►*
*│🧙‍♂️ LOGO COMMANDS*
*│   ───────*

${menuc4}*╰───────────●●►*

*╭──────────●●►*
*│🧙‍♂️ MAIN COMMANDS*
*│   ───────*

${menuc5}*╰───────────●●►*

*╭──────────●●►*
*│🧙‍♂️ GROUP COMMANDS*
*│   ───────*

${menuc6}*╰───────────●●►*
		       
*╭──────────●●►*
*│🧙‍♂️ BUG COMMANDS*
*│   ───────*

${menuc7}*╰───────────●●►*	

*╭──────────●●►*
*│🧙‍♂️ OTHER COMMANDS*
*│   ───────*

${menuc8}*╰───────────●●►*	

*╭──────────●●►*
*│🧙‍♂️ MOVIE COMMANDS*
*│   ───────*

${menuc9}*╰───────────●●►*	

👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ 👨‍💻`	


	    
await conn.sendMessage(from, { image: { url: config.LOGO }, caption: menumg }, { quoted: mek, messageId:genMsgId() })
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
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? 'ℹ️ *සමාවෙන්න! මෙය හිමිකරුට පමණක් වේ.*' : 'ℹ️ *Sorry! This is Owner only Command.*',
            fetching: LANG === 'si' ? 'කරුණාකර කාලයක් රැඳී සිටින්න, ඔබේ සැසිය ලබා ගැනීම...' : 'Wait a moment, currently retrieving your session file',
            error: LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *Error occurred !!*',
        };

        if (!isMe) return await reply(lang.notOwner);

        reply(lang.fetching);
        let sesi = fs.readFileSync('./session/creds.json');
        conn.sendMessage(mek.chat, {
            document: sesi,
            mimetype: 'application/json',
            fileName: 'creds.json'
        }, { quoted: mek });

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        reply(lang.error);
        console.error(e);
    }
});



cmd({
    pattern: "delsession",
    react: "🔖",
    desc: "To delete bot session",
    category: "main",
    use: '.delsession',
    filename: __filename
},
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? 'ℹ️ *සමාවෙන්න! මෙය හිමිකරුට පමණක් වේ.*' : 'ℹ️ *Sorry! This is Owner only Command.*',
            deleting: LANG === 'si' ? 'ජංක ගොනු මකා දමනවා...' : 'Deleting junk files...',
            success: LANG === 'si' ? 'සාර්ථකව සියලුම ද්‍රව්‍ය මකා දැමියහ' : 'Successfully deleted all the trash in the session folder',
            error: LANG === 'si' ? '⛔ *දෝෂයක් ඇතිවිය !!*' : '⛔ *Error occurred !!*',
        };

        if (!isMe) return await reply(lang.notOwner);

        fs.readdir("./session", async function(err, files) {
            if (err) {
                console.log('Unable to scan directory: ' + err);
                return reply('Unable to scan directory: ' + err);
            }
            let filteredArray = files.filter(item => item.startsWith("pre-key") ||
                item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
            );

            let teks = `Detected ${filteredArray.length} junk files\n\n`;
            if (filteredArray.length === 0) return reply();

            filteredArray.forEach((e, i) => {
                teks += `${i + 1}. ${e}\n`;
            });

            reply(teks);
            await sleep(2000);
            reply(lang.deleting);
            await filteredArray.forEach(function(file) {
                fs.unlinkSync(`./session/${file}`);
            });
            await sleep(2000);
            reply(lang.success);
        });

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });
    } catch (e) {
        reply(lang.error);
        console.error(e);
    }
});



cmd({
    pattern: "block",
    react: "🔖",
    desc: "To block a member",
    category: "main",
    use: '.block',
    filename: __filename
},
async(conn, mek, m, { from, isMe, q, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? '🛑 *මෙය හිමිකරුට පමණක් වෙයි...*' : '🛑 *This is an owner command...*',
            error: LANG === 'si' ? '*දෝෂයක් ඇතිවිය !!*' : '*Error occurred !!*',
            blocked: LANG === 'si' ? '*පරිශීලකයා සාර්ථකව අවහිර කරන ලදී*' : '*User successfully blocked*',
        };

        if (!isMe) return await reply(lang.notOwner);

        let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await conn.updateBlockStatus(users, 'block').then((res) => {
            reply(lang.blocked);
        }).catch((err) => {
            reply(lang.error);
        });

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply(lang.error);
        console.error(e);
    }
});




cmd({
    pattern: "unblock",
    react: "🔖",
    desc: "To unblock a member",
    category: "main",
    use: '.unblock',
    filename: __filename
},
async(conn, mek, m, { from, isMe, q, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? '🛑 *මෙය හිමිකරුට පමණක් වෙයි...*' : '🛑 *This is an owner command...*',
            error: LANG === 'si' ? '*දෝෂයක් ඇතිවිය !!*' : '*Error occurred !!*',
            unblocked: LANG === 'si' ? '*පරිශීලකයා සාර්ථකව අවහිරය තහවුරු කරන ලදී*' : '*User successfully unblocked*',
        };

        if (!isMe) return await reply(lang.notOwner);

        let users = mek.mentionedJid ? mek.mentionedJid : mek.quoted ? mek.quoted.sender : q.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        await conn.updateBlockStatus(users, 'unblock').then((res) => {
            reply(lang.unblocked);
        }).catch((err) => {
            reply(lang.error);
        });

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply(lang.error);
        console.error(e);
    }
});


cmd({
    pattern: "shutdown",
    react: "⚙️",
    desc: "To shutdown the bot",
    category: "",
    use: '.shutdown',
    filename: __filename
},
async(conn, mek, m, { from, isMe, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? '🛑 *මෙය හිමිකරුට පමණක් වෙයි...*' : '🛑 *This is an owner command...*',
            shuttingDown: LANG === 'si' ? 'බොට් එක ක්‍රියා නොකිරීමට 10 තත්පර කාලයක් ගතවේ...' : 'Bot shutdown in a few seconds...',
            success: LANG === 'si' ? 'බොට් එක සාර්ථකව නවතා ඇත...✅' : 'Bot has successfully shut down...✅',
        };

        if (!isMe) return await reply(lang.notOwner);

        reply(lang.shuttingDown);
        await sleep(10000); // 10 seconds
        process.exit();

        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply('*🛑 This is an owner command...*');
        console.error(e);
    }
});



cmd({
    pattern: "request",
    react: "🔖",
    desc: "Contact to bot owner",
    category: "main",
    use: '.request',
    filename: __filename
},
async(conn, mek, m, { from, isMe, q, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            noMessage: LANG === 'si' ? 'ආයුබෝවන්, කරුණාකර පැමිණිලි පණිවිඩයක් සපයන්න.' : 'Please provide a report message.',
            sending: LANG === 'si' ? 'සඳහා පණිවිඩය යවා ඇති...🖥️' : 'Sending the report to the owner...🖥️',
            success: LANG === 'si' ? 'ඔබගේ පැමිණිලි පණිවිඩය හිමිකරුවට යවා ඇත. දැනට මොනවා හෝ පරිඝණකයකින් පිළිතුරු ලැබීමට ඉඩ ඇත.' : 'Your report has been forwarded to the owner. Please wait for a response.',
        };

        if (!q) return mek.reply(lang.noMessage);

        const izumilod = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
            "《 ████▒▒▒▒▒▒▒▒》30%",
            "《 ███████▒▒▒▒▒》50%",
            "《 ██████████▒▒》80%",
            "《 ████████████》100%",
            lang.sending
        ];

        let { key } = await conn.sendMessage(from, { text: 'ꜱᴇɴᴅɪɴɢ...' });

        for (let i = 0; i < izumilod.length; i++) {
            await conn.sendMessage(from, { text: izumilod[i], edit: key });
        }

        const messageId = mek.key.id;

        if (reportedMessages[messageId]) {
            return mek.reply("This report has already been forwarded to the owner. Please wait for a response.");
        }

        reportedMessages[messageId] = true;

        const textt = `*| REQUEST/BUG |*`;
        const teks1 = `\n\n*User*: @${m.sender.split("@")[0]}\n*Request/Bug*: ${q}`;
        const teks2 = `\n\n*Hi ${pushname}, your request has been forwarded to my Owners.*\n*Please wait...*`;

        // Send the message to the first owner in the `owner` array
        conn.sendMessage(devlopernumber + "@s.whatsapp.net", {
            text: textt + teks1,
            mentions: [mek.sender],
        }, { quoted: mek });

        mek.reply(lang.success);
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply('*Error !!*');
        console.error(e);
    }
});


cmd({
    pattern: "request2",
    react: "⚙️",
    desc: "Contact to bot owner",
    category: "",
    use: '.request',
    filename: __filename
},
async(conn, mek, m, { from, isMe, q, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            enterBug: LANG === 'si' ? 'කරුණාකර ඔබේ පරීක්ෂණ/දෝෂය දක්වන්න' : 'Enter the bug report.',
            sending: LANG === 'si' ? 'සඳහා පණිවිඩය යවා ඇති...🖥️' : 'Sending the report to the owner...🖥️',
        };

        if (!q) return reply(lang.enterBug);

        var xeonlod = [
            "《 █▒▒▒▒▒▒▒▒▒▒▒》10%",
            "《 ████▒▒▒▒▒▒▒▒》30%",
            "《 ███████▒▒▒▒▒》50%",
            "《 ██████████▒▒》80%",
            "《 ████████████》100%",
            lang.sending
        ];

        let { key } = await conn.sendMessage(from, { text: 'ꜱᴇɴᴅɪɴɢ...' });

        for (let i = 0; i < xeonlod.length; i++) {
            await conn.sendMessage(from, { text: xeonlod[i], edit: key });
        }

        await conn.sendMessage(`94719199757@s.whatsapp.net`, { text: `*Bug Report From:* wa.me/${mek.sender.split("@")[0]}\n\n*Bug Report*\n${q ? q : 'blank'}` });
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply('🛑 This is an owner command...');
        console.error(e);
    }
});



cmd({
    pattern: "setbotbio",
    react: "⚙️",
    desc: "To change bot number bio",
    category: "",
    use: '.setbotbio',
    filename: __filename
},
async(conn, mek, m, { from, isMe, q, reply }) => {
    try {
        const LANG = config.LANG || 'en';

        const lang = {
            notOwner: LANG === 'si' ? '🛑 *මෙය හිමිකරුට පමණක් වෙයි...*' : '🛑 *This is an owner command...*',
            missingText: LANG === 'si' ? 'කොහේද පණිවිඩය?\nඋදාහරණයක්: ' : 'Where is the text?\nExample: ',
            success: LANG === 'si' ? 'සාර්ථකව බොට්ගේ ජංගම අංක බයෝ වෙනස් කරන ලදී...✅' : 'Successfully changed bot number bio...✅',
        };

        if (!isMe) return await reply(lang.notOwner);

        if (!q) return reply(lang.missingText + `.${prefix}setbotbio Hello, I am a bot.`);

        await conn.updateProfileStatus(q);
        reply(lang.success);
        await conn.sendMessage(from, { react: { text: `✅`, key: mek.key } });

    } catch (e) {
        reply('*🛑 This is an owner command...*');
        console.error(e);
    }
});



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
global.imageIndex = (global.imageIndex || 0) % imageList.length;
    const imageUrl = imageList[global.imageIndex];
    global.imageIndex++; // Move to next image for next time

	var msg = mek
		
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
const cap = `${monspace}👋 කොහිමද ${pushname} I'm alive now${monspace}
    
*🚀Version:* ${require("../package.json").version}
*⌛Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*🕒Runtime:* ${runtime(process.uptime())}
*📍Platform:* ${hostname}

🐼This is the result of our teams hard work and our technical cybers team owns the bots rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances And 100 Commands And logo, thumbnail,banner Maker Commands Ai Chatbot feathers On Our Bot
                    
*🌻Have A Nice Day..*🌻`

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



if (config.MODE === 'nonbutton') {
  const sections = [
    {
	title: "",
	rows: [
	    {title: "1", rowId: prefix + 'menu' , description: 'COMMANDS MENU'},
	    {title: "2", rowId: prefix + 'ping' , description: 'VAJIRA-MD SPEED'} ,

	]
    } 
]
const listMessage = {
caption: cap,
image : { url: imageUrl },	
footer: config.FOOTER,
title: '',
buttonText: '*🔢 Reply below number*',
sections
}
	
return await conn.replyList(from, listMessage ,{ quoted : mek })

} if (config.MODE === 'button') {


                  
        conn.sendMessage(from, {
            image: { url: imageUrl },
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









cmd({
  pattern: "menu",
  react: "👨‍💻",
  alias: ["panel", "help", "commands"],
  desc: "Get bot's command list.",
  category: "main",
  use: ".menu",
  filename: __filename
},
async (conn, mek, m, {
  from, prefix, l, quoted, body, isCmd, command, args, q,
  isGroup, sender, senderNumber, botNumber2, botNumber,
  pushname, isMe, isOwner, groupMetadata, groupName,
  participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
  try {
    global.imageIndex = (global.imageIndex || 0) % imageList.length;
    const imageUrl = imageList[global.imageIndex];
    global.imageIndex++;

    const hour = new Date().getHours();
    const greet =
      hour < 12 ? "🌄 Good Morning" :
      hour < 18 ? "🌞 Good Afternoon" : "🌙 Good Night";

    let hostname = os.hostname();
    if (hostname.length == 12) hostname = "replit";
    else if (hostname.length == 36) hostname = "heroku";
    else if (hostname.length == 8) hostname = "koyeb";

    const cap = `
╭───❖ ${greet}, ${pushname || "User"} ❖───╮
│  💬 Type: ${isGroup ? "Group" : "Private"}
│  👥 Name: ${pushname || "Unknown"}
│  🖥 Platform: ${hostname}
│  🚀 Version: ${require("../package.json").version}
│  🧠 Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│  ⏳ Uptime: ${runtime(process.uptime())}
╰──────────────────────────╯
✨ _Reply a number below to view full menu list_`;

    const loadingText = ["Loading ⬛⬛⬜⬜⬜⬜", "Loading ⬛⬛⬛⬛⬜⬜", "Loading ⬛⬛⬛⬛⬛⬛", "✅ Completed"];
    let { key } = await conn.sendMessage(from, { text: '' });

    for (let stage of loadingText) {
      await conn.sendMessage(from, { text: stage, edit: key });
      await new Promise(r => setTimeout(r, 300));
    }

    const sections = [
      {
        title: "📚 Available Command Menus",
        rows: [
          { title: "1", rowId: `${prefix}downmenu`, description: "Download media from various platforms" },
          { title: "2", rowId: `${prefix}searchmenu`, description: "Tools for searching" },
          { title: "3", rowId: `${prefix}convertmenu`, description: "File & media converters" },
          { title: "4", rowId: `${prefix}logomenu`, description: "Text to logo styles" },
          { title: "5", rowId: `${prefix}mainmenu`, description: "Core commands and utilities" },
          { title: "6", rowId: `${prefix}groupmenu`, description: "Group moderation tools" },
          { title: "7", rowId: `${prefix}bugmenu`, description: "Exploit / test commands" },
          { title: "8", rowId: `${prefix}moviemenu`, description: "Movie & TV tools" },
          { title: "9", rowId: `${prefix}othermenu`, description: "Miscellaneous commands" },
        ]
      }
    ];

    const listMessage = {
      caption: cap,
      image: { url: imageUrl },
      footer: config.FOOTER,
      title: '',
      buttonText: '*🔢 Select a Menu*',
      sections
    };

    if (config.MODE === 'nonbutton') {
      return await conn.replyList(from, listMessage, { quoted: mek });
    }

    if (config.MODE === 'button') {


let sections = [{
                title: '🔑 Select menu type',
                rows: [{
                        title: 'DOWNLOAD MENU',
                        description: `Download commands`,
                        id: `${prefix}downmenu`
                    },
                    {
                        title: `SEARCH MENU`,
                        description: 'Search commands',
                        id: `${prefix}searchmenu`
                    },
		    {
                        title: `CONVERT MENU`,
                        description: 'Convert commands',
                        id: `${prefix}convertmenu`
                    },
                    {
                        title: `MAIN MENU`,
                        description: 'Convert commands',
                        id: `${prefix}mainmenu`
                    },
		    {
                        title: `GROUP MENU`,
                        description: 'Group commands',
                        id: `${prefix}groupmenu`
                    },
                    {
                        title: `LOGO MENU`,
                        description: 'Logo commands',
                        id: `${prefix}logomenu`
                    },
		    {
                        title: `BUG MENU`,
                        description: 'Bug commands',
                        id: `${prefix}bugmenu`
                    },
                    {
                        title: `MOVIE MENU`,
                        description: 'Movie commands',
                        id: `${prefix}moviemenu`
                    },   
		    {
                        title: `OTHER MENU`,
                        description: 'Other commands',
                        id: `${prefix}othermenu`
                    },      
                ]
            }
        ]

        let listMessage = {
            title: 'Click Here⎙',
            sections
        };
	
      await conn.sendMessage(from, {
        image: { url: imageUrl },
        caption: cap,
        footer: config.FOOTER,
        buttons: [
          { buttonId: `${prefix}alive`, buttonText: { displayText: "✅ ALIVE" } },
          { buttonId: `${prefix}ping`, buttonText: { displayText: "📶 PING" } },
          {
            buttonId: "action",
            buttonText: { displayText: "📂 Open Menu" },
            type: 4,
            nativeFlowInfo: {
              name: "single_select",
              paramsJson: JSON.stringify(listMessage),
            },
          },
        ],
        headerType: 1,
        viewOnce: true
      }, { quoted: m });
    }

  } catch (e) {
    reply("❌ Error occurred!");
    l(e);
  }
});








//============================================================================	

cmd({
  pattern: "downmenu",
  react: "⬇️",
  desc: "List all download-related commands",
  category: "menu",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    const category = q.trim().toUpperCase() || "DOWNLOAD";
    const matchedCmds = commands.filter(cmd => cmd.category.toUpperCase() === category && !cmd.dontAddCommandList);

    if (!matchedCmds.length) return reply(`❌ No commands found under *${category}*.`);

    let menuText = `╭━━━┫ *${category} COMMANDS MENU* ┣━━━╮\n`;
    menuText += `┃\n┃ ⬇️ *Download Everything You Need!*\n┃ Tools for grabbing videos, audio, files, and more.\n┃\n`;

    matchedCmds.forEach(cmd => {
      menuText += `┃ 📥 *${cmd.pattern}*\n┃    ├ 📝 Desc: _${cmd.desc}_\n┃    └ 🧩 Use: \`${cmd.use || "." + cmd.pattern}\`\n┃\n`;
    });

    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    menuText += `✅ *Total ${category} Commands:* ${matchedCmds.length}\n\n✨ Powered by *TDD Team* • *Vajira MD*`;

    await conn.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 888,
        isForwarded: true,
        externalAdReply: {
          title: '⬇️ ᴠᴀᴊɪʀᴀ ᴍᴅ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ',
          body: 'Grab music, videos, reels, and more instantly!',
          mediaType: 1,
          sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          thumbnailUrl: config.LOGO,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log("Error in downmenu:", e);
    reply("❌ Failed to load download menu.");
  }
});



cmd({
  pattern: "moviemenu",
  react: "🎬",
  desc: "List all movie-related commands",
  category: "menu",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    const category = q.trim().toUpperCase() || "MOVIE";
    const matchedCmds = commands.filter(cmd => cmd.category.toUpperCase() === category && !cmd.dontAddCommandList);

    if (!matchedCmds.length) return reply(`❌ No commands found under *${category}*.`);

    let menuText = `╭━━━┫ *${category} COMMANDS MENU* ┣━━━╮\n`;
    menuText += `┃\n┃ 🎥 *Your Personal Cinema Tools*\n┃ Search, download or stream your favorite content!\n┃\n`;

    matchedCmds.forEach(cmd => {
      menuText += `┃ 🎬 *${cmd.pattern}*\n┃    ├ 📝 Desc: _${cmd.desc}_\n┃    └ 🧩 Use: \`${cmd.use || "." + cmd.pattern}\`\n┃\n`;
    });

    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    menuText += `✅ *Total ${category} Commands:* ${matchedCmds.length}\n\n✨ Powered by *TDD Team* • *Vajira MD*`;

    await conn.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 888,
        isForwarded: true,
        externalAdReply: {
          title: '🎬 ᴠᴀᴊɪʀᴀ ᴍᴅ ᴍᴏᴠɪᴇ ᴛᴏᴏʟꜱ',
          body: 'Enjoy fast movie searching & downloading!',
          mediaType: 1,
          sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          thumbnailUrl: config.LOGO,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log("Error in moviemenu:", e);
    reply("❌ Failed to load movie menu.");
  }
});



cmd({
  pattern: "searchmenu",
  react: "🔍",
  desc: "List all search-based commands",
  category: "menu",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    const category = q.trim().toUpperCase() || "SEARCH";
    const matchedCmds = commands.filter(cmd => cmd.category.toUpperCase() === category && !cmd.dontAddCommandList);

    if (!matchedCmds.length) return reply(`❌ No commands found under *${category}*.`);

    let menuText = `╭━━━┫ *${category} COMMANDS MENU* ┣━━━╮\n`;
    menuText += `┃\n┃ 🔍 *Discover Anything Instantly!*\n┃ Use these commands to fetch results across platforms.\n┃\n`;

    matchedCmds.forEach(cmd => {
      menuText += `┃ 📡 *${cmd.pattern}*\n┃    ├ 📝 Desc: _${cmd.desc}_\n┃    └ 🧩 Use: \`${cmd.use || "." + cmd.pattern}\`\n┃\n`;
    });

    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    menuText += `✅ *Total ${category} Commands:* ${matchedCmds.length}\n\n✨ Powered by *TDD Team* • *Vajira MD*`;

    await conn.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 888,
        isForwarded: true,
        externalAdReply: {
          title: '🔍 ᴠᴀᴊɪʀᴀ ᴍᴅ ꜱᴇᴀʀᴄʜ ᴛᴏᴏʟꜱ',
          body: 'Fast access to search features!',
          mediaType: 1,
          sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          thumbnailUrl: config.LOGO,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log("Error in searchmenu:", e);
    reply("❌ Failed to load search menu.");
  }
});


cmd({
  pattern: "convertmenu",
  react: "🔄",
  desc: "Shows all file conversion tools",
  category: "menu",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    const category = q.trim().toUpperCase() || "CONVERT";
    const matchedCmds = commands.filter(cmd => cmd.category.toUpperCase() === category && !cmd.dontAddCommandList);

    if (!matchedCmds.length) return reply(`❌ No commands found under *${category}*.`);

    let menuText = `╭━━━┫ *${category} TOOLS MENU* ┣━━━╮\n`;
    menuText += `┃\n┃ 🔄 *Your Toolbox for All File Conversion*\n┃ Convert anything: media, docs, stickers & more!\n┃\n`;

    matchedCmds.forEach(cmd => {
      menuText += `┃ 📎 *${cmd.pattern}*\n┃    ├ 📝 Desc: _${cmd.desc}_\n┃    └ 🧩 Use: \`${cmd.use || "." + cmd.pattern}\`\n┃\n`;
    });

    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    menuText += `✅ *Total ${category} Commands:* ${matchedCmds.length}\n\n`;
    menuText += `✨ Powered by *TDD Team* • *Vajira MD*`;

    await conn.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 888,
        isForwarded: true,
        externalAdReply: {
          title: '🔄 ᴠᴀᴊɪʀᴀ ᴍᴅ ᴄᴏɴᴠᴇʀᴛ ᴍᴇɴᴜ',
          body: 'All your conversion needs — in one place.',
          mediaType: 1,
          sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          thumbnailUrl: config.LOGO,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log("Error in convertmenu:", e);
    reply("❌ Failed to load convert menu.");
  }
});



cmd({
  pattern: "logomenu",
  react: "🖼️",
  desc: "Displays all logo generation tools",
  category: "menu",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m, { from, q, reply }) => {
  try {
    const category = q.trim().toUpperCase() || "LOGO";
    const matchedCmds = commands.filter(cmd => cmd.category.toUpperCase() === category && !cmd.dontAddCommandList);

    if (!matchedCmds.length) return reply(`❌ No commands found under *${category}*.`);

    let menuText = `╭━━━┫ *${category} CREATOR MENU* ┣━━━╮\n`;
    menuText += `┃\n┃ 🖼️ *Unleash Creativity With Stylish Logos!*\n┃ Explore various artistic logo commands below:\n┃\n`;

    matchedCmds.forEach(cmd => {
      menuText += `┃ ✨ *${cmd.pattern}*\n┃    ├ 📝 Desc: _${cmd.desc}_\n┃    └ 🧩 Use: \`${cmd.use || "." + cmd.pattern}\`\n┃\n`;
    });

    menuText += `╰━━━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
    menuText += `✅ *Total ${category} Commands:* ${matchedCmds.length}\n\n`;
    menuText += `✨ Created by *TDD Team* • *Vajira MD*`;

    await conn.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 888,
        isForwarded: true,
        externalAdReply: {
          title: '🖼️ ᴠᴀᴊɪʀᴀ ᴍᴅ ʟᴏɢᴏ ᴍᴇɴᴜ',
          body: 'Stylish logo generators, ready to use.',
          mediaType: 1,
          sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z",
          thumbnailUrl: config.LOGO,
          renderLargerThumbnail: true,
          showAdAttribution: false
        }
      }
    }, { quoted: mek });

  } catch (e) {
    console.log("Error in logomenu:", e);
    reply("❌ Failed to load logo menu.");
  }
});



cmd({
  pattern: "mainmenu",
  react: "🧠",
  desc: "Displays main category commands",
  category: "menu",
  dontAddCommandList: tins, isAdmins, reply}) => {
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
                    url: `https://telegra.ph/file/03f1eccdcb525a5e1a6ad.jpg`,
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
                    title: 'zanta',
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
    pattern: "request",
    react: "🔖",
    desc: "Contact to bot owner",
    category: "main",
    use: '.rsquest2',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{       
if (!q) return mek.reply(`Example: ${prefix + command} hi vajira play command is not working`)

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

    const textt = `*| REQUEST/BUG |*`
    const teks1 = `\n\n*User*: @${m.sender.split("@")[0]}\n*Request/Bug*: ${q}`
    const teks2 = `\n\n*Hi ${pushname}, your request has been forwarded to my Owners.*\n*Please wait...*`

    // Send the message to the first owner in the `owner` array
    conn.sendMessage(devlopernumber + "@s.whatsapp.net", {
        text: textt + teks1,
        mentions: [mek.sender],
    }, {
        quoted: mek,
    });

    // Send a reply to the user
    mek.reply("Tʜᴀɴᴋ ʏᴏᴜ ꜰᴏʀ ʏᴏᴜʀ ʀᴇᴘᴏʀᴛ. Iᴛ ʜᴀs ʙᴇᴇɴ ꜰᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ ᴛʜᴇ ᴏᴡɴᴇʀ. Pʟᴇᴀsᴇ ᴡᴀɪᴛ ꜰᴏʀ ᴀ ʀᴇsᴘᴏɴsᴇ.")
  await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply('*Error !!*')
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

                  await conn.sendMessage(`94719199757@s.whatsapp.net`, {text: `*Bug Report From:* wa.me/${mek.sender.split("@")[0]}\n\n*Bug Report*\n${q ? q : 'blank'}` })
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
                if (!q) return reply(`Where is the text?\nExample: ${prefix + command} izumi Bot`)
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
    pattern: "downmenu",
    react: "⬇👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'	

  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){

menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
    pattern: "moviemenu",
    react: "⬇👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'	

  for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'movie'){
  if(!commands[i].dontAddCommandList){

menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
    pattern: "searchmenu",
    react: "👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
    pattern: "convertmenu",
    react: "👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
    pattern: "logomenu",
    react: "👨‍💻",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'logo'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
  pattern: "mainmenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})


cmd({
  pattern: "groupmenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})

cmd({
  pattern: "bugmenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'bug'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

  
        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
    }
})

cmd({
  pattern: "othermenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const category = q.trim().toUpperCase();
let menuc = `*◈╾──────${category} SUB COMMAND LIST──────╼◈*\n\n> Select you want command type and enjoy vajira md whatsapp bot 👨‍💻\n\n`;
        let wm = '*ᴠᴀᴊɪʀᴀ ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴛʜᴇ ᴛᴇᴀᴍ • ᴛᴅᴅ*'
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
if(!commands[i].dontAddCommandList){
menuc += `╭────────●●►\n│ • *${commands[i].pattern}* \n╰────────────────────●●►\n`
}}};
  menuc += `\n⭓ *Total Commands List ${category}*: ${commands.filter(cmd => cmd.category.toUpperCase() === category).length}\n\n${wm}`

  
        //await conn.sendMessage(from, { text: commandList }, { quoted: mek });
        await conn.sendMessage(from, {
text: menuc,
  contextInfo: {
    mentionedJid: [ '' ],
    groupMentions: [],
    forwardingScore: 1111,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363290448968237@newsletter',
      serverMessageId: 127
    },
externalAdReply: { 
title: '👨‍💻 ᴠᴀᴊɪʀᴀ ᴍᴅ ʙʏ ᴛᴅᴅ ᴛᴇᴀᴍ 👨‍💻',
body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
mediaType: 1,
sourceUrl: "https://whatsapp.com/channel/0029VahMZasD8SE5GRwzqn3Z" ,
thumbnailUrl: config.LOGO ,
renderLargerThumbnail: true,
showAdAttribution: false
}
}}, { quoted: mek})
    } catch (e) {
        reply('*Error !!*')
        console.log(e)
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
		    
	    
