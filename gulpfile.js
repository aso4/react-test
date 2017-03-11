var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'), // optimize images
    cache = require('gulp-cache'),
    del = require('del'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence');

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Convert Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){ // run sass and browserSync together
  gulp.watch('app/scss/**/*.scss', ['sass']); // run sass task whenever scss file is saved
  gulp.watch('app/*.html', browserSync.reload);  // auto-reload when .html file is saved
  gulp.watch('app/js/**/*.js', browserSync.reload); // auto-reload when .js file is saved
  // Other watchers
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify())) // only attempt to minify JS files
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() { // delete dist folder and start clean
  return del.sync('dist');
});

gulp.task('cache:clear', function (callback) { // clear system cache including images
  return cache.clearAll(callback)
});

gulp.task('serveprod', function() {
  connect.server({
    root: 'app',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});
