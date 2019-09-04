const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const browsersync = require('browser-sync').create();
const babel = require('gulp-babel');
const image = require('gulp-image');

// BrowserSync
// function browserSync(done) {
//   browsersync.init({
//     port: 3000,
//     proxy: 'ghost.test'
//   });
//   done();
// }

// Title used for system notifications
const notifyInfo = {
  title: 'Gulp',
};

// Error notification settings for plumber
const plumberErrorHandler = {
  errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: 'Error: <%= error.message %>',
  }),
};

function img() {
  return gulp
    .src('./img/**/*')
    .pipe(image({
      optipng: true,
    }))
    .pipe(gulp.dest('./public/img'))
}

// CSS development task
function css() {
  return gulp
    .src('./scss/main.scss', { sourcemaps: true })
    .pipe(plumber(plumberErrorHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7'],
          grid: 'autoplace',
        }),
      ]),
    )
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css/'))
    // .pipe(browsersync.stream());
}

function js() {
  return gulp
    .src(['./js/**/*.js'])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./public/js-compiled/'))
    // .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch('./scss/**/*', css);
  gulp.watch(['./js/**/*.js', '!./js/_compiled/**/*.js'], js);
}

// Watch files during development
const watch = gulp.parallel(watchFiles /*, browserSync */);

// Export tasks
exports.css = css;
exports.js = js;
exports.img = img;
exports.watch = watch;
exports.default = watch;