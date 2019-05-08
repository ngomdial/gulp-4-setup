const { src, dest, parallel, watch, task} = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

function style() {
  return src([
    'node_modules/boosted/scss/boosted.scss',
    'src/scss/*.scss'
  ])
    .pipe(sass())
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}


function js() {
  return src([
    'node_modules/boosted/dist/js/boosted.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/swiper/dist/js/swiper.min.js',
    'node_modules/tablesorter/dist/js/jquery.tablesorter.min.js'
  ])
  .pipe(dest("src/js"))
  .pipe(browserSync.stream());
}

function watchFile() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });
  watch('./src/scss/**/*.scss', style);
  watch('./src/**/*.html').on('change', browserSync.reload);
  watch('./src/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.js = js;
exports.watchFile = parallel(js, watchFile);
