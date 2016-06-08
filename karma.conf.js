const webpackConfig = require('./webpack.config')

const testEnableWatch = process.env.TEST_WATCH || false

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !testEnableWatch,
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
      },
    },
    logLevel: config.LOG_DEBUG,
    files: [
      './webpack.tests.js',
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-mocha-clean-reporter',
      'karma-sinon',
      'karma-sinon-chai',
    ],
    preprocessors: {
      './webpack.tests.js': ['webpack'],
    },
    reporters: ['mocha-clean'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
      stats: 'errors-only',
    },
    autoWatch: true,
  })
}
