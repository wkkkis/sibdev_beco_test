// Gulp instruments
const { src, dest, series, parallel, watch } = require('gulp');
// Nunjucks compiler
const nunjucks = require('gulp-nunjucks');
// Sass | SCSS compiler
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
// Server Browsersync
const browserSync = require('browser-sync').create();
// HELPERS
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const del = require('del');

// ------------------------------------------
// Work With HTML
// ------------------------------------------

function html() {

  return src('dev/html/*.njk')
    .pipe(nunjucks.compile())
    .pipe(rename({ extname: '.html' }))
    .pipe(dest('build'))
    .on('end', browserSync.reload);
}

// ------------------------------------------
// Work With CSS
// ------------------------------------------

function css() {
  return src('dev/static/styles/main.scss')
    .pipe(sass())
    .pipe(dest('build/static/styles'))
    .pipe(browserSync.stream());
}

// ------------------------------------------
// Work With JS
// ------------------------------------------
// function jsLibs(cb) {
//   const libs = [
//     'node_modules/admin-lte/plugins/jquery/jquery.min.js',
//   ];
//
//   if (!libs.length) return cb();
//
//   return src(libs)
//     .pipe(concat('libs.min.js'))
//     .pipe(dest('build/static/js'));
// }

function js() {
  return src('dev/static/js/*')
    .pipe(dest('build/static/js'))
    .on('end', browserSync.reload);
}

// ------------------------------------------
// Images
// ------------------------------------------
function images() {
  return src('dev/static/images/**/*.{png,jpg,gif,svg}')
    .pipe(dest('build/static/images'));
}

// ------------------------------------------
// Server
// ------------------------------------------
function serve() {
  // init server
  browserSync.init({
    server: './build',
    notify: false,
    scrollProportionally: false,
  });
}

// ------------------------------------------
// Watcher
// ------------------------------------------
function watchFiles() {
  // html
  watch('dev/html/**/*', series(html));
  // styles
  watch('dev/static/styles/**/*', series(css));
  // images
  watch('dev/static/images/**/*.{png,jpg,gif,svg}', series(images));
  // js
  watch('dev/static/js/**/*', series(js));
}

// clean build folder
function clean() {
  return del('build');
}

// EXPORT TASKS
exports.html = html;
exports.css = css;
exports.js = js;
// exports.jsLibs        = jsLibs;
exports.watchFiles = watchFiles;
exports.serve = serve;

exports.default = series(clean, parallel(html, css, js, images), parallel(serve, watchFiles));
exports.build = series(clean, parallel(html, css, js, images));
