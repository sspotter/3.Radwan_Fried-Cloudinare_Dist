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

    try {
        console.log('Attempting to list resources...');
        const result = await cloudinary.api.resources({ max_results: 5 });
        console.log('Success! Found', result.resources.length, 'resources.');
    } catch (error) {
        console.error('Error listing resources:', error.message);
    }

    try {
        console.log('Attempting to list folders...');
        const response = await cloudinary.api.root_folders();
        console.log('Success! Found', response.folders.length, 'folders:', response.folders.map(f => f.name));
    } catch (error) {
        console.error('Error listing folders:', error.message);
    }
}

testCloudinary();
