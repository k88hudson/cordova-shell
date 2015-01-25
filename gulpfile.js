var gulp = require('gulp');
var webserver = require('gulp-webserver');
var prefix = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('gulp-webpack');
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

gulp.task('webpack', function () {
    return gulp.src('./www/src/index.js')
        .pipe(webpack({
            entry: './www/src/index.js',
            output: {
                path: path.join(__dirname, COMPILED_DIR, 'js'),
                filename: 'bundle.js'
            },
            module: {
                output: { filename: 'bundle.js' },
                loaders: [
                    {
                        test: /\.js/,
                        loaders:  ['es6', 'jsx-loader']
                    }
                ],
            }
            // plugins: [
            //     new webpack.optimize.DedupePlugin(),
            //     new webpack.optimize.UglifyJsPlugin()
            // ],
            //devtool: 'source-map'
    }))
    .pipe(gulp.dest(COMPILED_DIR + 'js'));
});

gulp.task('watch-webpack', ['webpack'], function () {
    gulp.watch('./www/src/**/*.js', ['webpack']);
});

gulp.task('dev', ['watch-less', 'watch-webpack'], function () {
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
