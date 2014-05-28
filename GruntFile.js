'use strict';

var initDb = require('./config/initDb');
var pathToApp = 'app/';
var pathToLibs = pathToApp + 'libs/';

module.exports = function (grunt) {
  grunt.initConfig({
    copy: {
      libs: {
        expand: true,
        cwd: 'bower_components/',
        src: [
          'angular/angular.min.js',
          'angular/angular.min.js.map',
          'jquery/dist/jquery.min.*',
          'bootstrap/dist/*/bootstrap.min.{css,js}',
          'bootstrap/dist/fonts/*.*'
        ],
        dest: pathToLibs
      }
    },
    clean: [pathToLibs],
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },
    watch: {
      html: {
        options: {
          livereload: true
        },
        files: [
          pathToApp + '**/*.*'
        ]
      },
      express: {
        files: [
          'server.js',
          'config/**/*.{js,json}',
          'src/**/*.js'
        ],
        tasks: [
          'express:dev'
        ],
        options: {
          livereload: true,
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('initDatabase', function () {
    var done = this.async();
    console.log('Starting creation of db and tables');
    initDb.start(done);
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'build',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean',
    'copy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
