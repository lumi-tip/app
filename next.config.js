// const nextRuntimeDotenv = require('next-runtime-dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { i18n } = require('./next-i18next.config');

// const withConfig = nextRuntimeDotenv({
//   // path: '.env',
//   public: ['MY_API_URL', 'NEXT_PUBLIC_ID'],
//   server: ['GITHUB_TOKEN'],
// });

const dev = process.env.NODE_ENV !== 'production';

const defaultEnpoint = dev ? process.env.BREATHECODE_HOST : 'https://breathecode-test.herokuapp.com';

module.exports = withBundleAnalyzer({
  // rest of config here
  i18n,
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    BREATHECODE_HOST: defaultEnpoint,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    BREATHECODE_HOST: defaultEnpoint,
    NEXT_PUBLIC_ID: process.env.NEXT_PUBLIC_ID,
  },
  images: {
    // whitelist for image providers
    domains: ['assets.vercel.com', 'github.com', 'raw.githubusercontent.com'],
    // formats: ['image/avif', 'image/webp'],
  },
  env: {
    BREATHECODE_HOST: defaultEnpoint,
    BC_ACADEMY_TOKEN: process.env.BC_ACADEMY_TOKEN,
  },
});
