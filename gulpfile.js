var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task('sass', function(){
  return gulp.src('src/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync'], function(){
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('./*.html', browserSync.reload); 
    gulp.watch('src/**/*.js', browserSync.reload); 
})