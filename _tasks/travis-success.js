var gulp = require('gulp');
var sftp = require('gulp-sftp');
var sshAuthSocket = process.env.SSH_AUTH_SOCK;
gulp.task('travis-success', ['default'], function () {
    return gulp.src('pattern-lab/public/**/*')
        .pipe(sftp({
            host: '159.203.121.101',
            user: 'davidodey',
            agent: sshAuthSocket,
            remotePath: '/home/webroot/pearson-glp-pl'
        }));
});
