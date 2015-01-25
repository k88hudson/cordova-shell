var exec = require('child_process').exec;
var colors = require('colors');

module.exports = {
    doExec: function doExec(text) {
        return function (done) {
            exec(text, function (err, stdout, stderr) {
                if (stdout) console.log(stdout.grey);
                if (stderr) console.log(stderr.red);
                done(err);
            });
        };
    }
}
