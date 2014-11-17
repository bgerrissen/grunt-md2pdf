'use strict';


var pdf = require('html-to-pdf');
var path = require('path');
var md2html = require('./lib/md2html');

module.exports = function (grunt) {

    grunt.registerMultiTask('md2pdf', 'Converts markdown to pdf', function () {

        var options = this.options({
            toc: false,
            tocDepth: null,
            tocTitle: 'Table of contents',
            stylesheet: __dirname + '/lib/style.css'
        });
        
        var done = this.async();
        var total = this.files.length;
        var resolved = 0;

        // Iterate over all specified file groups.
        this.files.forEach(function (filePath) {

            grunt.log.writeln('Converting markdown to html...');
            var html = md2html(filePath.src,options);

            grunt.file.mkdir(path.dirname(filePath.dest));

            grunt.log.writeln('Converting html to pdf...');
            pdf.convertHTMLString ( html, filePath.dest, function( error ){
                if ( error ) {
                    grunt.log.warn(error);
                } else {
                    grunt.log.ok('Generated ' + path.resolve(filePath.dest) );
                }
                resolved++;
                if ( resolved === total ) {
                    done();
                }
            });
            
        });
    });

};