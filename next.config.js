/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'firebasestorage.googleapis.com', // Add this line to allow images from Firebase Storage
            // Add any other domains you want to allow here
        ],
    },
};
module.exports = nextConfig
