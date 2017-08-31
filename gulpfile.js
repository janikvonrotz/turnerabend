var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var useref = require('gulp-useref')
var rename = require('gulp-rename')
var merge = require('merge-stream')
var cache = require('gulp-cache')
var responsive = require('gulp-responsive')

// run browser sync in current directory
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
})

// extract and bundle js files
gulp.task('useref', () => {
  return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// transpile sass files
gulp.task('sass', () => {
  return gulp.src('src/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// copy css
gulp.task('copy-css', () => {
  var files = [
    'node_modules/normalize.css/normalize.css'
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
gulp.task('responsive-images', () => {
  return gulp.src('src/assets/**/*.+(png|jpg)')
    .pipe(responsive({
      '*.+(jpg|png|gif)': [{
        width: 543,
        rename: {suffix: '-543'}
      }, {
        width: 991,
        rename: {suffix: '-991'}
      }, {
        width: 1600,
        rename: {suffix: '-1600'}
      }]
    }, {
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('dist/assets'))
})

gulp.task('copy-images', () => {
  return gulp.src('src/assets/**/*.+(svg|ico)')
    .pipe(gulp.dest('dist/assets'))
})

// buil gulp project
gulp.task('build', ['copy-css', 'responsive-images', 'copy-images', 'sass', 'useref'], () => {
  console.log('Building files')
})

// start browser sync and watch directories
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('src/**/*.scss', ['sass'])
    gulp.watch('src/**/*.html', ['useref'])
    gulp.watch('src/**/*.js', ['useref'])
})
