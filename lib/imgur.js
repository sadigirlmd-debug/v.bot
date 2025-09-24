const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

class ImgurUploader {
  constructor(clientId) {
    if (!clientId) {
      throw new Error('Imgur Client ID is required');
    }
    this.clientId = clientId;
  }

  /**
   * Uploads an image to Imgur
   * @param {string} imagePath - The local file path of the image
   * @returns {Promise<string>} - The Imgur image URL
   */
  async uploadImage(imagePath) {
    if (!fs.existsSync(imagePath)) {
      throw new Error('File does not exist');
    }

    try {
      const data = new FormData();
      data.append('image', fs.createReadStream(imagePath));

      const headers = {
        'Authorization': `Client-ID ${this.clientId}`,
        ...data.getHeaders()
      };

      const response = await axios.post('https://api.imgur.com/3/image', data, { headers });

      return response.data.data.link;
    } catch (error) {
      console.error('Error uploading to Imgur:', error.response?.data?.message || error.message);
      throw new Error('Failed to upload image to Imgur.');
    }
  }
}

module.exports = ImgurUploader;
