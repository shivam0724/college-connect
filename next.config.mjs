/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PORT: process.env.PORT,
        API: process.env.API,
        AUTH_SECRET: process.env.AUTH_SECRET,
        MONGO_URI: process.env.MONGO_URI
    },
    devIndicators: false,
};

export default nextConfig;
