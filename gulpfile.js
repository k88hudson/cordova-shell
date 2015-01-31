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

function onError(err) {
    gutil.log(gutil.colors.red(err));
    gutil.beep();
    this.emit('end');
}

function handleError() {
    return plumber({
        errorHandler: onError
    });
};

var COMPILED_DIR = './www/compiled/';

gulp.task('copy-fonts', function () {
    var destDir = path.join(COMPILED_DIR, 'fonts');
    fs.removeSync(destDir);
    return gulp.src('./node_modules/webmaker-app-icons/fonts/**.{ttf,woff}')
        .pipe(gulp.dest(destDir));
});

gulp.task('less', function() {
    var destDir = path.join(COMPILED_DIR, 'css');
    fs.removeSync(destDir);
    return gulp.src('./src/less/style.less')  // only compile the entry file
        .pipe(handleError())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix('last 2 versions', 'Firefox >= 28', 'android >= 4.2'), {cascade:true}) // ffos 1.3 = 28
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destDir));
});

gulp.task('watch-less', ['less'], function () {
    gulp.watch('./src/less/**/*.less', ['less']);
});

function webpackTask(options) {
    options = options || {};
    var srcFile = './src/js/index.js';
    var outputPath = path.join(__dirname, COMPILED_DIR, 'js');
    fs.removeSync(outputPath);
    var outputName = 'bundle.js';
    var config = {
        watch: !!options.watch,
        entry: srcFile,
        output: { filename: outputName },
        module: {
            output: { filename: outputName },
            loaders: [
                {
                    test: /\.js/,
                    loaders:  ['es6', 'jsx-loader']
                }
                // {
                //     test: /\.json$/,
                //     loader: 'json-loader'
                // }
            ]
        }
    };
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

gulp.task('webpack', webpackTask({sourcemaps: true}));
gulp.task('webpack-optimized', webpackTask({optimize: true}));

gulp.task('watch-webpack', webpackTask({ watch: true, sourcemaps: true }));

gulp.task('build', ['copy-fonts', 'less', 'webpack-optimized']);

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

gulp.task('dev',  ['copy-fonts', 'watch-less', 'watch-webpack', 'server']);

gulp.task('browserify', function (done) {
    var command = 'browserify -t [reactify --es6] ./src/js/index.js -o ./www/compiled/browserify-bundle.js';
    require('child_process').exec(command, done);
});

gulp.task('browserify-uglify', ['browserify'], function () {
    var uglify = require('gulp-uglify');
    return gulp.src('./www/compiled/browserify-bundle.js')
      .pipe(uglify())
      .pipe(gulp.dest('./www/compiled/'));
});

gulp.task('compare', ['webpack-optimized', 'browserify-uglify'], function () {
    var fs = require('fs');
    var sizeW = fs.statSync('./www/compiled/bundle.js').size * 0.001;
    var sizeB = fs.statSync('./www/compiled/browserify-bundle.js').size * 0.001;
    console.log('Webpack: ' + sizeW);
    console.log('Browserify: ' + sizeB);
});
