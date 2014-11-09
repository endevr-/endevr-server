module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['test/**/*.js']
      }
    },

    jshint: {
      files: [
        'api/**/*.js',
        'config/*.js',
        'routes/*.js'
      ],
      options: {
        force: 'false',
        jshintrc: '.jshintrc'
      }
    },

    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'ls'
        }
    }
  });

  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['jshint', 'mochaTest', 'nodemon'] );

};
