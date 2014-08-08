// Generated on 2014-07-23 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    test: 'test'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    
    project: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json']/*,
        tasks: ['wiredep']*/
      },
      js: {
        files: ['<%= project.app %>/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      styles: {
        files: ['<%= project.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= project.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= project.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= project.app %>/**/*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= project.dist %>/{,*/}*',
            '!<%= project.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      options: {
        cwd: '<%= project.app %>'
      },
      app: {
        src: ['<%= project.app %>/index.html'],
        ignorePath:  /\.\.\//
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= project.dist %>/scripts/{,*/}*.js',
          '<%= project.dist %>/styles/{,*/}*.css',
          '<%= project.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= project.dist %>/styles/fonts/*'
        ]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= project.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= project.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      all: [
        'copy:styles'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    protractor: {
      options: {
        configFile: '<%= project.test %>/protractor-conf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
            // Arguments passed to the command
        }
      },
      phantomjs:{
        options: {
          configFile: '<%= project.test %>/protractor-phantomjs-conf.js',
          args: {}
        }
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:all',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test:protractor', 'Run the end to end tests with Protractor and keep a test server running in the background', [
    'webdriver',
    'protractor:phantomjs'
  ]);

  grunt.registerTask('test:pre', [
    'clean:server',
    'concurrent:all',
    'autoprefixer',
    'connect:test'
  ]);

  grunt.registerTask('test:e2e', [
    'test:pre',
    'test:protractor'
  ]);

  grunt.registerTask('test:unit', [
    'test:pre',
    'karma:unit'
  ]);

  grunt.registerTask('test', [
    'test:pre',
    'karma:unit',
    'test:protractor'
  ]);

  grunt.registerTask('test:full', [
    'test',
    'jshint:all'
  ]);

  grunt.registerTask('webdriver', 'Update webdriver', function() {
      this.updateWebdriver= function(done){
        var p = require('child_process').spawn('node', ['node_modules/protractor/bin/webdriver-manager', 'update']);
        p.stdout.pipe(process.stdout);
        p.stderr.pipe(process.stderr);
        p.on('exit', function(code){
          if(code !== 0) {
            grunt.fail.warn('Webdriver failed to update');
          }
          done();
        });
      };

    this.updateWebdriver(this.async());
  });

};


