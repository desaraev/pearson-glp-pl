// Load plugins
var gulp = require('gulp');
var rename = require('gulp-rename');

// Copies the assetts from the pearson elements library and brings them into UI / Pattern Lab.
gulp.task('configure', ['install-elements'], function() {
    gulp.src("meta/01-foot.mustache")
        .pipe(rename('./_01-foot.mustache'))
        .pipe(gulp.dest('node_modules/edition-node-gulp/source/_meta/'));

    gulp.src("meta/00-head.mustache")
        .pipe(rename('./_00-head.mustache'))
        .pipe(gulp.dest('node_modules/edition-node-gulp/source/_meta/'));

    gulp.src("node_modules/edition-node-gulp/source/**/*")
        .pipe(gulp.dest('pattern-lab/source/'));

    gulp.src("patternlab-config.json")
        .pipe(gulp.dest('node_modules/edition-node-gulp/'));

    gulp.src("./meta/data.json")
        .pipe(gulp.dest('pattern-lab/source/_data/'));

    gulp.src("meta/00-head.mustache")
        .pipe(rename('./_00-head.mustache'))
        .pipe(gulp.dest('pattern-lab/source/_meta/'));

    gulp.src("meta/styleguide.min.css")
        .pipe(gulp.dest('node_modules/edition-node-gulp/node_modules/styleguidekit-assets-default/dist/styleguide/css/'));

    gulp.src("node_modules/pearson-elements/dist/fonts/**")
        .pipe(gulp.dest('ui/fonts/'))
        .pipe(gulp.dest('pattern-lab/source/fonts/'));

    gulp.src("node_modules/pearson-elements/dist/images/**")
        .pipe(gulp.dest('ui/images/'))
        .pipe(gulp.dest('pattern-lab/source/images/'));

    gulp.src("node_modules/pearson-elements/dist/icons/**")
        .pipe(gulp.dest('ui/images/'))
        .pipe(gulp.dest('pattern-lab/source/images/'));

});


