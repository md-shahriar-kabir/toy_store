

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com"', // আপনার ইমেজের ডোমেইন নাম এখানে দিন
        port: '',
        pathname: '/**', // সব পাথের ইমেজ এলাউ করার জন্য
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // যদি গুগল অ্যাভাটার ব্যবহার করেন
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;