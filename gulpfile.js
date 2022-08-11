const gulp = require('gulp');
const njk = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));

gulp.task("markup", () => {
    return gulp
        .src('src/pages/*')
        .pipe(njk({ path: ['src/templates/', 'src/partials/'] }))
        .pipe(gulp.dest('dist'));
});

gulp.task("styles", () => {
    return gulp
        .src('src/styles/*')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("dev", () => {
    gulp.watch('src/**/*', gulp.series(["markup", "styles"]));
});
gulp.task("default", gulp.series(["markup", "styles"]));
