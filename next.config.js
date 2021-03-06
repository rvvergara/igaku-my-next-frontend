const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
require('dotenv').config();

module.exports = withCSS(
  withSass({
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
    env: {
      API_URL: process.env.API_URL,
    },
    publicRuntimeConfig: {
      localeSubpaths:
        typeof process.env.LOCALE_SUBPATHS === 'string'
          ? process.env.LOCALE_SUBPATHS
          : 'none',
    },
  }),
);
