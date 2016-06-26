const webpack = require("webpack")
const path = require("path")

const webpackConfig = require('./webpack.config.js')
const browsers = require('./browsers.json')

module.exports = function(config) {
  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    config.set(require('./karma.conf.local.js')(config));
  } else {
    config.set(require('./karma.conf.remote.js')(config));
  }
};
