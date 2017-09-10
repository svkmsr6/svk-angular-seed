//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'components/**/*.js',
      'view*/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-html-reporter',
      'karma-coverage'
    ],

    preprocessors: {
      // source files, that you wanna generate coverage for 
      // do not include tests or libraries 
      // (these files will be instrumented by Istanbul) 
      'view*/**/*.js': ['coverage']
    },

    reporters: ['progress', 'html','coverage'],

    // the default configuration
    htmlReporter: {
      outputDir: 'karma_html', // where to put the reports 
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'svk-angular-app-report-summary', // report summary filename; browser info by default     
      // experimental
      preserveDescribeNesting: false, // folded suites stay folded 
      foldAll: false, // reports start folded (only with preserveDescribeNesting)
    },  

    // optionally, configure the reporter 
    coverageReporter: {
      type : 'html',
      dir : 'coverage'
    }
   
    // junitReporter: {
    //   outputFile: 'test_out/unit.xml',
    //   suite: 'unit'
    // }

  });
};
