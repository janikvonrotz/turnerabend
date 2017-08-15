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

gulp.task('copy', function() {
  return gulp.src([
    'node_modules/animate.css/animate.css',
    'node_modules/normalize.css/normalize.css'
  ])
  .pipe(gulp.dest('./src'))
})

// start browser sync and watch directories
gulp.task('watch', ['browserSync'], function(){
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('src/**/*.html', ['useref']); 
    gulp.watch('src/**/*.js', ['useref']); 
})

// buil gulp project
gulp.task('build', ['copy', 'sass', 'useref'], function (){
  console.log('Building files');
})