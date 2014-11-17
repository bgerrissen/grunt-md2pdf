'use strict';

var grunt = require('grunt');
var createToc = require('marked-toc');
var marked = require('marked');
var path = require('path');
var sizeOf = require('image-size');

module.exports = function( src, options ){

    var content = [], toc = '', html = '', css = '', markdown = [];

    var renderer = new marked.Renderer();
    var markedOptions = {
        renderer: renderer
    };

    var template = '<html><head><style>{{css}}</style></head><body>{{content}}</body></html>';
    var templateToc = '<h1 class="toc">{{toc-title}}</h1><div class="toc">{{toc}}</div>';

    [].concat( src ).forEach(function( filepath ){

        if (!grunt.file.exists(filepath)) {
            throw new Error('Source file "' + filepath + '" not found.');
        }

        renderer.image = function( href, title, text){
            href = path.join(path.dirname(filepath),href);
            var dim = sizeOf(href);
            return '<img src="'+href+'" alt="'+text+'" title="'+title+'" width="'+dim.width+'" height="'+dim.height+'" />';
        };

        var md = grunt.file.read(filepath);
        markdown.push(md);

        content.push(marked(md,markedOptions));

    });

    markdown = markdown.join('\n');
    content = content.join('');

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
        .replace('{{content}}', toc.concat(content));

    return html;

};
