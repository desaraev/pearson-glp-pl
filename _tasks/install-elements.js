// Load plugins
var gulp = require('gulp'),
    exec = require('child_process').exec;

// Installs Elements
gulp.task('install-elements', ['install-pattern-lab'], function(cb) {
    exec('npm --prefix ./node_modules/@pearson-components/elements-sdk install ./node_modules/@pearson-components/elements-sdk', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});