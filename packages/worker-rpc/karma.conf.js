// Karma configuration
// Generated on Fri Apr 06 2018 16:51:19 GMT+0800 (CST)

module.exports = config => config.set({

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',


  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha'],


  // list of files / patterns to load in the browser
  files: [
    { pattern: 'test/**/*-test.js', watched: false },
    { pattern: 'test/**/test-worker.js', watched: true, included: false },
  ],


  // list of files / patterns to exclude
  exclude: [
  ],


  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'test/**/*-test.js': ['webpack', 'sourcemap'],
    'test/**/test-worker.js': ['webpack', 'sourcemap'],
  },


  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['progress'],


  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values:
  //    config.LOG_DISABLE
  //    config.LOG_ERROR
  //    config.LOG_WARN
  //    config.LOG_INFO
  //    config.LOG_DEBUG
  logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: [config.singleRun ? 'ChromeHeadless' : 'Chrome'],


  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity,

  // Webpack config
  webpack: {
    mode: 'development',
    devtool: 'inline-source-map',
  },
});
