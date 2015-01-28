var gulp = require('gulp');
var webserver = require('gulp-webserver');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');
var path = require('path');

var COMPILED_DIR = './www/compiled/';

gulp.task('less', function() {
    return gulp.src('./www/less/style.less')  // only compile the entry file
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefix('last 2 versions', 'android >= 4.2'), {cascade:true})
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(COMPILED_DIR + 'css'));
});

gulp.task('watch-less', ['less'], function () {
    gulp.watch('./www/less/**/*.less', ['less']);
});

function webpackTask(options) {
    options = options || {};
    var srcFile = './www/src/index.js';
    var outputPath = path.join(__dirname, COMPILED_DIR, 'js');
    var outputName = 'bundle.js';
    var config = {
        watch: !!options.watch,
        entry: srcFile,
        output: { filename: outputName },
        module: {
            output: { filename: outputName },
            loaders: [ { test: /\.js/, loaders:  ['es6', 'jsx-loader'] } ],
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

gulp.task('watch-webpack', webpackTask({ watch: true }));

gulp.task('build', ['less', 'webpack']);

gulp.task('server', function () {
    return gulp.src('www')
        .pipe(webserver({
            livereload: {
                port: '1523',
                // not working
                filter: function (filename) {
                    return !!filename.match(/.map$/);
                }
            },
            fallback: 'index.html',
            port: 4242
        }));
});

gulp.task('dev',  ['watch-less', 'watch-webpack', 'server']);

gulp.task('browserify', function (done) {
    var command = 'browserify -t [reactify --es6] ./www/src/index.js -o ./www/compiled/browserify-bundle.js';
    require('child_process').exec(command, done);
});

gulp.task('browserify-uglify', ['browserify'], function () {
    var uglify = require('gulp-uglify');
    return gulp.src('./www/compiled/browserify-bundle.js')
      .pipe(uglify())
      .pipe(gulp.dest('./www/compiled/js'));
});

gulp.task('compare', ['webpack-optimized', 'browserify-uglify'], function () {
    var fs = require('fs');
    var sizeW = fs.statSync('./www/compiled/js/bundle.js').size * 0.001;
    var sizeB = fs.statSync('./www/compiled/js/browserify-bundle.js').size * 0.001;
    console.log('Webpack: ' + sizeW);
    console.log('Browserify: ' + sizeB);
});
