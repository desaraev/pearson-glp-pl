var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('travis-success', ['default'], function () {
    return gulp.src('pattern-lab/public/**/*')
        .pipe(sftp({
            host: '159.203.121.101',
            user: 'root',
            pass: 'j8912LKuuB$',
            remotePath: '/home/webroot/pearson-glp-pl'
        }));
});
