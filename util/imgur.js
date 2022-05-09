const axios = require('axios');
var FormData = require('form-data');

/********************************
 * Create an image on Imgur from the recipe image
 * This has to be done this way because the images
 * returned by the API have an expiration token and
 * cannot be saved for future reference because the
 * image request will return a 403 forbidden error
 * if the image is requested much later than
 * it was stored in the database
 *******************************/

const createImgurImage = async (imageUrl) => {
  const data = new FormData();
  data.append('image', imageUrl);
  var config = {
    method: 'post',
    url: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      ...data.getHeaders()
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data.data.link;
  } catch (err) {
    console.log(error);
    throw new Error(error);
  }
};

exports.createImgurImage = createImgurImage;
