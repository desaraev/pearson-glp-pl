var gulp = require('gulp');
var sftp = require('gulp-sftp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-ruby-sass');
var notify = require('gulp-notify');

gulp.task('deploy', ['travis-prefix'], function () {
    return gulp.src('pattern-lab/public/**/*')
        .pipe(sftp({
            host: '159.203.121.101',
            user: 'root',
          remotePath: '/home/webroot/pearson-accessible-modal'
        }));
});

gulp.task('travis-prefix',['travis-scss'], function () {
    var plugins = [
        autoprefixer({browsers: ['last 2 version', 'safari > 6', 'ie 11', 'opera 12.1', 'ios 6', 'android > 3','Firefox > 47']}),
    ];
    return gulp.src('pattern-lab/source/css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('pattern-lab/source/css'))
        .pipe(gulp.dest('pattern-lab/public/css'));
});


gulp.task('travis-scss', ['travis'], function () {
    return sass('pattern-lab/scss/*.scss', {
        style: 'expanded',
        lineNumbers: true
    })
        .pipe(gulp.dest('pattern-lab/source/css'))
        .pipe(gulp.dest('pattern-lab/public/css'))
});

gulp.task('travis', function(cb) {
    gulp.start('autoprefix');
    exec('node_modules/edition-node-gulp/node_modules/gulp/bin/gulp.js patternlab:build --gulpfile node_modules/edition-node-gulp/gulpfile.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    })
});
