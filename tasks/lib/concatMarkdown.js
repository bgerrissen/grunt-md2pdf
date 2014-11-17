var grunt = require('grunt');

module.exports = function (files) {

    // should this be async with callback?
    var combined = [].concat(files).filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
        } else {
            return true;
        }
    }).map(function (filepath) {
        return grunt.file.read(filepath);
    }).join('\n');

    return combined;

};