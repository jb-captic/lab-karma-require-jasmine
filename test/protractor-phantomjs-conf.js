'use strict';

var versionSelenium = require('../node_modules/protractor/package.json').webdriverVersions.selenium;

var config = require('./protractor-shared-conf').config;

    // The address of a running selenium server.
config.seleniumServerJar= '../node_modules/protractor/selenium/selenium-server-standalone-'+versionSelenium+'.jar';
config.seleniumPort= 4444;
config.seleniumArgs= ['-browserTimeout=6'];
    // Options to be passed to Jasmine-node.


config.capabilities = {
        'browserName': 'phantomjs',
        'phantomjs.binary.path' : './node_modules/phantomjs/bin/phantomjs',
        'phantomjs.cli.args': ['--debug=true']//, '--webdriver', '--webdriver-logfile=webdriver.log', '--webdriver-loglevel=DEBUG']
};

exports.config = config;
