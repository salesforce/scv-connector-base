require("@babel/register")({
  ignore: [/node_modules/]
});

const gulp = require('gulp');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');
const webpackStream = require('webpack-stream');
const shell = require('gulp-shell');
const os = require('os');
const argv = require('yargs').argv;
const projectConfig = require('./project.config');
const replace = require('gulp-replace');
const replaceName = require('gulp-replace-name');

const p4WorkspaceName = projectConfig.DEFAULT_P4_CLIENT ? projectConfig.DEFAULT_P4_CLIENT : os.hostname().split('.')[0] + '-blt';

const source = ['src/main/telephonyConnector.js'];

gulp.task('lint', function() {
    return gulp.src(['./src/main/*.js', './src/main/common/*.js'])
        .pipe(eslint({compilers: "js:babel-core/register"}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('bundle', gulp.series('lint',  function() {

    var webpackConfig = {
        output: require('./webpack.config').output,
        module: require('./webpack.config').module
    };

    var mode = argv.mode;
    if (mode === 'prod') {
        webpackConfig.mode = 'production';
        webpackConfig.output.filename = 'connector_min.js';
    } else {
        webpackConfig.mode = 'development';
        webpackConfig.devtool = false;
    }

    return gulp.src(source)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/'));
}));

gulp.task('default', gulp.series('bundle'));

gulp.task('dist', shell.task([
    'gulp bundle --mode dev',
    'gulp bundle --mode prod',
    'gulp fingerprinting'
]));

gulp.task('fingerprinting', function(){
    const timestamp = new Date().getTime();
    return gulp.src('public/app*.html')
    .pipe(
        replace('.js', function() {
          return '.js?t=' + timestamp;
        })
    )
    .pipe(
        replace('/assets/', function() {
          return '';
        })
    )
    .pipe(replaceName(/app/g, 'index'))
    .pipe(gulp.dest('./dist/'));
})

gulp.task('p4edit', gulp.series('dist', function() {
    // Use the p4 workspace created by blt.
    var p4OpenCtiJsDirectory = '~/blt/app/' + 
        projectConfig.DEFAULT_P4_BRANCH + 
        '/core/sfdc/htdocs/hvcc/connector/';

    return gulp.src(['./dist/*.js', './dist/*.html', './public/*.js'])
        .pipe(shell([
            'p4 -c <%= p4WorkspaceName %> edit <%= getP4FilePath(file.path) %>',
            'cp <%= file.path %> <%= getP4FilePath(file.path) %>',
            'p4 -c <%= p4WorkspaceName %> add <%= getP4FilePath(file.path) %>'
            ], {
                templateData: {
                    getP4FilePath: function(p) {
                        p = p.split('/');
                        return p4OpenCtiJsDirectory + p[p.length - 1];
                    },
                    p4WorkspaceName: p4WorkspaceName
                }
            }));
}));
