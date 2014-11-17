'use strict';

module.exports = function (grunt) {


    grunt.initConfig({

        // Before generating any new files, remove any previously-created files.
        clean: {
            options:{
                force:true
            },
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        md2pdf: {
            make: {
                options: {
                    toc: true,
                    tocDepth: 1
                },
                'tmp/c.pdf': [
                    'test/fixtures/a.md',
                    'test/fixtures/b.md'
                ]
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'md2pdf', 'nodeunit','clean']);

    // By default, run all tests.
    grunt.registerTask('default', ['jshint','test']);

};