var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('travis-success', ['default'], function () {
    return gulp.src('pattern-lab/public/**/*')
        .pipe(sftp({
            host: '159.203.121.101',
            user: 'root',
            remotePath: '/home/webroot/pearson-accessible-modal'
        }));
});
