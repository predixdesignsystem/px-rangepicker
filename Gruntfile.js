'use strict';


module.exports = function(grunt) {

  var importOnce = require('node-sass-import-once');
  // Project configuration.
  grunt.initConfig({

    clean: {
      css: ['css'],
      bower: ['bower_components'],
      reports: ['reports']
    },

    sass: {
        options: {
            importer: importOnce,
            importOnce: {
              index: true,
              bower: true
            }
        },
        rangepicker: {
            files: {
                'css/noprefix/px-rangepicker-sketch.css': 'sass/px-rangepicker-sketch.scss',
                'css/noprefix/px-rangepicker.css': 'sass/px-rangepicker-predix.scss'
            }
        }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'Safari 8.0']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/noprefix/*.css',
        dest: 'css'
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true
      },
      bower: {
        command: 'bower install'
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'js/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer'],
        options: {
          interrupt: true
        }
      }
    },

    depserve: {
      options: {
        open: '<%= depserveOpenUrl %>'
      }
    },
    webdriver: {
        options: {
            specFiles: ['test/*spec.js']
        },
        local: {
            webdrivers: ['chrome']
        }
    },
    concurrent: {
        devmode: {
            tasks: ['watch', 'depserve'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    bump: {
      options:{
        files: ['bower.json', 'package.json'],
        updateConfigs: [],
        commitFiles: ['package.json', 'bower.json'],
        push: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dep-serve');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concurrent');

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', 'Basic build', [
    'sass',
    'autoprefixer'
  ]);

  grunt.registerTask('devmode', 'Development Mode', [
    'concurrent:devmode'
  ]);

  // First run task.
  grunt.registerTask('firstrun', 'Basic first run', function() {
    grunt.config.set('depserveOpenUrl', '/index.html');
    grunt.task.run('default');
    grunt.task.run('depserve');
  });

  grunt.registerTask('release', 'Release', [
    'clean',
    'shell:bower',
    'default',
    'test'
  ]);

};
