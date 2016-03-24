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
        },
        timeInput: {
            files: {
                'css/noprefix/px-time-input-sketch.css': 'sass/px-time-input-sketch.scss',
                'css/noprefix/px-time-input.css': 'sass/px-time-input-predix.scss'
            }
        },
        rangeFields: {
            files: {
                'css/noprefix/px-range-fields-sketch.css': 'sass/px-range-fields-sketch.scss',
                'css/noprefix/px-range-fields.css': 'sass/px-range-fields-predix.scss'
            }
        },
        dateRangePicker: {
            files: {
                'css/noprefix/px-date-rangepicker-sketch.css': 'sass/px-date-rangepicker-sketch.scss',
                'css/noprefix/px-date-rangepicker.css': 'sass/px-date-rangepicker-predix.scss'
            }
        },
        timeRangePicker: {
            files: {
                'css/noprefix/px-time-rangepicker-sketch.css': 'sass/px-time-rangepicker-sketch.scss',
                'css/noprefix/px-time-rangepicker.css': 'sass/px-time-rangepicker-predix.scss'
            }
        },
        calendar: {
            files: {
                'css/noprefix/px-calendar-sketch.css': 'sass/px-calendar-sketch.scss',
                'css/noprefix/px-calendar.css': 'sass/px-calendar-predix.scss'
            }
        }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 version']
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
    }

  });

  grunt.loadNpmTasks('grunt-sass');
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
