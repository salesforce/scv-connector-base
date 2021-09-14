/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

require("@babel/register")({
  ignore: [/node_modules/]
});

const gulp = require('gulp');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');
const shell = require('gulp-shell');
const webpackStream = require('webpack-stream');

const source = ['src/main/index.js'];

gulp.task('test', function() {
    return gulp.src('./src/test')
        .pipe(jest({
            "reporters": ["default", "./node_modules/jest-html-reporter"],
            "collectCoverageFrom": [
                "**/src/main/baseConnector*",
                "**/src/main/types*"
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

gulp.task('bundle', gulp.series('lint', 'test', function() {
    var webpackConfig = {
        output: require('./webpack.config').output,
        module: require('./webpack.config').module
    };

    webpackConfig.mode = 'production';
    webpackConfig.output.filename = 'scv_connector_base.js';
    webpackConfig.devtool = 'source-map';

    return gulp.src(source)
        .pipe(webpackStream(webpackConfig))
        .pipe(gulp.dest('./dist/'));
}));

gulp.task('dist', shell.task([
    'gulp bundle --mode dev',
    'gulp bundle --mode prod'
]));

gulp.task('default', gulp.series('bundle'));
