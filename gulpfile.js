const gulp = require('gulp');
const njk = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const data = require('gulp-data');
const dataFile = require('./src/data.json');

gulp.task("markup", () => {
    return gulp
        .src('src/pages/**/*')
        .pipe(data(dataFile))
        .pipe(njk({ path: ['src/templates/', 'src/partials/'] }))
        .pipe(gulp.dest('dist'));
});

gulp.task("styles", () => {
    return gulp
        .src([
            'src/styles/**/*.scss',
            'src/partials/components/**/*.scss',
            'src/partials/ui/**/*.scss',
        ])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("dev", () => {
    gulp.watch('src/**/*', gulp.series(["markup", "styles"]));
});

gulp.task("default", gulp.series(["markup", "styles"]));
