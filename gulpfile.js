const gulp = require('gulp');
const njk = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const data = require('gulp-data');
const dataFile = require('./src/data.json');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const mode = require('gulp-mode')();
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();

function assets() {
    return gulp
        .src('src/assets/**/*')
        .pipe(gulp.dest('dist/assets'));
}

function markup() {
    return gulp
        .src('src/pages/**/*')
        .pipe(data(dataFile))
        .pipe(njk({ path: ['src/templates/', 'src/partials/'] }))
        .pipe(gulp.dest('dist'));
}

function styles() {
    const isProd = mode.production();
    const preprocess = [autoprefixer()];
    if (isProd) {
        preprocess.push(cssnano());
    }

    return gulp
        .src([
            'src/styles/**/*.scss',
            'src/partials/components/**/*.scss',
            'src/partials/ui/**/*.scss',
        ])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss(preprocess))
        .pipe(gulp.dest('dist/styles'));
}

function reload(done) {
    browsersync.reload();
    done();
}

function serve() {
    browsersync.init({
        server: './dist',
        files: ['./dist/*.html', './dist/styles/**/*.css'],
        directory: true,
    });
    gulp.watch('src/**/*.scss', styles);
    gulp.watch(['src/**/*.html', 'src/**/*.njk'], gulp.series(markup, reload));
}

// npm run dev
exports.dev = gulp.series(assets, markup, styles, serve);
// npm start
exports.default = gulp.series(assets, markup, styles);
