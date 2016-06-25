const webpack = require("webpack")
const path = require("path")

const webpackConfig = require('./webpack.config.js')
const browsers = require('./browsers.json')

module.exports = function(config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
    process.exit(1)
  }

  config.set({
    basePath: "",
    frameworks: ["mocha", "chai"],
    files: [
      "./test/**.test.ts"
    ],
    preprocessors: {
      "./test/**.test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-chai"),
      // require("karma-chrome-launcher"),
      require("karma-sauce-launcher"),
    ],
    reporters: ["dots", "saucelabs"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    sauceLabs: {
      testName: "injectd",
      recordScreenshots: false,
      connectOptions: {
        port: 5757,
        logfile: "sauce_connect.log"
      },
      public: "public"
    },

    // Increase timeout in case connection in CI is slow
    captureTimeout: 120000,

    customLaunchers: browsers,
    browsers: Object.keys(browsers),
    singleRun: true
  });
};
