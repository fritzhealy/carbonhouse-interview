// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('sass', function() {
    return gulp.src('sass/style.scss')
        .pipe(sass())
        .pipe(rename("style.css"))
        .pipe(gulp.dest('./'));
});
 
gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);