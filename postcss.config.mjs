/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, 
    // autoprefixer: {}, // Tailwind v4 এ অটোপ্রিফিক্সার বিল্ট-ইন থাকে, তাই আলাদা করে লাগে না
  },
};

export default config;