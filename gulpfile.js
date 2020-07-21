require("@babel/register")({
  ignore: [/node_modules/]
});

const gulp = require('gulp');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');

gulp.task('test', function() {
    return gulp.src('./src/test')
        .pipe(jest({
            "rootDir": './src/',
            "collectCoverageFrom": [
                "**/main/baseConnector*",
                "**/main/types*"
            ],
            "collectCoverage": true,
            "automock": false,
            "clearMocks": true
        }));
});

gulp.task('lint', function() {
    return gulp.src(['./src/main/*.js', './src/test/*.js'])
        .pipe(eslint({compilers: "js:babel-core/register"}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
gulp.task('default', gulp.series('lint', 'test'));
