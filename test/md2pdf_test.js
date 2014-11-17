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

        var html = md2html('test/fixtures/a.md',{toc:true});
        var expected = grunt.file.read('test/expected/a-toc.html').replace(/\r/g,'');

        test.equals(html,expected,"HTML is exactly the same");

        test.done();

    },

    pdfWritten: function (test) {
        test.expect(2);

        test.ok(grunt.file.exists('tmp/c.pdf'));

        var contents = grunt.file.read('tmp/c.pdf');

        test.ok(contents.length > 0);

        test.done();
    }
};
