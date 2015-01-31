var should = require('should');
var temp = require('temporary');
var fs = require('fs-extra');
var path = require('path');
var async = require('async')
var exec = require('child_process').exec;

describe('Browserify vs Webpack', function() {
    it('test filesize', function (done) {

        this.timeout(20000);

        // Create a temporary directory.
        var dir = new temp.Dir();
        // Uncomment this if you would rather output to the test dir
        // var dir = { path: './test/files' };

        // Paths
        var srcFile = './src/js/index.js';
        var b = {
            dest: path.join(dir.path, 'browserify-bundle.js')
        };
        var w = {
            config: path.join(__dirname, 'webpack.test.config.js'),
            dest: path.join(dir.path, 'webpack-bundle.js')
        };

        async.each(
            [
                `browserify -e ${srcFile} -t [reactify --es6 --target es5] | uglifyjs --compress --mangle > ${b.dest}`,
                `webpack ${srcFile} ${w.dest} -p --config ${w.config}`
            ],
            exec,
            function (err) {
                if (err) {
                    fs.removeSync(dir.path);
                    return done(err);
                }

                // Stat
                var sizeB = fs.statSync(b.dest).size/1000 + 'kb';
                var sizeW = fs.statSync(w.dest).size/1000 + 'kb';
                var result = `BROWSERIFY ${sizeB}\n` +
                             `WEBPACK    ${sizeW}`;
                console.log(result);
                fs.removeSync(dir.path);
                done();
            });
        });
});

