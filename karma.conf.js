// Karma configuration
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'test/px-test.js',
      'bower_components/jquery/dist/jquery.min.js',
      'test/lib/jasmine-fixture.min.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',

      //App Bower components
      {pattern: 'bower_components/webcomponentsjs/webcomponents.js', included: true},

      // Main source file (true to include)
      {pattern: 'bower_components/test/px-rangepicker.html', included: true},

      // source files which will be pulled in with html imports
      {pattern: 'bower_components/polymer/*.html', included: false},
      {pattern: 'bower_components/test/px-timepicker.html', included: false},
      {pattern: 'bower_components/test/px-calendar.html', included: false},
      {pattern: 'bower_components/test/px-datepicker.html', included: false},
      {pattern: 'bower_components/test/px-time-input.html', included: false},
      {pattern: 'bower_components/test/px-range-field.html', included: false},
      {pattern: 'bower_components/moment/moment.js', included: false},

      // used in tests
      {pattern: 'bower_components/moment/moment.js', included: true},

      //Tests
      {pattern: 'test/*-spec.js', included: true}

    ],

    // list of files / patterns to exclude
    exclude: [
      'bower_components/**/*-spec.*'
    ],
    plugins: [
      // these plugins will be require() by Karma
      'karma-coverage',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-script-launcher',
      'karma-phantomjs-launcher'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'junit', 'coverage'],


    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
    // config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    client: {
      captureConsole: true,
      useIframe: false
    },

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],
    captureTimeout: 60000,


    /**
     * The preprocessors available will be for CoffeeScript specs/src
     * Code Coverage
     * HTML2JS Note any .html files listed in the files section must be referenced at run time as window.__html__['template.html'].
     * and NG-html2js
     *
     **/
    preprocessors: {
      'public/scripts/**/*.js': ['coverage']
    },

    /**
     * Code Coverage options
     */
    coverageReporter: {
      type: 'html',
      dir: 'test-target/coverage'
    },

    /**
     * JUnit Reporter options
     */
    junitReporter: {
      outputFile: 'test-target/junit.xml',
      suite: 'unit'
    },

    /**
     * CoffeeScript options
     */
    coffeePreprocessor: {
      options: {
        bare: true
      }
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
