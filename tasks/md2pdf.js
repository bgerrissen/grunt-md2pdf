'use strict';

var concat = require('./../lib/concat');
var marked = require('marked');
var createToc = require('marked-toc');
var pdf = require('html-to-pdf');
var path = require('path');

module.exports = function (grunt) {
    
    var template = '<html><head><style>{{css}}</style></head><body>{{content}}</body></html>';
    var templateToc = '<h1 class="toc">{{toc-title}}</h1><div class="toc">{{toc}}</div>';


    grunt.registerMultiTask('md2pdf', 'Converts markdown to pdf', function () {

        var options = this.options({
            toc: false,
            tocDepth: null,
            tocTitle: 'Table of contents',
            stylesheet: __dirname + '/../lib/style.css'
        });
        
        var done = this.async();
        var total = this.files.length;
        var resolved = 0;

        // Iterate over all specified file groups.
        this.files.forEach(function (filePath) {
            
            var markdown, toc = '', html = '', css = '';

            markdown = concat(filePath.src);
            
            if ( options.stylesheet ) {
                css = grunt.file.read( options.stylesheet  )
            }
            
            if ( options.toc ) {
                toc = createToc(markdown, {
                    maxDepth: options.tocDepth,
                    firsth1: true
                });
                toc = templateToc
                    .replace('{{toc-title}}', options.tocTitle)
                    .replace('{{toc}}',marked(toc));
            }
            html = template
                .replace('{{css}}',css)
                .replace('{{content}}', toc.concat(marked(markdown)));    
            
            grunt.file.mkdir(path.dirname(filePath.dest));
            
            // todo: replace with html-pdf module once phantomjs anchor link bug is fixed.
            // html-to-pdf has an external dependency on java.
            pdf.convertHTMLString ( html, filePath.dest, function( error ){
                if ( error ) {
                    grunt.log.warn(error);
                } else {
                    grunt.log.ok('Generated ' + filePath.dest);
                }
                resolved++;
                if ( resolved === total ) {
                    done();
                }
            });
            
        });
    });

};