'use strict';

var path = require('path');
var grunt = require('grunt');
var md2html = require(path.resolve('./tasks/lib/md2html'));

exports.md2pdf = {

    md2html: function(test){

        test.expect(1);

        var html = md2html('test/fixtures/a.md');
        var expected = grunt.file.read('test/expected/a.html').replace(/\r/g,'');

        test.equals(html,expected,"HTML is exactly the same");

        test.done();

    },

    md2htmlWithTOC: function(test){

        test.expect(1);

        var html = grunt.util.normalizelf(md2html('test/fixtures/a.md',{toc:true}));
        var expected = grunt.util.normalizelf(grunt.file.read('test/expected/a-toc.html'));

        test.equals(html,expected,"HTML is exactly the same");

        test.done();

    },

    md2htmlWithImage: function(test){

        test.expect(1);

        var html = grunt.util.normalizelf(md2html('test/fixtures/image.md'));
        var expected = grunt.util.normalizelf(grunt.file.read('test/expected/image.html'));

        test.equals(html,expected,"HTML is exactly the same");

        test.done();

    },

    md2htmlWithTitlePage: function(test){

        test.expect(1);

        var options = {
            titlePage: 'test/fixtures/titlePage.md'
        };

        var html = grunt.util.normalizelf(md2html('test/fixtures/a.md', options));
        var expected = grunt.util.normalizelf(grunt.file.read('test/expected/titlePage.html'));

        test.equals(html,expected,"HTML is exactly the same");

        test.done();

    },

    pdfWritten: function (test) {
        test.expect(4);

        test.ok(grunt.file.exists('tmp/c.pdf'));
        test.ok(grunt.file.exists('tmp/image.pdf'));

        var contents = grunt.file.read('tmp/c.pdf');

        test.ok(contents.length > 0);

        contents = grunt.file.read('tmp/image.pdf');

        test.ok(contents.length > 0);

        test.done();
    }
};
