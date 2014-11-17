'use strict';

var grunt = require('grunt');
var createToc = require('marked-toc');
var marked = require('marked');
var concatMarkdown = require('./concatMarkdown');

module.exports = function( src, options ){

    var markdown, toc = '', html = '', css = '';

    var template = '<html><head><style>{{css}}</style></head><body>{{content}}</body></html>';
    var templateToc = '<h1 class="toc">{{toc-title}}</h1><div class="toc">{{toc}}</div>';

    markdown = concatMarkdown(src);

    if ( options && options.stylesheet ) {
        css = grunt.file.read( options.stylesheet  )
    }

    if ( options && options.toc ) {
        toc = createToc(markdown, {
            maxDepth: options.tocDepth || null,
            firsth1: true
        });
        toc = templateToc
            .replace('{{toc-title}}', options.tocTitle || 'Table of contents')
            .replace('{{toc}}',marked(toc));
    }
    html = template
        .replace('{{css}}',css)
        .replace('{{content}}', toc.concat(marked(markdown)));

    return html;

};
