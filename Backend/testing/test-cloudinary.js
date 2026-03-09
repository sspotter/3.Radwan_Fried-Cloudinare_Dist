/* eslint-disable @typescript-eslint/no-require-imports */
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function testCloudinary() {
    console.log('Testing Cloudinary configuration...');
    console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);

    try {
        console.log('Attempting to list resources...');
        const result = await cloudinary.api.resources({ max_results: 5 });
        console.log('Success! Found', result.resources.length, 'resources.');
    } catch (error) {
        console.error('Error listing resources:', error.message);
        if (error.http_code === 401) {
            console.error('Invalid credentials.');
        }
    }

    try {
        console.log('Attempting to use Search API...');
        const searchResult = await cloudinary.search
            .expression('resource_type:image')
            .max_results(5)
            .execute();
        console.log('Search API Success! Found', searchResult.resources.length, 'resources.');
    } catch (error) {
        console.error('Search API Error:', error.message);
        if (error.message.includes('Search API is not enabled')) {
            console.error('IMPORTANT: The Search API must be enabled in your Cloudinary Settings -> Product Environments -> Security -> Restricted image types (uncheck "Resource list") or contact support.');
        }
    }
}

testCloudinary();
