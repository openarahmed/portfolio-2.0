/** @type {import('next').NextConfig} */
const nextConfig = {
  // Netlify বা Docker এ ডেপ্লয়মেন্টের জন্য standalone মোড ভালো
  output: 'standalone', 
  
  reactStrictMode: true,

  images: {
    // 🔥 FIX: ইমেজ অপ্টিমাইজেশন বন্ধ (Universal Support)
    // এর ফলে যেকোনো লিংক থেকে ছবি লোড হবে এবং সার্ভারে লোড কমবে।
    unoptimized: true, 
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // সব ডোমেইন অ্যালাউ করা হলো (Wildcard)
      },
    ],
  },
};

module.exports = nextConfig;