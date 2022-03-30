const withPlugins = require('next-compose-plugins');
const { i18n } = require('./next-i18next.config');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const { withSentryConfig } = require('@sentry/nextjs');

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withVanillaExtract = createVanillaExtractPlugin();

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  i18n,
  eslint: {
    dirs: ['__tests__', 'src'],
  },
};

module.exports = withPlugins(
  [withVanillaExtract, withSentryConfig(nextConfig, sentryWebpackPluginOptions), withBundleAnalyzer],
  nextConfig
);
