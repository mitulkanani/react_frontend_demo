/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [
    optimizedImages,
    {
      inlineImageLimit: 4096,
      optimizeImages: false,
    },
  ],
  [
    withBundleAnalyzer,
    {
      eslint: {
        dirs: ['.'],
      },
      poweredByHeader: false,
      trailingSlash: false,
      basePath: '',
      // The starter code load resources from `public` folder with `router.basePath` in React components.
      // So, the source code is "basePath-ready".
      // You can remove `basePath` if you don't need it.
      reactStrictMode: true,
    },
  ],
]);
