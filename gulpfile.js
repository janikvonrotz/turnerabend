var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// run browser sync in current directory
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

// extract and bundle js files
gulp.task('useref', function(){
  return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// transpile sass files
gulp.task('sass', function(){
  return gulp.src('src/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// copy css
gulp.task('copy-css', function() {
  var files = [
    'node_modules/normalize.css/normalize.css',
    'node_modules/flickity/dist/flickity.css'
  ]
  var streams = []
  files.forEach((file) => {
    var stream = gulp.src(file)
      .pipe(rename((path) => {
        path.basename = `_${path.basename}`
        path.extname = '.scss'
      }))
      .pipe(gulp.dest('./src/partials'))
    streams.push(stream)
  })
  return merge(streams)
})

// copy images
gulp.task('copy-images', function(){
  return gulp.src('src/assets/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
    interlaced: true
    })))
  .pipe(gulp.dest('./dist/assets'))
});

// clear gulp cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// buil gulp project
gulp.task('build', ['copy-css', 'copy-images', 'sass', 'useref'], () => {
  console.log('Building files')
})

// start browser sync and watch directories
gulp.task('watch', ['browserSync'], function(){
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('src/**/*.html', ['useref'])
    gulp.watch('src/**/*.js', ['useref'])
})
