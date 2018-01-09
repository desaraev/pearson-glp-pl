var gulp = require('gulp');
var prettify = require('gulp-html-prettify');
var beautify = require('gulp-beautify');
var sassbeautify = require('gulp-sassbeautify');

gulp.task('format', ['format-html', 'format-js', 'format-json', 'format-scss']);


gulp.task('format-html', function() {
    gulp.src('./pattern-lab/**/*.mustache')
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('./pattern-lab/'))
});

gulp.task('format-js', function() {
	gulp.src('./pattern-lab/**/*.js')
		.pipe(beautify({indent_char: ' ', indent_size: 4}))
		.pipe(gulp.dest('./pattern-lab/'))
});

gulp.task('format-json', function() {
	gulp.src('./pattern-lab/**/*.json')
		.pipe(beautify({indent_char: ' ', indent_size: 4}))
		.pipe(gulp.dest('./pattern-lab/'))
});

gulp.task('format-scss', function () {
	gulp.src('./pattern-lab/**/*.scss')
		.pipe(sassbeautify({indent_char: ' ', indent_size: 4}))
		.pipe(gulp.dest('./pattern-lab/'))
});
