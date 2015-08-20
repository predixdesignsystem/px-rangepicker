'use strict';


module.exports = function(grunt) {

  var importOnce = require('node-sass-import-once');
  // Project configuration.
  grunt.initConfig({

    clean: {
      css: ['css'],
      bower: ['bower_components'],
      reports: ['reports'],
      test: ['bower_components/test']
    },

    copy: {
      test: {
        files: [
          {
            cwd: '',
            expand: true,
            src: [
              '*.html',
              'css/*.css'
            ],
            dest: 'bower_components/test'
          }
        ]
      }
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
        browsers: ['last 2 version']
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

    // Karma Unit configuration
    karma: {
      runner: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

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

  // Default task.
  grunt.registerTask('test', 'Test', [
    'jshint',
    'clean:test',
    'copy:test',
    'karma'
  ]);

  grunt.registerTask('release', 'Release', [
    'clean',
    'shell:bower',
    'default',
    'test'
  ]);

};
