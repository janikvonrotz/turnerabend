var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

// run browser sync in current directory
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

// gulp.task('reloadBS', function () {
//     browserSync.reload;
// })

// extract and bundle js files
gulp.task('useref', function(){
  return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// transpile sass files
gulp.task('sass', function(){
  return gulp.src('src/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// start browser sync and watch directories
gulp.task('watch', ['browserSync'], function(){
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('src/**/*.html', browserSync.reload); 
    gulp.watch('src/**/*.js', ['useref']); 
})

// buil gulp project
gulp.task('build', ['sass', 'useref'], function (){
  console.log('Building files');
})