const axios = require("axios");
const crypto = require("crypto");
const UserAgent = require("user-agents");

const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info",
    download: "/download"
  },

  headers: {
    accept: "*/*",
    "content-type": "application/json",
    origin: "https://yt.savetube.me",
    referer: "https://yt.savetube.me/",
    "user-agent": new UserAgent().toString(),
    "x-forwarded-for":
      Math.floor(Math.random() * 256) + "." +
      Math.floor(Math.random() * 256) + "." +
      Math.floor(Math.random() * 256) + "." +
      Math.floor(Math.random() * 256)
  },

  formats: ["144", "240", "360", "480", "720", "1080", "mp3"],

  crypto: {
    hexToBuffer: hexString => {
      const pairs = hexString.match(/.{1,2}/g);
      return Buffer.from(pairs.join(""), "hex");
    },

    decrypt: async encryptedBase64 => {
      try {
        const buffer = Buffer.from(encryptedBase64, "base64");
        const iv = buffer.slice(0, 16);
        const content = buffer.slice(16);

        const key = savetube.crypto.hexToBuffer(
          "C5D58EF67A7584E4A29F6C35BBC4EB12"
        );

        const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
        let decrypted = decipher.update(content);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return JSON.parse(decrypted.toString());
      } catch (err) {
        throw new Error("Decryption error: " + err.message);
      }
    }
  },

  isUrl: url => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  extractYoutubeId: url => {
    if (!url) return null;

    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];

    for (let regex of patterns) {
      if (regex.test(url)) {
        return url.match(regex)[1];
      }
    }

    return null;
  },

  request: async (endpoint, params = {}, method = "post") => {
    try {
      const { data } = await axios({
        method,
        url: (endpoint.startsWith("http") ? "" : savetube.api.base) + endpoint,
        data: method === "post" ? params : undefined,
        params: method === "get" ? params : undefined,
        headers: savetube.headers
      });

      return {
        status: true,
        creator: "NBT",
        code: 200,
        response: data
      };
    } catch (err) {
      return {
        status: false,
        creator: "NBT",
        code: err.response?.status || 500,
        error: "Request error: " + err.message
      };
    }
  },

  getCDN: async () => {
    const result = await savetube.request(savetube.api.cdn, {}, "get");
    if (!result.status) return result;

    return {
      status: true,
      creator: "NBT",
      code: 200,
      response: result.response.cdn
    };
  },

  download: async (url, format) => {
    if (!url) {
      return {
        status: false,
        creator: "NBT",
        code: 400,
        error: "Please provide a link to download."
      };
    }

    if (!savetube.isUrl(url)) {
      return {
        status: false,
        creator: "NBT",
        code: 400,
        error: "The provided link is not valid. Make sure it is a YouTube link."
      };
    }

    if (!format || !savetube.formats.includes(format)) {
      return {
        status: false,
        creator: "NBT",
        code: 400,
        error: "Invalid format. Use one of the available formats.",
        available_formats: savetube.formats
      };
    }

    const videoId = savetube.extractYoutubeId(url);
    if (!videoId) {
      return {
        status: false,
        creator: "NBT",
        code: 400,
        error: "Could not extract video ID. Check the YouTube link."
      };
    }

    try {
      const cdnData = await savetube.getCDN();
      if (!cdnData.status) return cdnData;

      const cdn = cdnData.response;

      // Get video info
      const infoResponse = await savetube.request(
        "https://" + cdn + savetube.api.info,
        { url: "https://www.youtube.com/watch?v=" + videoId }
      );
      if (!infoResponse.status) return infoResponse;

      const decryptedInfo = await savetube.crypto.decrypt(infoResponse.response.data);

      // Get download link
      const downloadResponse = await savetube.request(
        "https://" + cdn + savetube.api.download,
        {
          id: videoId,
          downloadType: format === "mp3" ? "audio" : "video",
          quality: format,
          key: decryptedInfo.key
        }
      );

      return {
        status: true,
        creator: "NBT",
        code: 200,
        response: {
          title: decryptedInfo.title || "Unknown",
          type: format === "mp3" ? "audio" : "video",
          format: format,
          thumbnail: decryptedInfo.thumbnail ||
                     "https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg",
          download: downloadResponse.response.data.downloadUrl,
          id: videoId,
          key: decryptedInfo.key,
          duration: decryptedInfo.duration,
          quality: format,
          downloaded: downloadResponse.response.data.downloaded || false
        }
      };
    } catch (err) {
      return {
        status: false,
        creator: "NBT",
        code: 500,
        error: "Error during download: " + err.message
      };
    }
  }
};

module.exports = savetube;
