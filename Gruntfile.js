'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    coffee: {
      module: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: 'src/',      // Src matches are relative to this path.
          src: ['**/*.coffee'], // Actual pattern(s) to match.
          dest: '.',   // Destination path prefix.
          ext: '.js'   // Dest filepaths will have this extension.
        }]
      }
    },
    watch: {
      default: {
        files: ['src/**/*.coffee'],
        tasks: 'default'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task.
  grunt.registerTask('default', ['coffee']);

};
