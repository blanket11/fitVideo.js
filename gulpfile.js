var gulp  = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var autoprefixer =require('gulp-autoprefixer');
var pug = require('gulp-pug');
var sync = require('browser-sync');
var del = require('del');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('babel_build', function () {
    return gulp.src(['./src/js/**/*.js', '!./src/js/**/_*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./doc/js/"));
});

gulp.task('stylus_build', function () {
    return gulp.src(['./src/stylus/**/*.styl', '!./src/stylus/**/_*.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./doc/css/'));
});

gulp.task('pug_build', function () {
    var options = {
        pretty: true
    };
    return gulp.src(['./src/views/**/*.pug', '!./src/views/**/_*.pug'])
        .pipe(pug(options))
        .pipe(gulp.dest('./doc/'));
});

gulp.task('server', function() {
    return sync({
        server: {
            baseDir: './doc'
        }
    });
});

gulp.task('reload', function() {
    return sync.reload();
});

gulp.task('clean', function(cb) {
  return del(['./doc/','./jquery.fitVideo.js','./jquery.fitVideo.min.js'], cb);
});

gulp.task('minify-js', function() {
    return gulp.src('./doc/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./doc/js/'));
});

gulp.task('minify-css', function() {
    return gulp.src("./doc/css/**.*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('./doc/css/'));
});

gulp.task('copy-fitVideoJs', function() {
    return gulp.src('./doc/js/fitVideo.js')
        .pipe(gulp.dest('./'));
});
gulp.task('copy-fitVideoJsMin', function() {
    return gulp.src('./doc/js/fitVideo.min.js')
        .pipe(gulp.dest('./'));
});

gulp.task('copy-lib', function() {
  return gulp.src('./src/lib/**/*')
      .pipe(gulp.dest('./doc/lib/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/js/**/*.js', ['babel_build']);
    gulp.watch('./src/stylus/**/*.styl', ['stylus_build']);
    gulp.watch('./src/views/**/*.pug', ['pug_build']);
    gulp.watch('./src/lib/**/*', ['copy-lib']);

    return gulp.watch('./doc/**/*', ['reload']);
});

gulp.task('production', function(callback) {
  runSequence(
    'clean',
    ['babel_build', 'stylus_build', 'pug_build', 'copy-lib'],
    ['minify-js', 'minify-css'],
    ['copy-fitVideoJs', 'copy-fitVideoJsMin'],
    callback
  );
});

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    ['babel_build', 'stylus_build', 'pug_build', 'copy-lib'],
    callback
  );
});

gulp.task('default', function(callback) {
  runSequence(
    ['babel_build', 'stylus_build', 'pug_build', 'copy-lib'],
    ['watch', 'server'],
    callback
  );
});
