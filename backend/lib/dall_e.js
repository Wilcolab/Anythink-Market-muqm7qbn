const { Configuration, OpenAIApi } = require("openai");
       
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function createImage(prompt, size) {
    try {
        const response = await openai.createImage({
            prompt,
            size,
          });
        return response.data;
    } catch (error) {
        console.error(`failed to create image with prompt ${prompt}`)
    }
}

module.exports = {
    createImage,
}
