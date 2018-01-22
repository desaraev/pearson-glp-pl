// Load plugins
var gulp = require('gulp');

// Copies the assetts from the pearson elements library and brings them into UI / Pattern Lab.

gulp.task('copy-meta', function() {
  gulp.src("./pattern-lab/source/_meta/*.js")
    .pipe(gulp.dest('./meta/'))

  gulp.src("./pattern-lab/source/_data/data.json")
    .pipe(gulp.dest('./meta/'))
});

