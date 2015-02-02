var gulp = require('gulp');
var webserver = require('gulp-webserver');
var prefix = require('gulp-autoprefixer');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var path = require('path');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var fs = require('fs-extra');
var cssmin = require('gulp-cssmin');
var glob = require('glob');

var COMPILED_DIR = './www/compiled/';
var JS_SOURCE = [
    'src/**/*.js',
    'gulpfile.js',
    'webpack.config.js'
];

function onError(err) {
    gutil.log(gutil.colors.red(err));
    gutil.beep();
    this.emit('end');
}

function handleError() {
    return plumber({
        errorHandler: onError
    });
}

function webpackTask(options) {
    options = options || {};
    var srcFile = './src/index.js';
    var outputPath = path.join(__dirname, COMPILED_DIR, 'js');
    fs.removeSync(outputPath);
    var outputName = 'bundle.js';
    var config = require('./webpack.config');

    config.entry = srcFile;
    config.output = { filename: outputName };

    // Let's add some extra stuff.
    config.watch = options.watch;
    if (options.sourcemaps) config.devtool = 'source-map';
    if (options.optimize) config.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ];

    return function () {
        return gulp.src(srcFile)
            .pipe(gulpWebpack(config))
            .pipe(gulp.dest(outputPath));
    };
}

function bundleLess(srcFile) {
    var lessString = fs.readFileSync(srcFile, {encoding: 'utf-8'});
    var files = glob.sync('./{components,views}/**/*.less', {cwd: './src'});
    var importString = files.map(function (filename) {
        return '@import "' + filename + '"';
    }).join(';\n') + ';\n';
    return lessString + importString;
}

gulp.task('copy-fonts', function () {
    var destDir = path.join(COMPILED_DIR, 'fonts');
    fs.removeSync(destDir);
    return gulp.src([
        './node_modules/webmaker-app-icons/fonts/*.{ttf,woff}',
        './node_modules/fira/{ttf,woff}/{FiraSans-Regular,FiraSans-Italic,FiraSans-SemiBold}.{ttf,woff}'
        ])
        .pipe(gulp.dest(destDir));
});

gulp.task('less', function () {
    var srcFile = './src/index.less';
    var destDir = path.join(COMPILED_DIR, 'css');
    var tempFilePath = './src/bundle.less';
    fs.removeSync(destDir);
    fs.outputFileSync(tempFilePath, bundleLess(srcFile));

    function rmTemp() {
        fs.removeSync(tempFilePath);
    }

    return gulp.src([tempFilePath])  // only compile the entry file
        .pipe(handleError())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix('last 2 versions', 'Firefox >= 28', 'android >= 4.2'), {cascade:true}) // ffos 1.3 = 28
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destDir))
        .on('error', rmTemp)
        .on('done', rmTemp);
});



gulp.task('watch-less', ['less'], function () {
    gulp.watch('./src/**/*.less', ['less']);
});

gulp.task('webpack', webpackTask({sourcemaps: true}));
gulp.task('webpack-optimized', webpackTask({optimize: true}));
gulp.task('watch-webpack', webpackTask({ watch: true, sourcemaps: true }));

gulp.task('jscs', function () {
    var jsxcs = require('gulp-jsxcs');
    return gulp.src(JS_SOURCE)
        .pipe(jsxcs());
});

gulp.task('jshint', function () {
    var jshint = require('gulp-jshint');
    var jsxhinter = require('jshint-jsx');
    jsxhinter.JSHINT = jsxhinter.JSXHINT;
    return gulp.src(JS_SOURCE)
        .pipe(jshint({
          linter: 'jshint-jsx',
          esnext: true
        }))
    .pipe(jshint.reporter('default'));
});


gulp.task('lint', ['jscs', 'jshint']);

gulp.task('server', function () {
    return gulp.src('www')
        .pipe(webserver({
            livereload: {
                port: 1523,
                enable: true
            },
            fallback: 'index.html',
            port: 4242
        }));
});

// Use this for production!
gulp.task('build', ['copy-fonts', 'less', 'webpack-optimized']);

// Use this for local dev!
gulp.task('dev',  ['copy-fonts', 'watch-less', 'watch-webpack', 'server']);
